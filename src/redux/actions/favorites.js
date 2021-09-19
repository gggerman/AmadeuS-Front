import axios from "axios"
import { GET_ALL_FAVORITES, ADD_FAVORITE, DELETE_FAVORITE, REMOVE_ALL_FAVORITES } from "./index"
const { REACT_APP_SERVER } = process.env;

export function getAllFavorites(idUser){
    return async (dispatch) => {
        try {
            const favorites = await axios.get(`${REACT_APP_SERVER}/users/${idUser}/favorites`)
            return dispatch({
                type: GET_ALL_FAVORITES,
                payload: favorites.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function addFavorite(idUser, idProduct){
    return async( dispatch ) => {
        try {
            await axios.post(`${REACT_APP_SERVER}/users/${idUser}/favorites/${idProduct}`)
            dispatch({
                type: ADD_FAVORITE
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function deleteFavorite(idUser, idProduct){
    return async( dispatch ) => {
        try {
            await axios.delete(`${REACT_APP_SERVER}/users/${idUser}/favorites/${idProduct}`)
            dispatch({
                type: DELETE_FAVORITE
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function removeAllFavorites(){
    return ( dispatch ) => {
            dispatch({
                type: REMOVE_ALL_FAVORITES
            })

    }
}