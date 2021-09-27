import React, {useContext, useReducer, useEffect} from 'react';
import axios from 'axios';
import reducer from '../reducers/products_reducer';
import {
    CATEGORIES_BEGIN,
    CATEGORIES_SUCCESS,
    CATEGORIES_ERROR,
    ITEMS_BEGIN,
    ITEMS_SUCCESS,
    ITEMS_ERROR,
    ITEMS_PER_CATEGORY_BEGIN,
    ITEMS_PER_CATEGORY_SUCCESS,
    ITEMS_PER_CATEGORY_ERROR,
} from '../actions';

const categories_url = 'https://gilas.hymeria.com/api/v1/categories';
const items_url = 'https://gilas.hymeria.com/api/v1/items';

const initialState = {
    categories: [],
    categories_loading: false,
    categories_error: false,
    items: [],
    items_loading: false,
    items_error: false,
    itemsByCategory: [],
    itemsByCategory_loading: false,
    itemsByCategory_error: false,
}

const ProductsContext = React.createContext();

export const ProductsProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCategories = async (url) => {
        dispatch({type: CATEGORIES_BEGIN});
        let categories;
        try {
            if (sessionStorage.getItem('categories')) {
                categories = JSON.parse(sessionStorage.getItem('categories'));
            } else {
                const response = await axios.get(url);
                categories = response.data.data;
                sessionStorage.setItem('categories', JSON.stringify(categories));
            }
            // const response = await axios.get(url);
            // categories = response.data.data;
            dispatch({type: CATEGORIES_SUCCESS, payload: categories});
        } catch {
            dispatch({type: CATEGORIES_ERROR});
        }
    };

    const fetchItems = async (url) => {
        dispatch({type: ITEMS_BEGIN});
        try {
            const response = await axios.get(url);
            const items = response.data.data.data;
            dispatch({type: ITEMS_SUCCESS, payload: items});            
        } catch {
            dispatch({type: ITEMS_ERROR})
        }
    };

    const fetchItemsPerCategory = async () => {
        dispatch({type: ITEMS_PER_CATEGORY_BEGIN});
        try {
            const unresolved = state.categories.map(async (category) => {
                const {id, title} = category;
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

    useEffect(() => {
        fetchCategories(categories_url);
        fetchItems(items_url);
    }, []);

    useEffect(() => {
        fetchItemsPerCategory();
    }, [state.categories]);

    return (
        <ProductsContext.Provider value={{
            ...state,
        }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProductsContext = () => {
    return useContext(ProductsContext);
};