import axios from "axios"
import { GET_DETAILS, USER_ERRORS } from "."
const { REACT_APP_SERVER } = process.env;

export const getDetails = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_DETAILS,
                payload: {
                    data: {},
                    success: undefined,
                    error: undefined,
                    loading: true
                }
            })
<<<<<<< HEAD
            const productDetail = await axios.get(`http://localhost:3001/products/${id}`)
=======
            const productDetail = await axios.get(`${REACT_APP_SERVER}/products/${id}`)
>>>>>>> main
            return dispatch({
                type: GET_DETAILS,
                payload: {
                    data: productDetail.data,
                    success: true,
                    error: false,
                    loading: false
                }
            })
        } catch (error) {
            return dispatch({
                type: GET_DETAILS,
                payload: {
                    data: [],
                    success: false,
                    error: error,
                    loading: false
                }
            })
        }
    }
}

export default getDetails
