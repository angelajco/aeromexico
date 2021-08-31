import { createSlice } from '@reduxjs/toolkit'

export const agregaFavorito = createSlice({
    name: 'favoritos',
    initialState: {
        value: 0,
        personajes: []
    },
    reducers: {
        añade: (state, valor) => {
            state.value += 1;
            state.personajes.push(valor)
        },
        borra: (state, valor) => {
            let arrTemp = state.personajes.filter(dato => dato.payload.name !== valor.payload.name)
            state.personajes = arrTemp;
        }
    },
})

export const { añade, borra } = agregaFavorito.actions

export default agregaFavorito.reducer