import React, { useEffect, useState } from 'react'

// bootstrap
import Modal from 'react-bootstrap/Modal'

import ReactCrop from 'react-image-crop'

const UploadAvatarModal = (props) => {
  const { handleCloseUploadModal, showUploadModal, photoSrc } = props

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
  // TODO: has to maybe return false
  const onImageLoaded = (image) => {
    console.log('on image loaded called with img: ', image)
    setImageRef(image)
    return false
  }

  const onCropComplete = (crop) => {
    console.log('onCropComplete called')
    makeClientCrop(crop)
  }

  const onCropChange = (crop) => {
    console.log('onCropChange called')
    console.log('new crop is: ', crop)
    setCrop(crop)
  }

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
            onComplete={onCropComplete}
            onChange={onCropChange}
            style={imageStyle}
          />
        </>
      )}

      {croppedImageUrl && (
        <>
          <span>EXAMPLE HERE</span>
          <img alt="Crop" src={croppedImageUrl} />
        </>
      )}
      <button onClick={handleFinishedCropping}>Finished Cropping</button>
    </Modal>
  )
}

export default UploadAvatarModal
