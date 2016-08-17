import React from 'react'
import { createStore, applyMiddleware } from 'redux'  
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import rootReducer from './src/reducers/index';
import { match, RouterContext } from 'react-router'
import routes from './src/routes'

import thunkMiddleware from 'redux-thunk'  
//import Immutable from "immutable";

// var request = require('request')

function handleRender(req,res) {

  const routesMap = {
    routes,
    location: req.url
  }

  
  match(routesMap, (err, redirectLocation, renderProps) => {
    if (err) {
      return next(err)
    } else if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (!renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      //res.status(200).send(renderToString(<RouterContext {...renderProps} />))

      return next(new Error('Missing render props'))
    } 

    const components = renderProps.components

    if (components.some((c) => c && c.displayName === 'error-404')) {
      res.status(404)
    }

    fetch("http://localhost:3000/posts")
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        const store = createStore(rootReducer, data, applyMiddleware(thunkMiddleware))
        const { location, params, history } = renderProps

        console.log("==================FETCH DATA=============================")
        const body = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )

        const initialState = store.getState();
        res.status(200).send(renderFullPage(body,initialState))

      })
      .catch(function(error){
        console.log("Opps...", "Could not fetch in fetchPosts " + error);
      })
  })
}
// function handleRender(req,res) {
// request
//     .get('http://localhost:3000/posts', function(err, response, body) {
//       if (err) {
//         console.log("===============error=====================")
//         throw err;
//       }
//       var defaultState = JSON.parse(body)

//       const store = createStore(rootReducer, defaultState)

//     // Step 2: Get initial state
//       const initialState = store.getState();

//     // Step 8: Define routes on the server
//       const routesMap = {
//         routes,
//         location: req.url
//       }


//     // Step 8: Define routes on the server
//       match(routesMap, function(error, redirectLocation, routeContext) {
//         if (error) {
//           res.status(500).send("Could not fulfill this request. Please try again later.")
//         } else if (redirectLocation) {
//           res.redirect(302, redirectLocation.pathname + redirectLocation.search)
//         } else if (routeContext) {
//           const html = renderToString(
//             <Provider store={store}>
//               <RouterContext {...routeContext} />
//             </Provider>)
//           res.status(200).send(renderFullPage(html,initialState))
//         } else {
//           res.status(404).send('Not found')
//         }
//       })

//   })
// }

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
    </html>`
}

module.exports = handleRender
