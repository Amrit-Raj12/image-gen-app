// import {configureStore} from '@reduxjs/toolkit';
// import authReducer from './auth';

// const store = configureStore({
//   reducer: authReducer,
// });

// export type RootState = ReturnType<typeof store.getState>;

// export default store;


import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './auth';
import imageReducer from './generatedImages';

const rootReducer = combineReducers({
  auth: authReducer,
  images: imageReducer,
  // image: imageReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
