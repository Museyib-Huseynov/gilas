import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import mainImage from '../poster.jpg'


const Poster = () => {
    const [width, setWidth] = useState(window.innerWidth);
    
    // new Y  = (initial Y / original.height) * newHeight
    useEffect(() => {
        // original image size 5307 x 3317 => aspect ratio = 5307 / 3317 = 1.599
        const img = document.getElementById('img');
        const imgWidth = img.getBoundingClientRect().width;
        const imgHeight = img.getBoundingClientRect().height;
        
        const topExcess = (imgWidth / 1.599 - imgHeight) / 2;
        
        // line1 original Y position from top: 1134 => position = 1134 / 3317 = 0.34
        // line1 original X position from right: 4067 => position = 4067 / 5307 = 0.766
        const line1 = document.getElementById('line1');
        line1.style.top = (0.34 * (imgWidth / 1.599) - topExcess) + 'px';
        line1.style.right = (0.766 * imgWidth) + 'px'; 
        // line1Text original Y position from top: 1210 => position = 1210 / 3317 = 0.365
        // line1Text original X position from right: 4298 => position = 4298 / 5307 = 0.81
        const line1Text = document.getElementById('line1-text');
        line1Text.style.top = (0.365 * (imgWidth / 1.599) - topExcess) + 'px';
        line1Text.style.right = (0.81 * imgWidth) + 'px';
        
        setTimeout(() => {
            line1.style.width='8vw';
            setTimeout(() => {
                line1.style.height='1.5vw';
                setTimeout(() => {
                    line1Text.style.opacity='1';
                }, 300)
            }, 300);
        }, 300);
        
        // line2 original Y position from top: 1995 => position = 1995 / 3317 = 0.6
        // line2 original X position from right: 4067 => position = 3768 / 5307 = 0.71
        const line2 = document.getElementById('line2');     
        line2.style.top = (0.6 * (imgWidth / 1.599) - topExcess) + 'px';  
        line2.style.right = (0.71 * imgWidth) + 'px'; 
        // line2Text original Y position from top: 2063 => position = 2063 / 3317 = 0.622
        // line2Text original X position from right: 4352 => position = 4352 / 5307 = 0.82
        const line2Text = document.getElementById('line2-text');
        line2Text.style.top = (0.622 * (imgWidth / 1.599) - topExcess) + 'px';
        line2Text.style.right = (0.82 * imgWidth) + 'px';

        setTimeout(() => {
            line2.style.width='15vw';
            setTimeout(() => {
                line2.style.height = '1.5vw';
                setTimeout(() => {
                    line2Text.style.opacity = '1';
                }, 300);
            }, 300);
        }, 1200);

        // line3 original Y position from bottom: 1592 => position = 1592 / 3317 = 0.48
        // line3 original X position from left: 2335 => position = 2335 / 5307 = 0.44
        const line3 = document.getElementById('line3');     
        line3.style.bottom = (0.48 * (imgWidth / 1.599) - topExcess) + 'px';  
        line3.style.left = (0.44 * imgWidth) + 'px'; 
        // line3Text original Y position from bottom: 1658 => position = 1658 / 3317 = 0.5
        // line3Text original X position from left: 2759 => position = 2759 / 5307 = 0.52
        const line3Text = document.getElementById('line3-text');
        line3Text.style.bottom = (0.50 * (imgWidth / 1.599) - topExcess) + 'px';
        line3Text.style.left = (0.52 * imgWidth) + 'px';

        setTimeout(() => {
            line3.style.width='12vw';
            setTimeout(() => {
                line3.style.height = '1.5vw';
                setTimeout(() => {
                    line3Text.style.opacity = '1';
                }, 300);
            }, 300);
        }, 2100);

        // mainText original Y position from top: 1824 => position = 1824 / 3317 = 0.55
        // mainText original X position from right: 265 => position = 265 / 5307 = 0.05
        const mainText = document.getElementById('main-text');
        mainText.style.top = (0.6 * (imgWidth / 1.599) - topExcess) + 'px';
        mainText.style.right = (0.08 * imgWidth) + 'px';


        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [width]);

    return (
        <PosterContainer>
            <img id='img' src={mainImage} alt='poster' />

            <div id='line1'></div>
            <div id='line1-text'>
                <span className='line-text-span'>Çanta</span> <br/> 5 AZN / həftəlik
            </div>

            <div id='line2'></div>
            <div id='line2-text'>
                <span className='line-text-span'>Velosiped</span> <br/> 20 AZN / həftəlik
            </div>

            <div id='line3'></div>
            <div id='line3-text'>
                <span className='line-text-span'>İdman Geyimi</span> <br/> 15 AZN / həftəlik
            </div>

            <div id='main-text'>
                ALMA! <br /> <span className='main-text-span'>İCARƏYƏ GÖTÜR</span>
            </div>
        </PosterContainer>
    )
};


const PosterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    height: 60vh;
    user-select: none;
    position: relative;
    overflow: hidden;

    img {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    #line1 {
        width: 0px;
        height: 0px;
        border-top: 1px solid #fff;
        border-left: 1px solid #fff;
        position: absolute;
        transition: all .3s;
    }

    #line2 {
        width: 0px;
        height: 0px;
        border-top: 1px solid #fff;
        border-left: 1px solid #fff;
        position: absolute;
        transition all .3s
    }

    #line3 {
        width: 0px;
        height: 0px;
        border-bottom: 1px solid #fff;
        border-right: 1px solid #fff;
        position: absolute;
        transition all .3s
    }

    #line1-text {
        position: absolute;
        color: #fff;
        background: #2b2b2b;
        border-radius: 5px;
        padding: 0.5vh 0.5vw;
        text-align: center;
        font-size: 0.8rem;   
        letter-spacing: 1px;
        opacity: 0; 
        transition: opacity .3s;
    }

    #line2-text {
        position: absolute;
        color: #fff;
        background: #2b2b2b;
        border-radius: 5px;
        padding: 0.5vh 0.5vw;
        text-align: center;
        font-size: 0.8rem;   
        letter-spacing: 1px;
        opacity: 0; 
        transition: opacity .3s;
    }

    #line3-text {
        position: absolute;
        color: #fff;
        background: #2b2b2b;
        border-radius: 5px;
        padding: 0.5vh 0.5vw;
        text-align: center;
        font-size: 0.8rem;   
        opacity: 0; 
        letter-spacing: 1px;
        transition: opacity .3s;
    }

    .line-text-span {
        font-weight: 700;
        font-size: 1rem;
    }

    #main-text {
        position: absolute;
        color: #fff;
        border-radius: 10px;
        padding: 1vw 1vw; 
        font-size: 2vw;
        letter-spacing: 5px;
        text-align: center;
        transition: opacity .3s;
        // background: rgba(0,0,0,0.3);
    }

    .main-text-span {
        color: #03b8f4;
        font-weight: 900;
    }

    @media screen and (max-width: 800px) {
        height: 280px;
        align-items: center;
        justify-content: center;

        #line1-text {
            font-size: 0.6rem;
            padding: 0;
        }
        #line2-text {
            font-size: 0.6rem;
            padding: 0;
        }
        #line3-text {
            font-size: 0.6rem;
            padding: 0;
        }
        .line-text-span {
            font-size: 0.7rem;
        }
    }

`;

export default Poster;
