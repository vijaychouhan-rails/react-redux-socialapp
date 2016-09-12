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
import { browserHistory } from 'react-router';
import Immutable from "immutable"

function handleRender(req,res) {
  
  const cookies = req.headers.cookie;
  var query = qs.stringify(req.query);
  const currentLocation = req.path + (query.length ? "?" + query : "");

  const routesMap = {
    routes,
    location: req.url
  }

  console.log("=================currentLocation==================", currentLocation)
  match(routesMap, (err, redirectLocation, renderProps) => {
    if (err) {
      console.log("=============error===========================")
      res.status(500).send("Could not fulfill this request. Please try again later.")
    } else if (redirectLocation) {
      console.log("=============error1===========================")
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {

      const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

      store.dispatch(configure(
        // {apiUrl: "http://localhost:3000", tokenValidationPath: "/"}, {isServer: true, cookies: cookies, currentLocation: currentLocation}
        {apiUrl: "http://localhost:3000", tokenValidationPath: "/"}, {isServer: true, currentLocation: currentLocation}
      )).then(({redirectPath, blank} = {}) => {
        if (blank) {
          console.log("Blank Status===================================")
          return <noscript />;
        } else {
          console.log("============cookies================")
          try{
            var parseCookies = getCookie(cookies, ' authHeaders')
            console.log(parseCookies)
          }
          catch(err){
            console.log(err.message)
          }
          var headers={}
          if(parseCookies){
            parseCookies = parseCookies.replace(/%22/g, "\"").replace(/%2C/g, ", ")
            console.log("1 level")
            console.log(parseCookies)
            parseCookies = JSON.parse(parseCookies)
            console.log(parseCookies)
            headers['ACCESS_TOKEN'] = parseCookies["access-token"]
            headers['AUTHORIZATION'] = ("Bearer " + parseCookies["access-token"])
            headers['CLIENT'] = parseCookies["client"]
            headers['EXPIRY'] = parseCookies["expiry"]
            headers['UID'] = parseCookies["uid"]
            headers['TOKEN_TYPE'] = parseCookies["token-type"]
            headers['COOKIE'] = cookies
            
          }else{
            console.log("No cookies found")
          }
          // console.log(cookies)
          // console.log("parse")
          // console.log(JSON.stringify(a))
          console.log("======store.auth.user.isSignedIn=========")
          //console.log("user",store.getState('auth'))
          try{
            
          }catch(err){
            console.log("Error=======================")
            console.log(err.message)
          }
          console.log("======End store.auth.user.isSignedIn=========")
          if(Immutable.fromJS(store.getState('auth')).get('auth').get('user').get("isSignedIn")){
            fetch("http://localhost:3000/posts", {credentials: 'include', headers: headers})
            .then(function(response){
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
          }else{
            console.log("===========User is not logged in==================")
            // browserHistory.push('/login')
            const body = renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            )

            //store.dispatch({ type: 'POST_LIST', posts: data.posts })

            const initialState = store.getState();
            if(currentLocation=='/login'){
              res.status(200).send(renderFullPage(body, initialState))
            }else{
              res.redirect('/login');
            }
          }
        }
      })

    } else {
      console.log("=============error22222===========================")
      res.status(404).send('Not found')
    }

  })
}

// var getCookies = function(cookies){
//   var pairs = cookies.split(";");
//   var cookies = {};
//   for (var i=0; i<pairs.length; i++){
//     var pair = pairs[i].split("=");
//     cookies[pair[0]] = unescape(pair[1]);
//   }
//   return cookies;
// }

function getCookie(cookies, name) {
    function escape(s) { return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1'); };
    var match = cookies.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
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
