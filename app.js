const express = require("express");
const sassMiddleware = require('node-sass-middleware');
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require("cors");
const path = require("path");

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {matchRoutes} from 'react-router-config';

import App from './client/src/App';
import rootReducer from './client/src/store/reducers';
import routes from './client/routes';
import template from './helper';
import store from './client/src/store/store';

const port = 8000;

mongoose.connect(
 "mongodb://localhost/coolshop",
 { useNewUrlParser: true },
 function(err, connection) {
  if (err) throw err;
  else console.log("connected to mongodb");
 }
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(sassMiddleware({
  /* Options */
  src: __dirname,
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed',
  prefix:  '/prefix'
}))

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "./server/views"));
app.set("view engine", "ejs");

app.use(
 session({
  secret: "coolshop",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: "mongodb://localhost/coolshop-session" })
 })
);

if (process.env.NODE_ENV === "development") {

 var webpack = require("webpack");
 var webpackConfig = require("./webpack.config");
 var compiler = webpack(webpackConfig);

 app.use(
  require("webpack-dev-middleware")(compiler, {
   noInfo: true,
   publicPath: webpackConfig.output.publicPath
  })
 );

 app.use(require("webpack-hot-middleware")(compiler));
}

app.use(cors());

// app.get( "/*", ( req, res ) => {

//   const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

//   const context = {};

//   const jsx = ( 
//     <Provider store={ store } >
//       <StaticRouter context={ context } location={ req.url }>
//         <App /> 
//       </StaticRouter>
//     </Provider> 
//   );
//   const reactDom = renderToString(jsx);

//   res.writeHead( 200, { "Content-Type": "text/html" } );
//   res.end( htmlTemplate( reactDom ) );
// });

app.get('/', (req, res) => {
  getContent(req, res);
})

require('./server/models/Product');
require('./server/models/Category');

app.use("/api", require("./server/routes/api"));
app.use(require("./server/routes/index"));

function getContent(req, res) {
  // MATCHING ROUTES FOR FETCHING DATA
  const promises = matchRoutes(routes, req.path).map(({route}) => {
    
    // checking the url contains the post id or not 
    if(req.params.id) {
      // extract the index
      const postId = req.params.id
      return route.loadData(store, postId)
    }
    return route.loadData ? route.loadData(store) : null;
  });
  
  Promise.all(promises).then(() => {
    return res.send(template(req.path, store))
  });
}

app.listen(port, () => {
 console.log(`server is running on http://localhost:${port}`);
});

function htmlTemplate( reactDom, reduxState ) {
    return `
      /* ... */
      
      <div id="app">${ reactDom }</div>
      <script>
          window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
      </script>
      <script src="./app.bundle.js"></script>
        
      /* ... */
    `;
}