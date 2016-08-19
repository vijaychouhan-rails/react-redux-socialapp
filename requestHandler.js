import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import rootReducer from './src/reducers/index';

import { match, RouterContext } from 'react-router'
import routes from './src/routes'

import thunkMiddleware from 'redux-thunk' 

import { configure } from "redux-auth";

import qs from "query-string";

function handleRender(req,res) {
  const cookies = req.headers.cookie;
  console.log("=================cookies================")
  console.log(cookies)
  console.log("End =================cookies================")
  var query = qs.stringify(req.query);
  const currentLocation = req.path + (query.length ? "?" + query : "");

  const routesMap = {
    routes,
    location: req.url
  }

  
  match(routesMap, (err, redirectLocation, renderProps) => {
    if (err) {
      throw err;
    } else if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (!renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      //res.status(200).send(renderToString(<RouterContext {...renderProps} />))

      console.log('===================Missing render props====================')
    } 

    const components = renderProps.components

    if (components.some((c) => c && c.displayName === 'error-404')) {
      res.status(404).send('Not found')
    }

    const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

    store.dispatch(configure(
      {apiUrl: "http://localhost:3000", tokenValidationPath: "/auth/validate_token"}, {isServer: true, cookies: cookies, currentLocation: currentLocation}
    )).then(({redirectPath, blank} = {}) => {
      if (blank) {
        console.log("Blank Status===================================")
        return <noscript />;
      } else {

        fetch("http://localhost:3000/posts", {credentials: 'include'})
          .then(function(response){
            console.log("========================Server respon===================")
            return(response.json());
          })
          .then(function(data){

            const { location, params, history } = renderProps

            const body = renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            )

            store.dispatch({ type: 'POST_LIST', posts: data.posts })

            const initialState = store.getState();

            res.status(200).send(renderFullPage(body, initialState))

          })
          .catch(function(error){
            console.log("Opps...", "Could not fetch in fetchPosts " + error);
          })
      }
    })

  })
}

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