import {
    ITEMS_BEGIN,
    ITEMS_SUCCESS,
    ITEMS_ERROR,
    ITEMS_PER_CATEGORY_BEGIN,
    ITEMS_PER_CATEGORY_SUCCESS,
    ITEMS_PER_CATEGORY_ERROR,
    SINGLE_ITEM_BEGIN,
    SINGLE_ITEM_SUCCESS,
    SINGLE_ITEM_ERROR,
} from '../actions';

const product_reducer = (state, action) => {
    switch (action.type) {
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
        case ITEMS_PER_CATEGORY_BEGIN:
            return {
                ...state,
                itemsByCategory_loading: true,
            };
        case ITEMS_PER_CATEGORY_SUCCESS:
            return {
                ...state,
                itemsByCategory_loading: false,
                itemsByCategory: action.payload,
            };
        case ITEMS_PER_CATEGORY_ERROR:
            return {
                ...state,
                itemsByCategory_loading: false,
                itemsByCategory_error: true,
            };
        case SINGLE_ITEM_BEGIN:
            return {
                ...state,
                single_item_loading: true,
            };
        case SINGLE_ITEM_SUCCESS:
            return {
                ...state,
                single_item_loading: false,
                single_item: action.payload,
            };
        case SINGLE_ITEM_ERROR:
            return {
                ...state,
                single_item_loading: false,
                single_item_error: true,
            };
        default:
            return state;
    }
};

export default product_reducer;