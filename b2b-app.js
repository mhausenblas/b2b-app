var b2b_data = '<http://localhost:2020/person/1> <http://ontologi.es/like#likes> <http://localhost:2020/beer/1> .\
<http://localhost:2020/person/1> <http://ontologi.es/like#likes> <http://localhost:2020/beer/3> .\
<http://localhost:2020/person/2> <http://ontologi.es/like#likes> <http://localhost:2020/beer/1> .\
<http://localhost:2020/person/2> <http://ontologi.es/like#likes> <http://localhost:2020/beer/2> .\
<http://localhost:2020/person/1> <http://www.w3.org/2000/01/rdf-schema#label> "Michael Hausenblas" .\
<http://localhost:2020/person/1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Person> .\
<http://localhost:2020/person/2> <http://www.w3.org/2000/01/rdf-schema#label> "Richard Cyganiak" .\
<http://localhost:2020/person/2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Person> .\
<http://localhost:2020/beer/1> <http://www.w3.org/2000/01/rdf-schema#label> "Guinness" .\
<http://localhost:2020/beer/1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Product> .\
<http://localhost:2020/beer/2> <http://www.w3.org/2000/01/rdf-schema#label> "Bud" .\
<http://localhost:2020/beer/2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Product> .\
<http://localhost:2020/beer/3> <http://www.w3.org/2000/01/rdf-schema#label> "Heineken" .\
<http://localhost:2020/beer/3> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Product> .';

$(function(){
	// first, the RDF store needs to be ready, then we set up the UI/UX
	rdfstore.create(function(store) {
		$('#lookup-beer-pref').click(function() {
			var person_name = $('#person-name').val();
			var buf = '<div>Seems <strong>' + person_name + '</strong> prefers the following beers:';

			if(person_name){
				// issue SPARQL query against in-memory data
				store.load("text/turtle", b2b_data, function(success, results) {
					if(success){
						store.execute('SELECT * WHERE { ?person <http://ontologi.es/like#likes> ?beer . ?person <http://www.w3.org/2000/01/rdf-schema#label> ?person_label . ?beer <http://www.w3.org/2000/01/rdf-schema#label> ?beer_label . FILTER regex(?person_label, "' + person_name + '", "i") }', function(success, results){
							if(success) {
								for (var i=0; i < results.length; i++) {
									buf += '<div class="beer">';
									// buf += '<img src="img/guinness-logo.png" alt="Guinness image" />';
									buf += '<h3>'+ results[i].beer_label.value + '</h3>';
									// buf += '<p>Guinness is a popular Irish dry stout that originated in the brewery of Arthur Guinness (1725–1803) at St. James\'s Gate, Dublin. Guinness is one of the most successful beer brands worldwide. It is brewed in almost 60 countries and is available in over 100.[1] 850 million litres (1.5 billion imperial or 1.8 billion US pints) are sold annually.</p>';
									buf += '</div></div>';
								}
								$('#result').html(buf);
								return true;
							}
							else {
								alert('Something went wrong, blame Michael ...');
								return false;
							}
						});
					}
					else {
						alert('Something went wrong, blame Michael ...');
						return false;
					}
				});
			}
			else {
				alert('Hey, I need a person\'s name to look up beers - are you already drunk?');
				return true;
			}
		});
	});
});

