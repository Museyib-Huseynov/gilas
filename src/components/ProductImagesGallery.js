import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

const ProductImagesGallery = ({images=[]}) => {
    const [mainImage, setMainImage] = useState(images[0]?.image_path);
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        setMainImage(images[imgIndex]?.image_path);
    }, [images, imgIndex]);

    const handleLeft = () => {
        if (imgIndex !== 0) {
            setImgIndex(imgIndex - 1);
        }
    };

    const handleRight = () => {
        if (imgIndex !== images.length - 1) {
            setImgIndex(imgIndex + 1);
        }
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
            
            <div className='slideLeft'>&lt;</div>
            <div className='gallery'>
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
            <div className='slideRight'>&gt;</div>
        </ProductImagesGalleryContainer>
    );
};

const ProductImagesGalleryContainer = styled.div`
    display: inline-block;
    width: 40%;
    height: fit-content;
    -moz-user-select: none;
    -webkit-user-select: none;
    position: relative;
    // border: 2px solid #000;

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

    .gallery {
        display: flex;
        flex-direction: row;
        overflow: hidden;
        // outline: 2px solid red;
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
        box-shadow: 0px 0px 0px 2px #00C1FF;
    }

    .slideLeft {
        position: absolute;
        bottom: calc(19px + 1%);
        left: -30px;
        font-size: 32px;
        cursor: pointer;
    }

    .slideRight {
        position: absolute;
        bottom: calc(19px + 1%);
        right: -30px;
        font-size: 32px;
        cursor: pointer;
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
        
    }

    @media screen and (max-width: 800px) {
        width: 100%;
        .main-image {
            height: 600px;
        }
        .add-img {
            height: 80px;
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
    }

`;

export default ProductImagesGallery;
