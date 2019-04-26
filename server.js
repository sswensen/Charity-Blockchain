var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

const path = require('path');

const app = express();
app.use(bodyParser.text({
    type: function(req) {
        return 'text';
    }
}));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.post('/post', function (req, res) {
    console.log(req.body);
    res = res.status(200);
    if (req.get('Content-Type')) {
        console.log("Content-Type: " + req.get('Content-Type'));
        res = res.type(req.get('Content-Type'));
    }
    res.send(req.body);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 7777;
http.createServer(app).listen(port);

console.log(`Server listening on ${port}`);