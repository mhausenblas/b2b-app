"""
The Beer2Beer back-end. 

Copyright (c) 2012 The Apache Software Foundation, Licensed under the Apache License, Version 2.0.

@author: Michael Hausenblas, http://mhausenblas.info/#i
@since: 2012-10-04
@status: init
"""

import sys, os, logging, datetime, urllib, urllib2, json
from BaseHTTPServer import BaseHTTPRequestHandler

# configuration
DEBUG = True
DEFAULT_PORT = 8998

if DEBUG:
	FORMAT = '%(asctime)-0s %(levelname)s %(message)s [at line %(lineno)d]'
	logging.basicConfig(level=logging.DEBUG, format=FORMAT, datefmt='%Y-%m-%dT%I:%M:%S')
else:
	FORMAT = '%(asctime)-0s %(message)s'
	logging.basicConfig(level=logging.INFO, format=FORMAT, datefmt='%Y-%m-%dT%I:%M:%S')


class B2BServer(BaseHTTPRequestHandler):

	def do_GET(self):
		# API calls
		if self.path.startswith('/q/'):
			self.exec_query(self.path.split('/')[-1])
		else:
			self.send_error(404,'File Not Found: %s' % self.path)
		return

	# changes the default behavour of logging everything - only in DEBUG mode
	def log_message(self, format, *args):
		if DEBUG:
			try:
				BaseHTTPRequestHandler.log_message(self, format, *args)
			except IOError:
				pass
		else:
			return

	# executes the SPARQL query remotely and returns JSON results
	def exec_query(self, person_frag):
		endpoint = 'http://localhost:2020/snorql/?query='
		q = """
			SELECT * WHERE { 
				?s ?p ?o .
			}
		"""
		logging.debug('Query to endpoint %s with query\n%s' %(endpoint, q))
		logging.debug('Trying:\n%s' %(endpoint + urllib.quote(q) + '&output=json'))
		try:
			self.send_response(200)
			self.send_header('Content-type', 'application/json')
			self.end_headers()
			request = urllib2.Request(endpoint + urllib.quote(q) + '&output=json', headers={'Accept' : 'application/sparql-results+json'})
			result = urllib2.urlopen(request).read()
			logging.debug('Result:\n%s' %(vars(result)))
			logging.debug(json.dumps(test))
			self.wfile.write(json.dumps(result))
		except:
			self.send_error(500, 'Something went wrong here on the server side.')


if __name__ == '__main__':
	try:
		from BaseHTTPServer import HTTPServer
		server = HTTPServer(('', DEFAULT_PORT), B2BServer)
		logging.info('B2B server started, use {Ctrl+C} to shut-down ...')
		server.serve_forever()
	except Exception, e:
		logging.error(e)
		sys.exit(2)
