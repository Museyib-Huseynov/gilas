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
} from '../actions';
import items from '../data/items';

const initialState = {
    gridView: true,
    sort: 'price-lowest',
    all_products: items,
    filtered_products: items,
    filters: {
        text: '',
        category: 'Hamısı',
        price: 0,
        max_price: 0,
        min_price: 0,
        min_price_limit: 0,
    },
}

const FilterContext = React.createContext();

export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({type: LOAD_PRODUCTS, payload: state.all_products});
    }, [state.all_products]);

    useEffect(() => {
        dispatch({type: FILTER_PRODUCTS})
        dispatch({type: SORT_PRODUCTS})
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
            value = e.target.textContent;
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
                if (+value <= +state.filters.min_price_limit) {
                    value = +state.filters.min_price_limit;
                }
            }
            if (+value > +state.filters.max_price) {
                value = +state.filters.max_price;
            }
        }
        dispatch({type: UPDATE_FILTERS, payload: {name, value}})
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