import React, { useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

export default function WebcamCapture(): JSX.Element {
  const webcamRef = React.useRef(null)
  const [lastImageUrl, setLastImageUrl] = useState<string>()

  async function postImage(
    base64: string,
    userId: string,
    pose: string
  ): Promise<void> {
    const response = await fetch(`/api/user/${userId}/pose/${pose}`, {
      method: 'POST',
      body: JSON.stringify({ image: base64 }),
    })

    if (response.ok) {
      const result = await response.json()
      setLastImageUrl(result.url)
    } else {
      // eslint-disable-next-line no-console
      console.log(`error: ${response.status} ${response.statusText}`)
    }
  }

  const height = 720
  const width = 1280

  const videoConstraints = {
    width: width,
    height: height,
    facingMode: 'user',
  }

  const capture = React.useCallback(() => {
    const imgBase64 = webcamRef.current.getScreenshot()
    const userId = uuidv4()
    postImage(imgBase64, userId, 'front')
  }, [webcamRef])

  return (
    <>
      <Webcam
        audio={false}
        height={height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={width}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      {lastImageUrl ? (
        <Image src={lastImageUrl} width={width / 4} height={height / 4}></Image>
      ) : null}
    </>
  )
}
