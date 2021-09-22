import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {Item} from '.';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

const Items = ({items=[]}) => {
    const [left, setLeft] = useState(0);
    const [length, setLength] = useState(0);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    const sliderRef = useRef(null);

    useEffect(() => {
        setLength(sliderRef.current.getBoundingClientRect().width);
        setLeft(0);
        sliderRef.current.style.left = 0;
    }, [innerWidth]);
    
    // this useEffect is for window resizing
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth !== innerWidth) {
                setInnerWidth(window.innerWidth);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    });

    const slideRight = () => {
        sliderRef.current.style.left = `${left - length}px`;
        setLeft(left - length);
    };

    const slideLeft = () => {
        sliderRef.current.style.left = `${left + length}px`;
        setLeft(left + length);
    };
  
    return (
        <ItemsContainer>
            {left !==0 &&
            <button type='button' className='slide-btn left' onClick={slideLeft}>
                <AiFillLeftCircle/>
            </button>}

            <div className='items-container'>
                <div className='slider-container' ref={sliderRef}>
                    {items.map((item) => {
                        return <Item key={item.id} {...item} />
                    })}
                </div>
            </div>

            {Math.ceil(items.length / (length / (innerWidth > 580 ? 236 : innerWidth > 360 ? 166 : 116))) !== (Math.abs(left / length) + 1) &&
            <button type='button' className='slide-btn right' onClick={slideRight}>
                <AiFillRightCircle/>
            </button>} 
        </ItemsContainer>
    )
};

const ItemsContainer = styled.div`
    display: flex; // 3 flex-items(2arrows and slider)
    align-items: center;
    width: 1520px; // to hold arrows next to slider = 1416px + 104px;
    position: relative;
    // border: 2px solid blue; // for visualisation
    overflow: hidden;

    .items-container {
        width: 1416px; // 220px*6(item length) + 16px*6(margin)
        height: 340px; // equal to item height
        margin: auto; // to center
        display: flex;             //
        flex-direction: column;    //  can delete these 3, but image card effects for top and bottom will be hidden
        justify-content: center;   //
        overflow: hidden;
        // border: 2px solid green; // for visualisation
    }

    .slider-container {
        display: flex; // flex-shrink is set to 0 to let it overflow
        position: relative;
        left: 0px;
        transition: .8s ease-in-out;
        // border: 2px solid black; // for visualisation
    }

    .slide-btn {
        font-size: 3rem;
        color: #00C1FF;
        background: transparent;
        border: none;
        position: absolute;
        outline: none;
        cursor: pointer;
    }
    
    .left {
        left: 0;
    }
    
    .right {
        right: 0;
    }

    @media screen and (max-width: 1550px) {
        width: 1284px; // to hold arrows next to slider = 1180px + 104px;
        .items-container {
            width: 1180px; // 220px*5(item length) + 16px*5(margin)
        }
    }

    @media screen and (max-width: 1350px) {
        width: 1048px; // to hold arrows next to slider = 944px + 104px;
        .items-container {
            width: 944px; // 220px*4(item length) + 16px*4(margin)
        }
    }

    @media screen and (max-width: 1150px) {
        width: 812px; // to hold arrows next to slider = 708px + 104px;
        .items-container {
            width: 708px; // 220px*3(item length) + 16px*3(margin)
        }
    }

    @media screen and (max-width: 820px) {
        width: 576px; // to hold arrows next to slider = 472px + 104px;
        .items-container {
            width: 472px; // 220px*2(item length) + 16px*2(margin)
        }
    }

    @media screen and (max-width: 580px) {
        width: 380px; // to hold arrows next to slider = 236px + 104px;
        .items-container {
            width: 332px; // 150px*2(item length) + 16px*2(margin)
            height: 270px;
        }

        .slide-btn {
            font-size: 1.8rem;
        }
    }

    @media screen and (max-width: 360px) {
        width: 285px; // to hold arrows next to slider = 236px + 104px;
        .items-container {
            width: 232px; // 100px*2(item length) + 16px*2(margin)
            height: 190px;
        }

        .slide-btn {
            font-size: 1.6rem;
        }
    }
    `;
    
    export default Items;
    