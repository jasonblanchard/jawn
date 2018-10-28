import { createStore, compose, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reduxFrame } from 'redux-frame';
import reduceReducers from 'reduce-reducers';

import reducers from 'state/reducers';
import effectHandlers from 'state/effects';
import coeffectHandlers from 'state/coeffects';
import interceptors from 'state/interceptors';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function bootstrapStore(registry) {
  function reducer(state, action) {
    return {
      ...reduceReducers(...reducers)(state, action),
      form: formReducer(state.form, action),
    };
  }

  const registryCoeffectHandler = () => registry;

  return createStore(
    reducer,
    {},
    composeEnhancers(applyMiddleware(reduxFrame({
      interceptors,
      effectHandlers,
      coeffectHandlers: {
        ...coeffectHandlers,
        registry: registryCoeffectHandler,
      },
    }))),
  );
}
