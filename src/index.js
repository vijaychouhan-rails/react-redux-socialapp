import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

class Home extends React.Component {
  render() {
    return (
      <div className="greeting">
        <p className="greeting-text">Hello World test!</p>
        <App />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('app')
);
