  const express = require("express");
  const sassMiddleware = require('node-sass-middleware');
  const session = require("express-session");
  const app = express();
  const mongoose = require("mongoose");
  const MongoStore = require("connect-mongo");
  const morgan = require('morgan');
  const cors = require("cors");
  const path = require("path");

  import React from 'react';
  import { renderToString } from 'react-dom/server';
  import { StaticRouter, matchPath } from "react-router-dom";
  import Helmet from "react-helmet";
  import { createStore } from 'redux';
 
  import routes from './client/routes';
  import Layout from './client/src/components/Layout';

  const port = 8000;

  mongoose.connect(
   "mongodb://localhost/coolshop",
   { useNewUrlParser: true, useUnifiedTopology: true },
   function(err, connection) {
    if (err) throw err;
    else console.log("connected to mongodb");
   }
  )

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
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
    store: new MongoStore({ mongoUrl: "mongodb://localhost/coolshop-session" })
   })
  );

  if (process.env.NODE_ENV === "development") {

   var webpack = require("webpack");
   var webpackConfig = require("./webpack.config");
   var compiler = webpack(webpackConfig);

   app.use(
    require("webpack-dev-middleware")(compiler, {
     publicPath: webpackConfig.output.publicPath
    })
   );

   app.use(require("webpack-hot-middleware")(compiler));
  }

  app.use(cors());

  app.use("/api", require("./server/routes/api"));
  app.use(require("./server/routes/index"));

  app.get( "/*", ( req, res ) => {
      const context = { };
      const store = createStore( );

      // store.dispatch( initializeSession( ) );

      const dataRequirements =
          routes
              .filter( route => matchPath( req.url, route ) ) // filter matching paths
              .map( route => route.component ) // map to components
              .filter( comp => comp.serverFetch ) // check if components have data requirement
              .map( comp => store.dispatch( comp.serverFetch( ) ) ); // dispatch data requirement

      Promise.all( dataRequirements ).then( ( ) => {
        const jsx = (
            <ReduxProvider store={ store }>
                <StaticRouter context={ context } location={ req.url }>
                  <Layout />  
                </StaticRouter>
            </ReduxProvider>
        );
        const reactDom = renderToString( jsx );
        const reduxState = store.getState( );
        const helmetData = Helmet.renderStatic( );

        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( htmlTemplate( reactDom, reduxState, helmetData ) );
    } );
  } );

  app.listen(port, () => {
   console.log(`server is running on http://localhost:${port}`);
  });

  function htmlTemplate( reactDom, reduxState, helmetData ) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${ helmetData.title.toString( ) }
            ${ helmetData.meta.toString( ) }
            <meta name="304workaround" content="2013-10-24 21:17:23">
            <title>React SSR</title>
        </head>
        
        <body>
            <div id="app">${ reactDom }</div>
            <script>
                window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
            </script>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
  }