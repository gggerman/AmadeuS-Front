import { GET_ALL_PRODUCTS, GET_DETAILS, SORT_BY_NAME, SORT_BY_PRICE, FILTER_BY_CATEGORY } from '../actions/index'


const initialState = {
    productsLoaded: [],
    allProducts: [], //para el filtrado
    detail: {}
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_ALL_PRODUCTS:
            return {
                ...state,
                productsLoaded: action.payload,
                allProducts: action.payload //para el filtrado
            }

        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }

            case SORT_BY_NAME:
                let sortName = action.payload ==='A - Z'? 
                    state.productsLoaded.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1
                        }
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1
                        }
                        return 0
                    })
                    : state.productsLoaded.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1
                        }
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return 1
                        }
                        return 0
                    })
                return {
                ...state,
                productsLoaded: sortName
            }

            case SORT_BY_PRICE:
                let sortPrice = action.payload === 'Lower to Higher'?
                    state.productsLoaded.sort((a, b) => {
                        return a.price - b.price
                    })
                    : state.productsLoaded.sort((a, b) => {
                        return b.price - a.price
                    })
                return {
                ...state,
                productsLoaded: sortPrice
            }

            case FILTER_BY_CATEGORY:
                let allProducts = state.allProducts
                let filterCategory = action.payload === 'All' ?
                    allProducts
                    : allProducts.filter(product => product.categories.includes(action.payload))
                return {
                ...state,
                productsLoaded: filterCategory
            }

        default:
            return state;
    }
}

export default appReducer;
