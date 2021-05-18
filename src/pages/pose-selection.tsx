import React, { useState } from 'react'
import SiteWrapper from '../common/SiteWrapper/SiteWrapper'
import * as S from '../../styles/pose_selection.styles'
import Link from 'next/link'
import FrontPoseCamera from '../common/FrontPoseCamera/FrontPoseCamera.component'

//device orientation Info Props
export class DeviceOrientationInfo {
  absolute = false
  alpha: number | null = null
  beta: number | null = null
  gamma: number | null = null
}

export default function PoseSelection() {
  // camera selection Hooks
  const [frontPose, setFrontPose] = useState<boolean>(false)
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
            console.log("permission granted")
          }
        })
        .catch(console.error)
    } else {
      // handle regular non iOS 13+ devices
      setPermissionGranted(true)
      window.addEventListener('deviceorientation', handleDeviceOrientationEvent)
      console.log("permission granted")
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

  if ( frontPose === true) {
    return (
        <FrontPoseCamera
          deviceOrientation={deviceOrientation}
          permissionGranted={permissionGranted}
        />
    )
  } else {
    return (
        <S.PageWrapper>
          <S.PageHeader>
            <Link href="/terms-and-conditions">
              <S.BackArrow
                src="/images/Arrow_Back.png"
                width={25}
                height={25}
              />
            </Link>
            <div>&nbsp;</div>
          </S.PageHeader>
          <S.ContentWrapper>
            <S.TextWrapper>
              <h1>Next we will take two photos</h1>
              <Link href="#">
                <img src="/images/Info_Button.png" height={25} width={25} />
              </Link>
              <p>
                This works better wearing tighter fit clothing or even athletic
                or swimwear
              </p>
              <p>Need a second person to help</p>
            </S.TextWrapper>
            <S.ThumbnailWrapper>
              <S.FrontImage>
                <img
                  onClick={() => {
                    grantPermissionForDeviceOrientation()
                    setFrontPose(true)
                  }}
                  src="/images/Camera_Icon.png"
                  width={50}
                  height={50}
                />
              </S.FrontImage>
              <S.SideImage>
                <img src="/images/Camera_Icon.png" width={50} height={50} />
              </S.SideImage>
              <p id="thumbnail-subtitle">Front</p>
              <p id="thumbnail-subtitle">Side</p>
            </S.ThumbnailWrapper>
          </S.ContentWrapper>
        </S.PageWrapper>
    )
  }
}
