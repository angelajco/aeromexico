import { createSlice } from '@reduxjs/toolkit'

export const agregaFavorito = createSlice({
    name: 'favoritos',
    initialState: {
        value: 0,
        personajes: []
    },
    reducers: {
        añade: (state, valor) => {
            // Esta funcion añade un usuario e incrimenta para saber si ya son 5 usuarios
            state.value += 1;
            state.personajes.push(valor)
        },
        borra: (state, valor) => {
            //Borra al usuario que fue eliminado y vuelve a actualizar
            let arrTemp = state.personajes.filter(dato => dato.payload.name !== valor.payload.name)
            state.personajes = arrTemp;
            state.value -= 1;
        }
    },
})

export const { añade, borra } = agregaFavorito.actions

export default agregaFavorito.reducer