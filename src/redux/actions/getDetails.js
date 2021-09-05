import axios from "axios"
import { GET_DETAILS, USER_ERRORS } from "."

const getDetails = (id) => {
    return async (dispatch) => {
        try {
            const productDetail = await axios.get(`http://localhost:3001/${id}`)
            return dispatch({
                type: GET_DETAILS,
                payload: productDetail.data
            })

        } catch (error) {
            return dispatch({
                type: USER_ERRORS,
                payload: console.log(error)
            })
        }
    }
}

export default getDetails
