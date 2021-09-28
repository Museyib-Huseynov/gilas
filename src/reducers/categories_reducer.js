import {
    CATEGORIES_BEGIN,
    CATEGORIES_SUCCESS,
    CATEGORIES_ERROR,
} from '../actions';

const categories_reducer = (state, action) => {
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
        default:
            return state;
    }
};

export default categories_reducer;