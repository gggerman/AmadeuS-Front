import axios from 'axios';
import { ADD_TO_CART, USER_ERRORS } from ".";

const addToCart = ( id ) => {
   
    return async( dispatch ) =>{

        try {
            const itemAdded = await axios.get(`http://localhost:3001/products/${id}`)
            return dispatch ({
                type: ADD_TO_CART,
                payload : itemAdded.data
            })
            
        } catch (error) {
            return dispatch({
                type: USER_ERRORS,
                payload: console.log( error )
            })
        }
        
    }
    
}
export default addToCart
