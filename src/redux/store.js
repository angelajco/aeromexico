import { configureStore } from '@reduxjs/toolkit'
import favoritos from './reducer'

export default configureStore({
  // Se crea el reducer
    reducer: {
        favoritoReducer: favoritos,
      },
})