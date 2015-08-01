This document outlines the tortoise project server side development environment setup.

Most out the stuff captured here are my outlook on plenty tutorials on the web, and compiled in our "DESI" version. I'd say its the curiosity that drives me towards the buzzword MEAN (MongoDB, Express, Angular JS and NodJS) that got popular quite recently.
Lets talk little bit on MEAN stack and its installation, followed by "Hello, World!" just for sake on completness.

Please note, we are dropping "Angular JS" from our discussion as its a client fornt-end devlopment. So we can say its a ME(a)N stack instead.
Also note that all technologies are open-source or under free distribution lic. 

They say, MEAN stack is: 
    "The Friendly & Fun Javascript Fullstack for your next web application.
	 MEAN is an opinionated fullstack javascript framework - which simplifies and accelerates web application development."
	 
A full-stack JavaScript solution that helps you build fast, robust, and maintainable production web applications using MongoDB, Express, AngularJS, and Node.js.


1. Installtion:
Please note that for Windows or Mac OS steps shall be more or less same. I've outlined for my setup on Ubuntu.
[Pre-install python v2.7]

[i] Install Node.js (visit: https://nodejs.org/ and download either installable or source code).
    It'll detect your OS and give you the appropriate installer

On linux:
A. Download tar ball
   $ tar zxvf nodejs_<version>.tbz2
   $ cd nodejs_<version>
   $ ./configure
   $ sudo make && sudo make install
   
B. Debian and Ubuntu based Linux distributions
   $ curl --silent --location https://deb.nodesource.com/setup_0.12 | sudo bash -
   $ sudo apt-get install --yes nodejs
   $ sudo apt-get install npm
   $ apt-get install --yes build-essential (Optional)
   
   
[ii] Install MongoDB NoSQL database (or an create account with MongoDB org, visit: https://www.mongodb.org/downloads)
A. Download tar ball
   $ tar zxvf mongodb_<version>.tbz2
   $ cd mongodb_<version>
   $ ./configure
   $ sudo make && sudo make install

B. Debian and Ubuntu based Linux distributions
   $ sudo apt-cache search mongodb
   $ sudo apt-get install mongodb_client
   $ sudo apt-get install mongodb_server
   
OR
   $ sudo vim /etc/apt/sources.list.d/mongo.list
   and add 
   ##10gen package location
   deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen
   
   # Add GPG key
   $ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
   
   $ sudo apt-get install mongodb-10gen

[iii] Install Express JS framework
	$ sudo npm install -g express
	$ sudo npm install -g express-generator (boilerplate for our dev.)
	
[iv] Install Mongoose MongoDB ODM [Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.]
    $ sudo npm install mongoose

We are done!


2. Hello, World!
Lets start on some interesting stuff. We will write our first web application in Node.js using Express JS framework.

 $ mkdir -p tortoise/server/src/
 $ cd tortoise/server/src/
 $ npm tortoise
 $ cd tortoise
 $ start bin/www
 
We are done! Express takes off all your peril ;-)

Now open web browser and type http://localhost:3000/ to see our first web application running.


Simple way to get start is to refer: http://nodeschool.io/

More interesting example with additional RESTful and MongoDB (Mongoose to have schema) can be found:
[i].   http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/
[ii].  http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
[iii]. http://scottksmith.com/blog/2014/05/02/building-restful-apis-with-node/


3. Tortoise server

We will keep folder structure like below (keeping MVC design doal in our subconscious).

  tortoise
         |
		 |
		 \_ 
		    bin
	           |
			    \_
				   www       // Entry point and server/http
         |
		 |
		 \_
		    controllers       // Controllers
		 |
		 |
		 \_
		    models            // data-models
		 |
		 |
		 \_
		    views              // Views if any
		 |
		 |
		 \_
		    db
		 |
		 |
		 \_
		    routes
			     |
				 \_
				    routes.js  // routing tables
		 |
		 |
		 \_
		    app.js             // Application logic
		 |
		 |
		 \_
		    package.json      // List down entrypoint and dependencies
			

			
		