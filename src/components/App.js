import React from 'react';
import Header from '../containers/Header'
import { AuthGlobals } from "redux-auth/bootstrap-theme";

//import '../styles/custom.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <AuthGlobals />
          {this.props.children}
        </div>
      </div>
    );
  }
}
