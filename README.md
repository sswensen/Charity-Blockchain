# Charity Blockchain 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/sswensen/Charity-Blockchain)
 
![version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![version](https://img.shields.io/badge/contributors-3-brightgreen.svg)
 
## Getting Started

To use this project first make sure you have npm installed. These are dependency managers that will download everything you need for the project.

### Prerequisites

`npm` must be installed on the machine you wish to test on.
Oasis is built with:
- React
- Truffle
- Ganache

### Installing

To get Charity Blockchain up and running on your local machine, run the following in a terminal:
```bash
$ git clone git@github.com:sswensen/Charity-Blockchain.git // Clone repo
```

Install necessary dependencies:
```bash
$ cd client
$ npm install // Install all dependencies
$ cd ..
$ npm install
```

Compile and deploy contracts to test net:
```bash
$ truffle compile
$ truffle migrate
```

To run in development mode (from the `client` directory:
```
$ npm run dev
```

To run in production mode:
```
$ cd client // Move into client directory
$ npm run build // Create bundle.js for index.html to reference
$ cd .. // Move back into project root
$ npm start // Start the express server
```
Both development and production will run on port `7777` unless otherwise specified.

## Deployment to Heroku

Ensure you have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) installed and run
```
$ heroku local web
```
Your app should now be running on [http://localhost:7777/](http://localhost:7777/).

To deploy to Heroku, first commit all changes to git. 
```
$ git add .
$ git commit -m "Created something awesome"
$ heroku login
$ heroku create
$ git push heroku master
```
This will create a Heroku app. To open it run `heroku open`.
