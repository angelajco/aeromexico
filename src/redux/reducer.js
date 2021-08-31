import { createSlice } from '@reduxjs/toolkit'

export const agregaFavorito = createSlice({
  name: 'favoritos',
  initialState: {
    value: 0,
    personajes: []
  },
  reducers: {
    añade: (state) => {
      state.value += 1
    },
  },
})

export const { añade } = counterSlice.actions

export default counterSlice.reducer