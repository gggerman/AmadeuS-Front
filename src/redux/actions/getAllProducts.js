import axios from "axios"
import { GET_ALL_PRODUCTS, USER_ERRORS, SORT_BY_NAME, SORT_BY_PRICE, FILTER_BY_CATEGORY } from "./index"


const getAllProducts = () => {
    return async (dispatch) => {
        try {
            const products = await axios.get('http://localhost:3001/products')
            // console.log(products)
            return dispatch({
                type: GET_ALL_PRODUCTS,
                payload: products.data
            })
        } catch (error) {
            return dispatch({
                type: USER_ERRORS,
                payload: console.log(error)
            })
        }
    }
}

export function sortByName(order){
    return{
        type: SORT_BY_NAME,
        payload: order
    }
}

export function sortByPrice(order){
    return{
        type: SORT_BY_PRICE,
        payload: order
    }
}

export function filterByCategory(category){
    return{
        type: FILTER_BY_CATEGORY,
        payload: category
    }
}

export default getAllProducts
