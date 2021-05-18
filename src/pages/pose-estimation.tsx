import React, { useEffect, useRef, useState } from 'react'
import * as posenet from '@tensorflow-models/posenet'
import '@tensorflow/tfjs-backend-webgl'
import * as S from '../../styles/pose_estimation.styles'
import { drawKeypoints } from '../../utils/tensorflow-utils'
import { Button } from '@material-ui/core'
import { Canvas } from '../common/Canvas/Canvas'
import { OrientationAxis } from '../common/OrientationAxis/OrientationAxis'

export class DeviceOrientationInfo {
  absolute = false
  alpha: number | null = null
  beta: number | null = null
  gamma: number | null = null
}

const PoseEstimation = (): JSX.Element => {
  // refs for both the webcam and canvas components
  const camRef = useRef(null)
  const canvasRef = useRef(null)

  // Ios permission  hooks
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false)
  const [deviceOrientation, setDeviceOrientation] =
    useState<DeviceOrientationInfo>()
  //Ios permission methods
  function grantPermissionForDeviceOrientation() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            setPermissionGranted(true)
            window.addEventListener(
              'deviceorientation',
              handleDeviceOrientationEvent
            )
          }
        })
        .catch(console.error)
    } else {
      // handle regular non iOS 13+ devices
      setPermissionGranted(true)
      window.addEventListener('deviceorientation', handleDeviceOrientationEvent)
    }
  }

  function handleDeviceOrientationEvent(ev: DeviceOrientationEvent) {
    setDeviceOrientation({
      absolute: ev.absolute,
      alpha: ev.alpha,
      beta: ev.beta,
      gamma: ev.gamma,
    })
  }

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.navigator !== 'undefined'
    ) {
      runPosenet()
    }
  }, [])
  // //load rotation coordinates

  // // // load and run posenet function

  async function runPosenet() {
    const net = await posenet.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      inputResolution: 257,
      multiplier: 0.5,
    })

    setInterval(() => {
      detect(net)
    }, 777)
  }

  const detect = async (net) => {
    if (
      typeof camRef.current !== 'undefined' &&
      camRef.current !== null &&
      typeof camRef.current.camRef.current !== 'undefined' &&
      camRef.current.camRef.current.readyState === 4
    ) {
      // Get Video Properties
      const video = camRef.current.camRef.current
      const videoWidth = 400
      const videoHeight = 400

      // Make detections
      const pose = await net.estimateSinglePose(video)
      // eslint-disable-next-line no-console
      console.log(pose)
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef)
    }
  }

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext('2d')
    canvas.current.width = videoWidth
    canvas.current.height = videoHeight

    const kp = pose['keypoints']
    drawKeypoints(kp, 0.35, ctx)
  }

  return (
    <>
      <S.PageWrapper>
        {typeof window !== 'undefined' &&
        typeof window.navigator !== 'undefined' ? (
          <div></div>
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
              textAlign: 'center',
              zIndex: 9,
              width: 400,
              height: 400,
            }}
          />
        ) : null}
      </S.PageWrapper>
      {permissionGranted === true ? (
        <Canvas width={400} height={400} dpr={1} isAnimating={true}>
          <OrientationAxis
            beta={deviceOrientation?.beta}
            gamma={deviceOrientation?.gamma}
          />
        </Canvas>
      ) : (
        <Button onClick={grantPermissionForDeviceOrientation}>
          Authorize Orientation
        </Button>
      )}
    </>
  )
}

export default PoseEstimation
