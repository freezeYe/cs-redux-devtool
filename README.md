## The [Clean-State](https://github.com/tnfe/clean-state) debugging plugin.

## Install
    npm i cs-redux-devtool
    
## Usage
```javascript
import bootstrap from 'clean-state'
import devtool from 'cs-redux-devtool'
import user from './user'

const modules = ={ user }

bootstrap.addPlugin(devtool)
export const {useModule, dispatch}  = bootstrap(modules);
```

## Example
<p align="center">
  <img width="400px" src="https://github.com/freezeYe/assets/blob/master/redux_devtool.png" />
</p>
