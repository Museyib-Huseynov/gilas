import {
    CATEGORIES_BEGIN,
    CATEGORIES_SUCCESS,
    CATEGORIES_ERROR,
    ITEMS_BEGIN,
    ITEMS_SUCCESS,
    ITEMS_ERROR,
} from '../actions';

const product_reducer = (state, action) => {
    switch (action.type) {
        case CATEGORIES_BEGIN:
            return {
                ...state,
                categories_loading: true,
            };
        case CATEGORIES_SUCCESS:
            return {
                ...state,
                categories_loading: false,
                categories: action.payload,
            };
        case CATEGORIES_ERROR: 
            return {
                ...state,
                categories_loading: false,
                categories_error: true,
            };
        case ITEMS_BEGIN:
            return {
                ...state,
                items_loading: true,
            };
        case ITEMS_SUCCESS:
            return {
                ...state,
                items_loading: false,
                items: action.payload,
            };
        case ITEMS_ERROR:
            return {
                ...state,
                items_loading: false,
                items_error: true,
            };
        default:
            return state;
    }
};

export default product_reducer;