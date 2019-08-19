/**
 * Module dependencies.
 */
var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , admin = require('./routes/admin')
    , http = require('http')
    , path = require('path')
    , busboy = require("then-busboy")
    , fileUpload = require('express-fileupload')   ;
//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();
app.use(fileUpload({
  createParentPath: true
}));
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '9332161018',
  database : 'milad12'
});

var FileStore = require('session-file-store')(session);

var fileStoreOptions = {};

connection.connect();

global.db = connection;

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: new FileStore(fileStoreOptions),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}))

// development only
app.get('/', routes.index);//call for main index page
app.get('/login', user.login);//call for login page
app.post('/login', user.login);//call for login post
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post
app.get('/home/buy', user.buy);//call for buy page
app.get('/balance/incr', user.increaseBalance);//call for buy page
app.get('/home/purchase', user.purchase);//call for buy page
app.post('/home/buy', user.buy);//call for buy post
app.get('/home/store', user.store);//call for buy page
app.post('/home/store', user.store);//call for buy post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile',user.profile);//to render users profile
//admin
app.get('/admin/login', admin.login);//call for login page
app.post('/admin/login', admin.login);//call for login post
app.get('/admin/upload', admin.upload);//call for upload page
app.post('/admin/upload', admin.upload);//call for upload post
app.get('/admin/report', admin.report);//call for report page
app.post('/admin/report', admin.report);//call for report post
app.get('/admin/store', admin.store);//call for store page
app.post('/admin/store', admin.store);//call for store post
app.get('/admin/home/dashboard', admin.dashboard);//call for dashboard page after login
app.get('/admin/home/logout', admin.logout);//call for logout
app.get('/admin/home/profile',admin.profile);//to render users profile
//Middleware
app.listen(8080)


