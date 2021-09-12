import axios from "axios"
import { ADD_USER, GET_ALL_USERS } from "./index"

export function addUser(user){
    return async( dispatch ) => {
        try {
            await axios.post('http://localhost:3001/users', user)
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
            const users = await axios.get('http://localhost:3001/users')
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
