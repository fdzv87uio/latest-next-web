import React, { useEffect, useRef, useState } from 'react'
// Netpose tensor flow dependencies
import * as tf from '@tensorflow/tfjs'
import * as posenet from '@tensorflow-models/posenet'
import '@tensorflow/tfjs-backend-webgl'
// web camera library
import Webcam from 'react-webcam'
//Styled components ref
import * as S from './FrontPoseCamera.styles'
import { drawKeypoints } from '../../../utils/tensorflow-utils'
import { Canvas } from '../Canvas/Canvas'
import { OrientationAxis } from '../OrientationAxis/OrientationAxis'
import { DeviceOrientationInfo } from '../../pages/pose-selection'


// Define general type for useWindowSize hook, which includes width and height
interface Size {
  width: number | undefined
  height: number | undefined
}

const FrontPoseCamera = ({
  deviceOrientation,
  permissionGranted,
}: {
  deviceOrientation: DeviceOrientationInfo
  permissionGranted: boolean
}): JSX.Element => {


  // refs for both the webcam and canvas components
  const camRef = useRef(null)
  const canvasRef = useRef(null)
  // Window size const

  const size: Size = useWindowSize();

    // Funstion to retrieve windows size of the device on load an set it as a cosntant
    function useWindowSize(): Size {

      const [windowSize, setWindowSize] = useState<Size>({
        width: undefined,
        height: undefined,
      });
    
      useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          })
        }
  
        // Add event listener
        window.addEventListener('resize', handleResize)
  
        // Call handler right away so state gets updated with initial window size
        handleResize()
  
        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize)
      }, []) // Empty array ensures that effect is only run on mount
  
      console.log(windowSize)
      return windowSize
    }

  // posenet function

  async function Posenet() {
    const net = await posenet.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      inputResolution: 257,
      multiplier: 0.5,
    })

    setInterval(() => {
      detect(net)
    }, 100)


  }

  //Postnet detection method
  const detect = async (net) => {
    if (
      typeof camRef.current !== 'undefined' &&
      camRef.current !== null &&
      typeof camRef.current.video !== 'undefined' &&
      camRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = camRef.current.video
      const videoWidth = size.width
      const videoHeight = size.height
      console.log(videoWidth)
      // Make detections
      const pose = await net.estimateSinglePose(video)
      console.log(pose)
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef)
    }
  }

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext('2d')
    canvas.current.width = videoWidth
    canvas.current.height = videoHeight

    var kp = pose['keypoints']
    drawKeypoints(kp, 0.35, ctx)
  }

 const startPoseNet =async()=>{
  if (
    typeof window !== 'undefined' &&
    typeof window.navigator !== 'undefined' &&
    size !== null
  ) {
    Posenet()
  }
 }

 startPoseNet()

 

  return (
    <>
      <S.CameraWrapper width={size.width} height={size.height}>
        {typeof window !== 'undefined' &&
        typeof window.navigator !== 'undefined' ? (
          <Webcam
            audio={false}
            ref={camRef}
            screenshotFormat="image/jpeg"
            width={size.width}
            height={size.height}
          />
        ) : null} 
        {typeof window !== 'undefined' &&
        typeof window.navigator !== 'undefined' ? (
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: 'auto',
              left: 0,
              right: 0,
              zIndex: 9,
              width:size.width,
              height:size.height,
            }}
            
          />
        ) : null}
        {permissionGranted === true ? (
          <Canvas width={size.width} height={size.height} dpr={1} isAnimating={true}>
            <OrientationAxis
              beta={deviceOrientation?.beta}
              gamma={deviceOrientation?.gamma}
            ></OrientationAxis>
          </Canvas>
        ) : null}
      </S.CameraWrapper>
    </>
  )
}

export default FrontPoseCamera
