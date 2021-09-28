import React, {useContext, useReducer, useEffect} from 'react';
import reducer from '../reducers/filter_reducer';
import {
    SET_GRIDVIEW,
    SET_LISTVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    LOAD_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
    ITEMS_BEGIN,
    ITEMS_SUCCESS,
    ITEMS_ERROR,
} from '../actions';
import axios from 'axios';
import { useProductsContext } from './products_context';

const base_url = 'https://gilas.hymeria.com/api/v1/';

const initialState = {
    gridView: true,
    sort: 'asc',
    all_products: [],
    filtered_products: [],
    items_loading: false,
    items_error: false,
    filters: {
        text: '',
        category: '',
        price: 0,
        max_price: 0,
        min_price: 0,
        min_price_limit: 0,
    },
}

const FilterContext = React.createContext();

export const FilterProvider = ({children}) => {
    const {items} = useProductsContext();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({type: LOAD_PRODUCTS, payload: items});
    }, [items]);

    useEffect(() => {
        // dispatch({type: FILTER_PRODUCTS})
        // dispatch({type: SORT_PRODUCTS})
        filterAndSortProducts();
    }, [state.sort, state.filters]);

    const setGridView = () => {
        dispatch({type: SET_GRIDVIEW});
    };

    const setListView = () => {
        dispatch({type: SET_LISTVIEW});
    }

    const updateSort = (e) => {
        const value = e.target.value;
        dispatch({type: UPDATE_SORT, payload: value});
    };

    const updateFilters = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'text') {
            value = value.toLowerCase();
        }
        if (name === 'category') {
            value = e.target.id;
        }
        if (name === 'min_price_limit') {
            if (+value >= +state.filters.price) {
                value = +state.filters.price;
            }
            if (+value < 0) {
                value = 0;
            }
        }
        if (name === 'price') {
            if (String(+value).length === String(+state.filters.min_price_limit).length) {
                if (+value <= +state.filters.min_price_limit && +value !== 0) {
                    value = +state.filters.min_price_limit;
                }
            }
            if (+value > +state.filters.max_price) {
                value = +state.filters.max_price;
            }
        }
        dispatch({type: UPDATE_FILTERS, payload: {name, value}})
    };

    const filterAndSortProducts = async () => {
        dispatch({type: ITEMS_BEGIN});
        try {
            const {text, min_price_limit, price, category} = state.filters;
            const response = await axios.get(
                `${base_url}items?
                    title=${text}&
                    min_price=${min_price_limit}&
                    max_price=${price}&
                    category=${category}&
                    sort=price,${state.sort}`);
            const data = response.data.data.data;
            dispatch({type: ITEMS_SUCCESS, payload: data});
        } catch {
            dispatch({type: ITEMS_ERROR});
        }
    };

    const clearFilters = (e) => {
        dispatch({type: CLEAR_FILTERS});
    };

    return (
        <FilterContext.Provider value={{
            ...state,
            dispatch,
            setGridView,
            setListView,
            updateSort,
            updateFilters,
            clearFilters,
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};