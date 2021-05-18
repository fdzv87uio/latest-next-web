import Styled from "styled-components"

export const PageWrapper = Styled.div`

    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    background-color: #FFD733;
    width:100%;
    height:auto;


`

export const PageHeader = Styled.div`

    display: grid;
    grid-template-columns: 1fr 5fr;
    justify-items: center;
    align-items: center;
    width:100%;
    height:40px;
    position:relative;
    top: 20px;
    left: 20px;


`

export const BackArrow = Styled.img`


`

export const ContentWrapper = Styled.div`

    width: 100%;
    height: 100%;
    border-radius: 20px 20px 0px 0px;
    box-shadow: 0 -15px 15px -15px #777777;
    background-color: #ffffff;
    position:relative;
    top: 30px;

    #thumbnail-subtitle{
        font-family: 'Montserrat', sans-serif;
        color: #000000; 
        width: 80%;
        font-size:1.2rem;
        text-align: center;
    }

`

export const TextWrapper = Styled.div`

    display: grid;
    grid-template-columns: 1fr;
    width: 95%;
    height: auto;
    position: relative;
    left: 20px;
    top:10px;

    h1{
        font-family: 'Montserrat', sans-serif;
        color: #1958BC;
        font-weight: normal;
        width: 70%;
        font-size:1.7rem;
    }

    p {
        font-family: 'Montserrat', sans-serif;
        color: #000000; 
        width: 80%;
        font-size:1.2rem;
    }

`

export const ThumbnailWrapper = Styled.div`

    width: 95%;
    height: 34em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    position: relative;
    top: 20px;
    gap:0;


`


export const FrontImage = Styled.div`

    width: 80%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;
    background-color: #FFD733;


`


export const SideImage = Styled.div`

    width: 80%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;
    background-color: #FFD733;


`