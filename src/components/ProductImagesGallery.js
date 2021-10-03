import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

const ProductImagesGallery = ({images=[]}) => {
    const [mainImage, setMainImage] = useState(images[0]?.image_path);
    const [imgIndex, setImgIndex] = useState(0);
    const [slideLeft, setSlideLeft] = useState('0px');
    const [countRight, setCountRight] = useState(0);

    const slideRef = useRef(null);

    useEffect(() => {
        setMainImage(images[imgIndex]?.image_path);
    }, [images, imgIndex]);

    const handleLeft = () => {
        if (imgIndex !== 0) {
            setImgIndex(imgIndex - 1);
            if (countRight !== 0 && (imgIndex - countRight) === 0 ) {
                handleSlideLeft();
            }
        }
    };

    const handleRight = () => {
        if (imgIndex !== images.length - 1) {
            setImgIndex(imgIndex + 1);
            if (imgIndex >= 4 && (imgIndex - countRight) === 4) {
                handleSlideRight();
            }
        }
    };

    const handleSlideLeft = () => {
        slideRef.current.style.left = `calc(${slideLeft} + 20%)`;
        setSlideLeft(slideRef.current.style.left);
        setCountRight(countRight - 1);
    };

    const handleSlideRight = () => {
        slideRef.current.style.left = `calc(${slideLeft} - 20%)`;
        setSlideLeft(slideRef.current.style.left);
        setCountRight(countRight + 1);
    };

    return (
        <ProductImagesGalleryContainer>
            {imgIndex !== 0 && 
            <div className='arrow left' onClick={handleLeft}>
                <AiFillLeftCircle />
            </div>}
            <img src={mainImage} alt='main' className='main-image' />
            {imgIndex !== images.length - 1 &&
            <div className='arrow right' onClick={handleRight}>
                <AiFillRightCircle />
            </div>}
            
            {(slideLeft !== '0px' && countRight !== 0) &&
                <div className='slide slideLeft' onClick={handleSlideLeft}>&lt;</div>
            }
            <div className='gallery-container'>
                <div className='gallery' ref={slideRef}>
                    {images.map((image, index) => {
                        return (
                            <img 
                                src={image.image_path} 
                                alt='additional'
                                key={index}
                                onClick={() => {
                                    setMainImage(image.image_path);
                                    setImgIndex(index);
                                }} 
                                className={`${image.image_path === mainImage ? 'add-img active' : 'add-img'}`}
                            />
                        )
                    })}
                </div>
            </div>
            {(images.length > 5 && countRight < (images.length - 5)) &&
                <div className='slide slideRight' onClick={handleSlideRight}>&gt;</div>
            }       
        </ProductImagesGalleryContainer>
    );
};

const ProductImagesGalleryContainer = styled.div`
    display: block;
    width: 40%;
    height: fit-content;
    -moz-user-select: none;
    -webkit-user-select: none;
    position: relative;
    // outline: 2px solid #000;

    .main-image {
        display:block;
        width: 100%;
        height: 550px;
        object-fit: cover;
        border-radius: 10px;
        // border: 2px solid blue;
    }

    .arrow {
        font-size: 4rem;
        color: #00C1FF;
        cursor: pointer;
        outline: none;
        position: absolute;
    }

    .left {
        top: calc(50% - 45px);
        left: 0;
        transform: translateY(-50%);
    }

    .right {
        top: calc(50% - 45px);
        right: 0;
        transform: translateY(-50%);
    }

    .gallery-container {
        overflow: hidden;
        // outline: 2px solid red;
    }

    .gallery {
        display: flex;
        flex-direction: row;
        width: 100%;
        position: relative;
        left: 0px;
        transition: left .1s linear;
    }

    .add-img {
        width: 18%;
        height: 70px;
        flex-shrink: 0;
        margin: 1%;
        border-radius: 10px;
        object-fit: cover;
        cursor: pointer;
    }

    .active {
        box-shadow: 0px 0px 0px 3px #00C1FF;
    }

    .slide {
        position: absolute;
        bottom: calc(19px + 1%); // (70px - 32px) / 2 = 19px
        font-size: 32px;
        cursor: pointer;
    }

    .slideLeft {
        left: -30px;
    }

    .slideRight {
        right: -30px;
    }

    @media screen and (max-width: 1200px) {
        .main-image {
            height: 450px;
        }
        .add-img {
            height: 60px;
        }
        .arrow {
            font-size: 3rem;
        }

        .left {
            top: calc(50% - 40px);
        }

        .right {
            top: calc(50% - 40px);
        }

        .slide {
            bottom: calc(14px + 1%); // (60px - 32px) / 2 = 14px
        }
    }

    @media screen and (max-width: 1000px) {
        .main-image {
            height: 400px;
        }
        .add-img {
            height: 55px;
        }
        .arrow {
            font-size: 2rem;
        }

        .left {
            top: calc(50% - 37.5px);
        }

        .right {
            top: calc(50% - 37.5px);
        }

        .slide {
            bottom: calc(11.5px + 1%); // (55px - 32px) / 2 = 11.5px
        }        
    }

    @media screen and (max-width: 800px) {
        width: 100%;
        .main-image {
            height: 600px;
        }
        .add-img {
            height: 80px;
        }
        .slide {
            bottom: calc(24px + 1%); // (80px - 32px) / 2 = 24px
        }
    }

    @media screen and (max-width: 560px) {
        width: 100%;
        .main-image {
            height: 250px;
        }
        .add-img {
            height: 50px;
        }
        .arrow {
            font-size: 2rem;
        }

        .left {
            top: calc(50% - 35px);
        }

        .right {
            top: calc(50% - 35px);
        }

        .slide {
            bottom: calc(9px + 1%); // (50px - 32px) / 2 = 9px
        }
    }
`;

export default ProductImagesGallery;
