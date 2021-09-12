import { GET_ALL_PRODUCTS, GET_DETAILS, SORT_BY_NAME, SORT_BY_PRICE, FILTER_BY_CATEGORY, ADD_CATEGORY, SET_SEARCHBAR } from '../actions/index'
import { GET_ALL_CATEGORIES } from '../actions/index'
import { ADD_USER, GET_ALL_USERS } from '../actions/index'

const initialState = {
    productsLoaded: {
        data: [],
        success: undefined,
        error: undefined,
        loading: false
    },
    allProducts: {
        data: [],
        success: undefined,
        error: undefined,
        loading: false
    }, //para el filtrado
    searchBar: '',
    categoriesLoaded: [],
    detail: {
        data: {},
        success: undefined,
        error: undefined,
        loading: false
    },
    usersLoaded: []
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
            let sortName = {
                data: action.payload.data === 'A - Z' ?
                    state.productsLoaded.data.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1
                        }
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1
                        }
                        return 0
                    })
                    : state.productsLoaded.data.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1
                        }
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return 1
                        }
                        return 0
                    }),
                success: true,
                error: false,
                loading: false
            }
            return {
                ...state,
                productsLoaded: sortName
            }
        case SORT_BY_PRICE:
            let sortPrice = {
                data: action.payload.data === 'Lower to Higher' ?
                    state.productsLoaded.data.sort((a, b) => {
                        return a.price - b.price
                    })
                    : state.productsLoaded.data.sort((a, b) => {
                        return b.price - a.price
                    }),
                success: true,
                error: false,
                loading: false
            }
            return {
                ...state,
                productsLoaded: sortPrice
            }

        case FILTER_BY_CATEGORY:
            let allProducts = state.allProducts
            let filterCategory = {
                data: [],
                success: undefined,
                error: undefined,
                loading: true
            }
            if (action.payload.data === 'All') {
                filterCategory = {
                    data: allProducts.data,
                    success: true,
                    error: false,
                    loading: false
                }
            } else {
                allProducts.data.forEach(product => {
                    product.categories.forEach(p => {
                        if (p.name === action.payload.data) {
                            filterCategory.data.push(product)
                        }
                    })
                    filterCategory.success = true
                    filterCategory.error = false
                    filterCategory.loading = false
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
        case SET_SEARCHBAR:
            return {
                ...state,
                searchBar: action.payload
            }
        case ADD_USER:
            return state;

        case GET_ALL_USERS:
            return {
                ...state,
                usersLoaded: action.payload,
            }

        default:
            return state;
    }
}

export default appReducer;
