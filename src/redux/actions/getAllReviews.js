import axios from "axios"
import { GET_ALL_REVIEWS } from "./index"
const { REACT_APP_SERVER } = process.env;

export default function getAllReviews(){
    return async (dispatch) => {
        try {
            const reviews = await axios.get(`${REACT_APP_SERVER}/reviews`)
            return dispatch({
                type: GET_ALL_REVIEWS,
                payload: reviews.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}