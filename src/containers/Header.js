import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as Actions from '../actions';


class Header extends React.Component {

  renderLinks() {
    if (this.props.auth.user && this.props.auth.user.isSignedIn) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/posts">Posts</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/following">Following</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/followers">Followers</Link>
        </li>
      ]
    }
    else{
       return [<li className="nav-item" key={4}>
          <Link className="nav-link" to="/login">Login</Link>
        </li>]
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">React Redux</Link>
          </div>
           <ul className="nav navbar-nav navbar-right">
             { this.renderLinks() }
           </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  console.log("Statye")
  console.log(state)
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, Actions)(Header);
