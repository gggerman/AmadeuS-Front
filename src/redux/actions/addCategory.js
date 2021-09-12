import axios from "axios"
import { ADD_CATEGORY, USER_ERRORS } from "."



export const addCategory = (  name  ) => {
    return async( dispatch ) => {
        try {
            await axios.post('http://localhost:3001/categories', { name } )
            dispatch({
                type: ADD_CATEGORY
            })

        } catch (error) {
            return dispatch( {
                type: USER_ERRORS,
                payload: console.log( error )
            })
        }
    }
}
