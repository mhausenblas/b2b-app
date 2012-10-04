# Beer2Beer  - The beer preferences directory

A simple Linked Data app. Just open the `index.html` document in your browser ...

## Creating the Linked Data

* To create the RDF data, load `rdb2rdf/b2b_db.sql` in a RDBMS (I'm using [PostgreSQL](http://www.postgresql.org/ "PostgreSQL: The world's most advanced open source database"))
* Then, after installing [D2RQ](http://d2rq.org/ "The D2RQ Platform – Accessing Relational Databases as Virtual RDF Graphs"), you run the `rdb2rdf/generate_direct_mapping` command (note: you'll have to patch the path to your D2RQ installation in this command) - this generates a mapping you can customise to your own needs.
* If you want to use my mapping (`rdb2rdf/b2b_mapping.ttl`) you can the either run the D2RQ server (SPARQL endpoint) or dump that data to a file (see below)

To run the D2RQ server I run (in the D2RQ home directory):

	./d2r-server /Users/michael/Documents/events/TUT_STA2012/b2b-app/rdb2rdf/b2b_mapping.ttl
	
To dump the data I run (in the D2RQ home directory):

	./dump-rdf /Users/michael/Documents/events/TUT_STA2012/b2b-app/rdb2rdf/b2b_mapping.ttl > b2b_dump.n3

## License

This software is licensed under [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html) Software License.