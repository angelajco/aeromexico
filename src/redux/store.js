import { configureStore } from '@reduxjs/toolkit'
import favoritos from './reducer'

export default configureStore({
    reducer: {
        favoritoReducer: favoritos,
      },
})