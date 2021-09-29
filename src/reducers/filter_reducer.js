import {
    SET_GRIDVIEW,
    SET_LISTVIEW,
    LOAD_PRODUCTS,
    UPDATE_SORT,
    UPDATE_FILTERS,
    FS_BEGIN,
    FS_SUCCESS,
    FS_ERROR,
    CLEAR_FILTERS,
    UPDATE_PRICE,
} from '../actions';

const filter_reducer = (state, action) => {
    switch (action.type) {
        case SET_GRIDVIEW:
            return {
                ...state,
                gridView: true,
            };
        case SET_LISTVIEW:
            return {
                ...state,
                gridView: false,
            };
        case LOAD_PRODUCTS:
            let maxPrice = action.payload.map(p => p.price);
            maxPrice = Math.max(...maxPrice);
            return {
                ...state,
                all_products: [...action.payload],
                filtered_products: [...action.payload],
                filters: {
                    ...state.filters, 
                    max_price: maxPrice, 
                    max_price_limit: maxPrice},
            };
        case UPDATE_SORT:
            return {
                ...state,
                sort: action.payload,
            };
        case UPDATE_FILTERS:
            const {name, value} = action.payload;
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                },
            };
        case UPDATE_PRICE: 
            return {
                ...state,
                filters: {
                    ...state.filters,
                    max_price_limit_: state.filters.max_price_limit,
                    min_price_limit_: state.filters.min_price_limit,
                },
            }
        case FS_BEGIN:
            return {
                ...state,
                filtered_products_loading: true,
            };
        case FS_SUCCESS:
            return {
                ...state,
                filtered_products_loading: false,
                filtered_products: action.payload,
            };
        case FS_ERROR:
            return {
                ...state,
                filtered_products_loading: false,
                filtered_products_error: true,
            };
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: '',
                    category: '',
                    max_price_limit: state.filters.max_price,
                    min_price_limit: 0,
                }
            };
        default:
            return state;
    }
}

export default filter_reducer;