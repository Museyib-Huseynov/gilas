import {
    SET_GRIDVIEW,
    SET_LISTVIEW,
    SORT_PRODUCTS,
    UPDATE_SORT,
    LOAD_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
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
        case UPDATE_SORT:
            return {
                ...state,
                sort: action.payload,
            };
        case SORT_PRODUCTS:
            const {sort, filtered_products} = state;
            let tempProducts = [...filtered_products];
            if (sort === 'price-lowest') {
                tempProducts = tempProducts.sort((a, b) => +a.price - +b.price);
            }
            if (sort === 'price-highest') {
                tempProducts = tempProducts.sort((a, b) => +b.price - +a.price);
            }
            if (sort === 'name-a') {
                tempProducts = tempProducts.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            }
            if (sort === 'name-z') {
                tempProducts = tempProducts.sort((a, b) => {
                    return b.name.localeCompare(a.name);
                });
            }
            return {
                ...state,
                filtered_products: tempProducts,
            };
        case LOAD_PRODUCTS:
            let maxPrice = action.payload.map(p => p.price);
            maxPrice = Math.max(...maxPrice);
            return {
                ...state,
                filters: {
                    ...state.filters, 
                    max_price: maxPrice, 
                    price: maxPrice},
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
        case FILTER_PRODUCTS:
            const {all_products} = state;
            const {text, category, price, min_price_limit} = state.filters;
            let temporaryProducts = [...all_products];
            //filtering
            //text
            if (text) {
                temporaryProducts = temporaryProducts.filter((product) => {
                    return product.name.toLowerCase().startsWith(text);
                });
            }
            //category
            if (category !== 'Hamısı'){
                temporaryProducts = temporaryProducts.filter(product => product.category === category);
            }
            //price
            temporaryProducts = temporaryProducts.filter(product => +product.price >= min_price_limit && +product.price <= price );
            return {
                ...state,
                filtered_products: temporaryProducts,
            };
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: '',
                    category: 'Hamısı',
                    price: state.filters.max_price,
                    min_price_limit: 0,
                }
            };
        default:
            return state;
    }
}

export default filter_reducer;