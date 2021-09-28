import React, {useContext, useReducer, useEffect} from 'react';
import axios from 'axios';
import {
    CATEGORIES_BEGIN,
    CATEGORIES_SUCCESS,
    CATEGORIES_ERROR,
} from '../actions';
import reducer from '../reducers/categories_reducer';

const categories_url = 'https://gilas.hymeria.com/api/v1/categories';

const initialState = {
    categories: [],
    categories_loading: false,
    categories_error: false,
};

const CategoriesContext = React.createContext();

export const CategoriesProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchCategories(categories_url);
    }, []);

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
            dispatch({type: CATEGORIES_SUCCESS, payload: categories});
        } catch {
            dispatch({type: CATEGORIES_ERROR});
        }
    };

    return (
        <CategoriesContext.Provider value={{
            ...state,
        }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategoriesContext = () => {
    return useContext(CategoriesContext);
};
