import axios from "axios"
import { GET_DETAILS } from "."

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
            const productDetail = await axios.get(`http://localhost:3001/products/${id}`)
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
