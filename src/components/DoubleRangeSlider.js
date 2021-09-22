import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';

const DoubleRangeSlider = () => {
    const {filters: { 
        price, 
        max_price,
        min_price,
        min_price_limit},
    updateFilters} = useFilterContext();

    const inputLeft = useRef(null);
    const inputRight = useRef(null);
    const thumbLeft = useRef(null);
    const thumbRight = useRef(null);
    const range = useRef(null);

    useEffect(() => {
        setLeftValue();
    }, [min_price_limit]);

    useEffect(() => {
        setRightValue();
    }, [price]);

    const setLeftValue = () => {
        let _this = inputLeft.current;
        let min = parseInt(_this.min);
        let max = parseInt(_this.max);

        _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.current.value));

        let percent = ((_this.value - min) / (max - min)) * 85;

        thumbLeft.current.style.left = percent + '%';
        range.current.style.left = percent + '%';
    };

    const setRightValue = () => {
        let _this = inputRight.current;
        let min = parseInt(_this.min);
        let max = parseInt(_this.max);

        _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.current.value));

        let percent = ((_this.value - min) / (max - min)) * 85;

        thumbRight.current.style.right = (85 - percent) + '%';
        range.current.style.right = (85 - percent) + '%';
    };

    const setLeftValueAndUpdate = (e) => {
        setLeftValue();
        updateFilters(e);
    };

    const setRightValueAndUpdate = (e) => {
        setRightValue();
        updateFilters(e);
    }

    return (
        <Wrapper>
            <input 
                id='left'
                type='range' 
                name='min_price_limit'
                min={min_price} 
                max={max_price} 
                value={min_price_limit}
                ref={inputLeft} 
                onInput={setLeftValueAndUpdate}
            />
            <input 
                id='right'
                type='range' 
                name='price'
                min={min_price}
                max={max_price}
                value={price}
                ref={inputRight} 
                onInput={setRightValueAndUpdate}
            />

            <div className='slider'>
                <div className='track'></div>
                <div className='range' ref={range}></div>
                <div className='thumb left' ref={thumbLeft}></div>
                <div className='thumb right' ref={thumbRight}></div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100px; 
    margin: 0.8rem 0;
    position: relative;

    .slider {
        position: relative;
        height: 5px;
        pointer-events: none;
    }

    .slider > .track {
        position: absolute;
        z-index: 1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border-radius: 5px;
        background-color: #c6aee7;
        // pointer-events: none;
    }

    .slider > .range {
        position: absolute;
        z-index: 2;
        left: 0%;
        right: 0%;
        top: 0;
        bottom: 0;
        border-radius: 5px;
        background-color: #6200ee;
        // pointer-events: none;
    }

    .slider > .thumb {
        position: absolute;
        z-index: 3;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #6200ee;
        // pointer-events: none;
    }

    .slider > .thumb.left {
        left: 0%;
        transform: translate(-50%,-5px);
    }

    .slider > .thumb.right {
        right: 0;
        transform: translate(50%,-5px);
    }

    input[type='range'] {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 5px;
        pointer-events: none;
        appearance: none;
        opacity: 0;

        ::-webkit-slider-thumb {
            -webkit-appearance: none;
            pointer-events: all;
            width: 20px;
            height: 20px;
            border-radius: 0;
            background: red;
        }
    }

    #left::-webkit-slider-thumb {
        transform: translateX(-50%);
    }

    #right::-webkit-slider-thumb {
        transform: translateX(50%);
    }

`;

export default DoubleRangeSlider;
