import React, {useContext, useReducer, useEffect} from 'react';
import axios from 'axios';
import reducer from '../reducers/products_reducer';
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
import { useCategoriesContext } from './categories_context';

const items_url = 'https://gilas.hymeria.com/api/v1/items';

const initialState = {
    items: [],
    items_loading: false,
    items_error: false,
    itemsByCategory: [],
    itemsByCategory_loading: false,
    itemsByCategory_error: false,
    single_item: {},
    single_item_loading: false,
    single_item_error: false,
}

const ProductsContext = React.createContext();

export const ProductsProvider = ({children}) => {
    const {categories} = useCategoriesContext();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchItems(items_url);
    }, []);

    useEffect(() => {
        fetchItemsPerCategory();
        // eslint-disable-next-line
    }, [categories]);

    const fetchItems = async (url) => {
        dispatch({type: ITEMS_BEGIN});
        try {
            const response = await axios.get(url);
            const items = response.data.data.data;
            dispatch({type: ITEMS_SUCCESS, payload: items});            
        } catch {
            dispatch({type: ITEMS_ERROR});
        }
    };

    const fetchItemsPerCategory = async () => {
        dispatch({type: ITEMS_PER_CATEGORY_BEGIN});
        try {
            const unresolved = categories.map(async (category) => {
                const {id} = category;
                const response = await axios.get(`${items_url}?category=${id}`)
                const data = response.data.data.data;
                return data;
            });
            const resolved = await Promise.all(unresolved);
            dispatch({type: ITEMS_PER_CATEGORY_SUCCESS, payload: resolved});
        } catch {
            dispatch({type: ITEMS_PER_CATEGORY_ERROR});
        }
    };

    const fetchSingleItem = async (id) => {
        dispatch({type: SINGLE_ITEM_BEGIN});
        try {
            const response = await axios.get(`${items_url}/${id}`);
            const item = response.data.data;
            dispatch({type: SINGLE_ITEM_SUCCESS, payload: item});
        } catch {
            dispatch({type: SINGLE_ITEM_ERROR});
        }
    };

    return (
        <ProductsContext.Provider value={{
            ...state,
            items_url,
            fetchSingleItem,
        }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProductsContext = () => {
    return useContext(ProductsContext);
};