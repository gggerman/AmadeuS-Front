import axios from "axios"
import { GET_ALL_PRODUCTS, USER_ERRORS } from "./index"

export function getByName(name) {
    return async (dispatch) => {
        try {
            const products = await axios.get(`http://localhost:3001/products?name=${name}`)
            return dispatch({
                type: GET_ALL_PRODUCTS,
                payload: products.data
            })
        }
        catch (error) {
            return dispatch({
                type: USER_ERRORS,
                payload: console.log(error)
            })
        }
    }
}