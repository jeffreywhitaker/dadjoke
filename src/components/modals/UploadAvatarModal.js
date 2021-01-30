import React, { useEffect, useRef, useState } from 'react'

// bootstrap
import Modal from 'react-bootstrap/Modal'

import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const UploadAvatarModal = (props) => {
  const { handleCloseUploadModal, showUploadModal, photoSrc } = props
  const previewCanvasRef = useRef(null)

  // local photo state
  const [crop, setCrop] = useState({
    unit: '%',
    width: 30,
    aspect: 16 / 9,
  })
  const [fileUrl, setFileUrl] = useState(null)
  const [croppedImageUrl, setCroppedImageUrl] = useState(null)
  const [imageRef, setImageRef] = useState(null)

  useEffect(() => {
    console.log('fileURL changed')
    console.log(fileUrl)
  }, [fileUrl])

  useEffect(() => {
    console.log('imageRef changed')
    console.log(imageRef)
  }, [imageRef])

  useEffect(() => {
    console.log('croppedImageUrl changed')
    console.log(croppedImageUrl)
  }, [croppedImageUrl])

  useEffect(() => {
    console.log('photoSrc chagned')
    console.log(photoSrc)
  }, [photoSrc])

  const handleFinishedCropping = (e) => {
    // done cropping
    // should now convert to form data and send to back end
  }

  // react crop methods
  const makeClientCrop = async function(crop) {
    if (imageRef && crop.width && crop.height) {
      console.log('makeClientCrop called')
      const _croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        'newFile.jpeg',
      )
      setCroppedImageUrl(_croppedImageUrl)
    }
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img
  }, [])

  function generateDownload(canvas, crop) {
    if (!crop || !canvas) {
      return
    }

    canvas.toBlob(
      (blob) => {
        const previewUrl = window.URL.createObjectURL(blob)

        const anchor = document.createElement('a')
        anchor.download = 'cropPreview.png'
        anchor.href = URL.createObjectURL(blob)
        anchor.click()

        window.URL.revokeObjectURL(previewUrl)
      },
      'image/png',
      1,
    )
  }

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const crop = completedCrop

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    const pixelRatio = window.devicePixelRatio

    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    )
  }, [completedCrop])

  const imageStyle = {
    maxWidth: '400px',
  }

  return (
    <Modal show={showUploadModal} onHide={handleCloseUploadModal}>
      {photoSrc && (
        <>
          <span>SRC IS LOADED</span>
          <ReactCrop
            src={photoSrc}
            crop={crop}
            onImageLoaded={onLoad}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            style={imageStyle}
          />
        </>
      )}

      <div>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </div>
      <button onClick={handleFinishedCropping}>Finished Cropping</button>
    </Modal>
  )
}

export default UploadAvatarModal
