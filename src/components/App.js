import React from 'react';
import Header from '../containers/Header'
import { AuthGlobals } from "redux-auth/bootstrap-theme";

//import '../styles/custom.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AuthGlobals />
        <Header />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
