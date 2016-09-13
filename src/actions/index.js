import { fetch } from 'redux-auth';
import {reset} from 'redux-form';
import { browserHistory } from 'react-router';
import { stopSubmit } from 'redux-form';

export function fetchPosts() {
  return function(dispatch){
    const url = "http://localhost:3000/posts";
    fetch(url, {credentials: 'include'})
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        console.log(data)
        dispatch({
          type: 'POST_LIST',
          posts: data.posts
        })
      })
      .catch(function(error){
        console.log("Opps...", "Could not fetch in fetchPosts " + error);
      })
  }
}

export function submitComment(data) {
  return function(dispatch) {
    dispatch({ type: 'PAGE_LOADER' })
    const url = "http://localhost:3000/comments";
    fetch(url, {credentials: 'include', method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(function(response){
        dispatch({ type: 'STOP_PAGE_LOADER' })
        return(response.json());
      })
      .then(function(data){
        if(data.success){
          dispatch({
            type: 'ADD_COMMENT',
            comment: data.data
          })

          dispatch(reset('comment'));
        }else{
          dispatch(stopSubmit('comment', {comment: data.data}));
        }
      })
      .catch(function(error){
        console.log("Opps...", "Could not fetch in fetchPosts " + error);
      })
  }
}

export function submitPost(data) {
  return function(dispatch){
    var body = new FormData();
    Object.keys(data).forEach(( key ) => {
      if(key=='avatar'){
        body.append(key, data[ key ][0]);
      }else{
        body.append(key, data[ key ]);
      }
      
    });
      //body.append('avatar', data['avatar'][0]);
    dispatch({ type: 'PAGE_LOADER' })

    const url = "http://localhost:3000/posts";
    fetch(url, {credentials: 'include', method: 'POST',
      headers: {
        'process-data': false
      },
      //body: data
      body: body
      //body: JSON.stringify(data)
    })
      .then(function(response){
        dispatch({ type: 'STOP_PAGE_LOADER' })
        return(response.json());
      })
      .then(function(data){
        if(data.success){
          dispatch({
            type: 'ADD_POST',
            post: data
          })
          dispatch(reset('NewPostForm'));
          browserHistory.push('/posts')
        }else{
          dispatch(stopSubmit('NewPostForm', data));
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error in submitPost " + error);
      })
  }
}

export function likeUnlikePost(post_id) {
  return function(dispatch) {
    dispatch({ type: 'PAGE_LOADER' })
    const url = API_URL + ('/posts/' + post_id + '/post_like_unlike')
    
    fetch(url, {credentials: 'include', method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(function(response){
        dispatch({ type: 'STOP_PAGE_LOADER' })
        return(response.json());
      })
      .then(function(data){
        console.log("=======likeUnlikePost============================", data)
        dispatch({
          type: 'LIKE_UNLIKE_POST',
          post: data
        }) 

      })
      .catch(function(error){
        console.log("Opps...", "Could not likeUnlikePost " + error);
      })
  }
}

export function userLogout() {
  return function(dispatch){
    console.log("========userLogout=========Action===========")
    dispatch({ type: 'USER_LOGOUT' })
  }
}