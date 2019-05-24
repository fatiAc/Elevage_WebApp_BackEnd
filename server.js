let express = require('express');  //create route
let bodyParser = require('body-parser'); //grab info from POST request
var morgan = require('morgan');             // log requests to the console (express4)
let app = express();
let server = require('http').Server(app);
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
let config = require('./config/config');


app.use(morgan('dev'));                                         // log every request to the console

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/app', require('./src/controller/useRouter'));

server.listen(config.port_http)

server.on('listening', function () {

    function print(path, layer) {
        if (layer.route) {
            layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
        } else if (layer.name === 'router' && layer.handle.stack) {
            layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
        } else if (layer.method) {
            console.log(`%s : http://localhost:${config.port_http}/%s`,
                layer.method.toUpperCase(),
                path.concat(split(layer.regexp)).filter(Boolean).join('/'))
        }
    }

    function split(thing) {
        if (typeof thing === 'string') {
            return thing.split('/')
        } else if (thing.fast_slash) {
            return ''
        } else {
            var match = thing.toString()
                .replace('\\/?', '')
                .replace('(?=\\/|$)', '$')
                .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
            return match
                ? match[1].replace(/\\(.)/g, '$1').split('/')
                : '<complex:' + thing.toString() + '>'
        }
    }

    app._router.stack.forEach(print.bind(null, []));

    console.log(`REST API run on http://localhost:${config.port_http}`);
});
