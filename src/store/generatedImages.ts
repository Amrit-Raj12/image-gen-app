import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from 'store';

export interface GeneratedImage {
  id: string;
  uri: string;
  prompt: string;
  createdAt?: string;
}

interface ImageState {
  images: GeneratedImage[];
// image: string;
  loading: boolean;
}

const initialState: ImageState = {
  images: [
  {
    id:Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
    uri: 'https://res.cloudinary.com/dcdchgx6z/image/upload/v1722686117/ImagiTextAsserts/image13_anui8a.jpg',
    prompt: 'A beautiful anime girl in purple hair and dress.'
  },
  {
    id:Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
    uri: 'https://res.cloudinary.com/dcdchgx6z/image/upload/v1722686117/ImagiTextAsserts/image14_sdgjpe.jpg',
    prompt: 'A beautiful cyber girl in purple style.'
  },
  {
    id:Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
    uri: 'https://res.cloudinary.com/dcdchgx6z/image/upload/v1722686117/ImagiTextAsserts/image15_uy8amy.jpg',
    prompt: 'A beautiful cyber robot girl in purple style.'
  },
  {
    id:Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
    uri: 'https://res.cloudinary.com/dcdchgx6z/image/upload/v1722686118/ImagiTextAsserts/image16_ijw8ev.jpg',
    prompt: 'A handsome anime boy in purple hair and dress.'
  }
],

// image: "",
  loading: false,
};

const imageSlice = createSlice({
  name: 'images',
//   name:'image',
  initialState,
  reducers: {
    addImage(state, {payload}: PayloadAction<GeneratedImage>) {
      if (!state.images.some(obj => obj.id !== payload.id)) {
        state.images.push(payload);
      }

      // for(let i=0; i<state.images.length; i++){
      //   if(state.images[i].uri === payload.uri){
      //     break;
      //   } if (i === state.images.length - 1) {
      //     state.images.push(payload);
      //   }
      // }
      
    //   state.image = payload;
    },
    removeImage(state, {payload}: PayloadAction<string>) {
      state.images = state.images.filter(image => image.id !== payload);
    //   state.image = ""
    },
    setLoading(state, {payload}: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
});

export const {addImage, removeImage, setLoading} = imageSlice.actions;

export const selectImages = createSelector(
  (state: RootState) => state.images,
  imageState => imageState.images,
// (state: RootState) => state.image,
// imageState => imageState.image
);

export const selectLoading = createSelector(
  (state: RootState) => state.images,
  imageState => imageState.loading,

//   (state: RootState) => state.image,
//   imageState => imageState.loading,
);

export default imageSlice.reducer;
