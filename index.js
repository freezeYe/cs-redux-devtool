import { createStore, combineReducers } from 'redux'
import bootstrap from 'clean-state'

var { DISPATCH_TYPE } = bootstrap
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
    reducers[m] = createReducer(key, state);
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

function install(modules, on) {
  const reducers = createReducers(modules)

  injectReduxDevTool(reducers)
  on(DISPATCH_TYPE, (action)=> {
    dispatchAction(action)
  })
}


export default install