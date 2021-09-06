import { GET_ALL_PRODUCTS, GET_DETAILS, SORT_BY_NAME, SORT_BY_PRICE, FILTER_BY_CATEGORY, ADD_CATEGORY } from '../actions/index'
import { GET_ALL_CATEGORIES } from '../actions/index'


const initialState = {
    productsLoaded: [],
    allProducts: [], //para el filtrado
    categoriesLoaded: [],
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
                let filterCategory=[]
                if(action.payload === 'All'){
                    filterCategory = allProducts
                } else {
                    allProducts.forEach(product => {
                        product.categories.forEach(p => {
                            if(p.name === action.payload) filterCategory.push(product)
                        })
                    })
                }
                return {
                ...state,
                productsLoaded: filterCategory
            }

            case GET_ALL_CATEGORIES:
                return {
                    ...state,
                    categoriesLoaded: action.payload,
                }

            case ADD_CATEGORY:
                return state;

        default:
            return state;
    }
}

export default appReducer;
