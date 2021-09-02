import axios from "axios"
import { GET_ALL_PRODUCTS, USER_ERRORS } from "."


const getAllProducts = () => {
    return async( dispatch ) => {

        try {
            const products = await axios.get( 'https://....')
            return dispatch( {
                type: GET_ALL_PRODUCTS,
                payload: products.data
            })

        } catch (error) {
            return dispatch( {
                type: USER_ERRORS,
                payload: console.log( error )
            } )
        }
    }
}

export default getAllProducts