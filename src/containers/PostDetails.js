import React from 'react';

export default class PostDetails extends React.Component {
  render() {
    return (
      <div>
        11111This is post details page
      </div>
    );
  }
}


// import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as Actions from '../actions';

// class PostDetails extends React.Component {
//   componentWillMount() {
//     console.log("componentWillMount")
//     console.log(this.props.params.id)
//     if(this.props.posts.length == 0){
//       console.log("componentDidMount")
//       this.props.actions.fetchPosts()
//     }
//   }


//   render() {
//     // console.log("this.props.")
//     // console.log(this.props.posts)
//     // const { id } = this.props.params;

//     //const i = this.props.posts.filter((post) => post.id === id);
//     //alert(i)
//     //alert(this.props.post)
//     return (
//       <div>
//         THis is single post data: 
//       </div>
//     );
//   }
// }



// // function mapStateToProps(state) {
// //   //http://redux.js.org/docs/recipes/ServerRendering.html
// //   console.log("================+State===============")
// //   console.log(state)
// //   return {
// //     posts: state.posts,
// //     post: '111111'
// //   };
// // }

// // function mapDispatchToProps(dispatch) {
// //   return {
// //     actions: bindActionCreators(Actions, dispatch)
// //   };
// // }

// // export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
