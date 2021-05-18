import Styled from "styled-components"

// Define general type for useWindowSize hook, which includes width and height
interface CameraWrapperProps {
    width: number | undefined
    height: number | undefined
  }
  

export const CameraWrapper = Styled.div<CameraWrapperProps>`

    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    width:${props => props.width};
    height:${props => props.heigth};

    
`
export const TopMargin = Styled.div`

    width: 100%;
    height: 40px;


`
export const BottomMargin = Styled.div`

    width: 100%;
    height: 90px;


`
