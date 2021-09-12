import axios from "axios"
import { GET_ALL_CATEGORIES } from "./index"
const { REACT_APP_SERVER } = process.env;

export const getAllCategories = () => {
    return async (dispatch) => {
        try {
            const categories = await axios.get(`${REACT_APP_SERVER}/categories`)
            return dispatch({
                type: GET_ALL_CATEGORIES,
                payload: categories.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
