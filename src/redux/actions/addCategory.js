import axios from "axios"
import { ADD_CATEGORY, USER_ERRORS } from "."
const { REACT_APP_SERVER } = process.env;

export const addCategory = (  name  ) => {
    return async( dispatch ) => {
        try {
<<<<<<< HEAD
            await axios.post('http://localhost:3001/categories', { name } )
=======
            await axios.post(`${REACT_APP_SERVER}/categories`, { name } )
>>>>>>> main
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
