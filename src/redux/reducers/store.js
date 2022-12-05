// import { createStore, applyMiddleware } from 'redux';
import reducers from './index';
// import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

// export const store = configureStore({
//   reducer: reducers
// },
//   applyMiddleware(thunk)
// )

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
      },
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
})