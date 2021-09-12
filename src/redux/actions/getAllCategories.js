import axios from "axios"
import { GET_ALL_CATEGORIES } from "./index"

export const getAllCategories = () => {
    return async (dispatch) => {
        try {
            const categories = await axios.get('http://localhost:3001/categories')
            console.log(categories)
            return dispatch({
                type: GET_ALL_CATEGORIES,
                payload: categories.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
