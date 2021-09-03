import axios from "axios"
import { GET_ALL_PRODUCTS, USER_ERRORS } from "."


// const getAllProducts = () => {
//     return async( dispatch ) => {

//         try {
//             const products = await axios.get( 'http://localhost:3000/products')
//             return dispatch( {
//                 type: GET_ALL_PRODUCTS,
//                 payload: products.data
//             })

//         } catch (error) {
//             return dispatch( {
//                 type: USER_ERRORS,
//                 payload: console.log( error )
//             } )
//         }
//     }
// }
export function getAllProducts() {
    return function (dispatch) {
        console.log('entrando en action')
       return axios.get('http://localhost:3000/products') // consulto al servidor 
       .then((products) => {
           console.log(products.data)
           dispatch({
               type: GET_ALL_PRODUCTS,
               payload: products.data
           })
       })
    }
}

