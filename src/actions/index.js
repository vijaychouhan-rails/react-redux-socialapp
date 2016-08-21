import { fetch } from 'redux-auth';
import {reset} from 'redux-form';

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
  return function(dispatch){
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
        
        dispatch({
          type: 'ADD_COMMENT',
          comment: data
        })

        dispatch(reset('comment'));
      })
      .catch(function(error){
        console.log("Opps...", "Could not fetch in fetchPosts " + error);
      })
  }
}