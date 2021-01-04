
// General Modules
const Path = require('path');
const FS   = require('fs');

// Basic Server Modules
const App  = require('express')();
const HTTP = require('http').createServer(App);
const IO   = require('socket.io')(HTTP);

// API Setup
const Endpoints = {};
for(let file of FS.readdirSync(Path.join(__dirname, '/web/api/endpoints'))) {

    const Endpoint = new (require(Path.join(__dirname, '/web/api/endpoints', file)));
    Endpoints[Endpoint.Endpoint] = Endpoint;

}

// API Manager Class
const Manager = new (require('./web/api/Manager'));

// Setup Server's Settings
App.set('view engine', 'ejs');
App.set('views', Path.join(__dirname, 'web', 'pages'));
App.use(require('body-parser').json())

// Start The Server
HTTP.listen(3000, console.log('Started!'))

// Accept Incoming GET Requests
App.get('*', (req, res) => {

    let remote = req.path.slice(1);
    if(!remote) remote = 'index';

    // Public File
    if(remote.startsWith('p/')) {

        remote = remote.slice(2);

        if(FS.existsSync(Path.join(__dirname, 'web', 'public', remote))) res.sendFile(Path.join(__dirname, 'web', 'public', remote));
        else res.status(404).end();

    }
    
    // Page
    else {
        
        remote += '.ejs';
    
        if(FS.existsSync(Path.join(__dirname, 'web', 'pages', remote))) res.render(remote);
        else res.render('404.ejs');

    }

})

App.post('*', (req, res) => {

    let remote = req.path.slice(1);
    if(!remote) remote = 'index';

    const body = req.body || {};
    body.Manager = Manager;

    // API
    if(remote.startsWith('a/')) {

        remote = remote.slice(2).toLowerCase();
        if(Endpoints[remote]) Endpoints[remote].run(body).then(data => res.json(data || {}));
        else res.status(404).end();

    }

    else res.status(404).end();

})