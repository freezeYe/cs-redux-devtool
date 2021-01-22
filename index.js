import { createStore, combineReducers } from 'redux'

var reduxStore = null;
var actionLen = 0

function createReducer(moduleName, initState) {
  return function (state, action) {
    if (state === undefined) state = initState;

    const {newState, type = ''} = action
    const [disPatchModule] = type.split('/')
    if (moduleName === disPatchModule && newState) {
      return newState
    } else {
      return state;
    }
  };
}

function createReducers(modules) {
  var moduleKeys = Object.keys(modules);
  var reducers = {};
  moduleKeys.forEach(function (key) {
    const {state} = modules[key]
    reducers[key] = createReducer(key, state);
  });
  return reducers;
}

function injectReduxDevTool(reducers) {
  reduxStore = createStore(
    combineReducers(reducers),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

function dispatchAction(actionForRedux) {
  if (reduxStore) {
    actionLen++;
    reduxStore.dispatch(actionForRedux);
  }
}

function install(modules, pluginEmitter) {
  const reducers = createReducers(modules)

  injectReduxDevTool(reducers)
  pluginEmitter.on('CS_DISPATCH_TYPE', (action)=> {
    dispatchAction(action)
  })
}


export default install