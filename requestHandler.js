import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import rootReducer from './src/reducers/index';
import { match, RouterContext } from 'react-router'
import routes from './src/routes'
//import Immutable from "immutable";

var request = require('request')

function handleRender(req,res) {
request
    .get('http://localhost:3000/posts', function(err, response, body) {
      if (err) {
        console.log("===============error=====================")
        throw err;
      }
      var defaultState = JSON.parse(body)

      const store = createStore(rootReducer, defaultState)

    // Step 2: Get initial state
      const initialState = store.getState();

    // Step 8: Define routes on the server
      const routesMap = {
        routes,
        location: req.url
      }


    // Step 8: Define routes on the server
      match(routesMap, function(error, redirectLocation, routeContext) {
        if (error) {
          res.status(500).send("Could not fulfill this request. Please try again later.")
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (routeContext) {
          const html = renderToString(
            <Provider store={store}>
              <RouterContext {...routeContext} />
            </Provider>)
          res.status(200).send(renderFullPage(html,initialState))
        } else {
          res.status(404).send('Not found')
        }
      })

  })
}

// Step 4: Prepare DOM on server side
function renderFullPage(component,initialState){

  return `<!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <title>Redux Universal Example</title>
      </head>
    <body>
      <div id="app">${component}</div>
      <script>
       window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src="/static/bundle.js"></script>
    </body>
    </html>
    `
}

module.exports = handleRender
