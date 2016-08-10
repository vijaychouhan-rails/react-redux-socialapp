import React from 'react';
import Header from '../containers/Header'
//import '../styles/custom.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
