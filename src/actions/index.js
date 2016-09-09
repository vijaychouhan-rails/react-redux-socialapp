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
    const url = "http://localhost:3000/comments";
    fetch(url, {credentials: 'include', method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(function(response){
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
        return(response.json());
      })
      .then(function(data){
        console.log("submitPost============data=============")
        console.log(data)
        dispatch({
          type: 'ADD_POST',
          post: data
        })

        dispatch(reset('NewPostForm'));
        browserHistory.push('/posts')
      })
      .catch(function(error){
        console.log("Opps...", "Error in submitPost " + error);
      })
  }
}
