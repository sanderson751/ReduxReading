import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducer from './reducers/reducer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  )
  
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  )

registerServiceWorker();
