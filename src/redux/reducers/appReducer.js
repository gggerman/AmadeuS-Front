import {GET_ALL_PRODUCTS, GET_DETAILS} from '../actions/index'


const initialState = {
    productsLoaded: [],
    detail: {}
}

const appReducer = ( state = initialState, action ) => {
    
    switch ( action.payload ){

        case GET_ALL_PRODUCTS:
            return {
                ...state, 
                productsLoaded: action.payload
            }

        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }

        default:
            return state;
    }
}

export default appReducer;
