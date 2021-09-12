import axios from "axios"
import { ADD_USER, GET_ALL_USERS } from "./index"
const { REACT_APP_SERVER } = process.env;

export function addUser(user){
    return async( dispatch ) => {
        try {
<<<<<<< HEAD
            await axios.post('http://localhost:3001/users', user)
=======
            await axios.post(`${REACT_APP_SERVER}/users`, user)
>>>>>>> main
            dispatch({
                type: ADD_USER
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function getAllUsers(){
    return async (dispatch) => {
        try {
<<<<<<< HEAD
            const users = await axios.get('http://localhost:3001/users')
=======
            const users = await axios.get(`${REACT_APP_SERVER}/users`)
>>>>>>> main
            console.log(users)
            return dispatch({
                type: GET_ALL_USERS,
                payload: users.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
