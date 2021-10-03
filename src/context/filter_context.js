import React, {useContext, useReducer, useEffect} from 'react';
import reducer from '../reducers/filter_reducer';
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
import axios from 'axios';
import { useProductsContext } from './products_context';

const initialState = {
    gridView: true,
    sort: 'asc',
    all_products: [],
    filtered_products: [],
    filtered_products_loading: false,
    filtered_products_error: false,
    filters: {
        text: '',
        category: '',
        max_price: 0,
        min_price: 0,
        max_price_limit: 0,
        min_price_limit: 0,
        max_price_limit_: 0,
        min_price_limit_: 0,
    },
}

const FilterContext = React.createContext();

export const FilterProvider = ({children}) => {
    const {items, items_url} = useProductsContext();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({type: LOAD_PRODUCTS, payload: items});
    }, [items]);
    
    useEffect(() => {
        setTimeout(() => {
            dispatch({type: UPDATE_PRICE});
        }, 1000);
    }, [state.filters.max_price_limit, state.filters.min_price_limit]);

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
            if (+value >= +state.filters.max_price_limit) {
                value = +state.filters.max_price_limit;
            }
            if (+value < 0) {
                value = 0;
            }
        }
        if (name === 'max_price_limit') {
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
        dispatch({type: FS_BEGIN});
        try {
            const {text, min_price_limit_, max_price_limit_, category} = state.filters;
            const response = await axios.get(
                `${items_url}?
                    title=${text}&
                    min_price=${min_price_limit_}&
                    max_price=${max_price_limit_}&
                    category=${category}&
                    sort=price,${state.sort}`);
            const data = response.data.data.data;
            dispatch({type: FS_SUCCESS, payload: data});
        } catch {
            dispatch({type: FS_ERROR});
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
            filterAndSortProducts,
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};