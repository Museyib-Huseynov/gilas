import React from 'react'
import styled from 'styled-components';
import {Poster, Categories, ItemsList} from '../components'

const Home = () => {

    return (
        <HomeContainer>
            <Poster />
            <Categories />
            {/* <CategoriesMobile /> */}
            <ItemsList/>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    
`;

export default Home
