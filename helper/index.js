import React from 'react';
import { renderToString } from "react-dom/server";
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import routes from '../client/routes';
import { Provider } from 'react-redux';
import Header from '../client/src/components/Header';

import { Helmet } from 'react-helmet';

// template going to be rendered both client and server side

export function template(path, store) {
  const helmet = Helmet.renderStatic();
  
  const jsx = renderToString(
    <Provider store={store}>
        <StaticRouter context={{}} location={path}>
          <>
            <Header/>
            <main>
              {
                renderRoutes(routes)
              }
            </main>
          </>
        </StaticRouter>
    </Provider>
  );

  return `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <title>Simple Blog Theme - RT Camp Task</title>
        <link rel="stylesheet" href="/bundle.css" />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body  ${helmet.bodyAttributes.toString()}>
        <div id="root">${jsx}</div>
        <script src="/client.bundle.js"></script>
      </body>
    </html>
  `
} 