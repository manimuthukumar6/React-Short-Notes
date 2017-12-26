require('normalize.css');
require('styles/App.scss');
require('bootstrap-loader');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { syncHistory, routeReducer } from 'redux-simple-router'
import App from './components/App';
import NotesList from './container/NotesList';
import CreateNote from './container/CreateNote';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import notesReducer from './reducers/notes';

const reducer = combineReducers({
  notes: notesReducer,
  routing: routeReducer
});

const reduxRouterMiddleware = syncHistory(browserHistory);
let middleware = applyMiddleware(reduxRouterMiddleware);
if (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') {
  middleware = compose(middleware, window.devToolsExtension());
}

const store = createStore(reducer,middleware);

store.subscribe(() => {
  // Save the notes to localstorage if there are any
  const notes = store.getState().notes;
  localStorage.notes = JSON.stringify(notes);
});

// Render the main component into the dom
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={NotesList} />
        <Route path="create" component={CreateNote} />
        <Route path="edit/:id" component={CreateNote} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
