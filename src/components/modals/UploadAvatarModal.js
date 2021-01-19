import React, { useEffect, useState } from 'react'

// bootstrap
import Modal from 'react-bootstrap/Modal'

import ReactCrop from 'react-image-crop'

const UploadAvatarModal = (props) => {
  const {
    handleCloseUploadModal,
    showUploadModal,
    photoSrc,
    setPhotoSrc,
  } = props

  // local photo state
  const [photoState, setPhotoState] = useState({
    crop: {
      unit: '%',
      width: 30,
      aspect: 16 / 9,
    },
    imageRef: null,
    croppedImageUrl: null,
    fileUrl: null,
  })

  useEffect(() => {
    console.log('photostate changed')
    console.log(photoState)
  }, [photoState])

  useEffect(() => {
    console.log('photoSrc chagned')
    console.log(photoSrc)
  }, [])

  const handleFinishedCropping = (e) => {
    // done cropping
    // should now convert to form data and send to back end
  }

  // react crop methods
  // TODO: has to maybe return false
  const onImageLoaded = (image) => {
    console.log('on image loaded called with img: ', image)
    setPhotoState({ ...photoState, imageRef: image })
    return false
  }

  const onCropComplete = (crop) => {
    console.log('onCropComplete called')
    makeClientCrop(crop)
  }

  const onCropChange = (crop) => {
    console.log('onCropChange called')
    setPhotoState({ ...photoState, crop })
  }

  const makeClientCrop = async function(crop) {
    if (photoState.imageRef && crop.width && crop.height) {
      console.log('makeClientCrop called')
      const croppedImageUrl = await getCroppedImg(
        photoState.imageRef,
        photoState.crop,
        'newFile.jpeg',
      )
      setPhotoState({ ...photoState, croppedImageUrl })
    }
  }

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

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

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty')
          return
        }
        blob.name = fileName

        // if (photoState.fileUrl) {
        window.URL.revokeObjectURL(photoState.fileUrl)
        // }

        console.log('fileUrl is: ', window.URL.createObjectURL(blob))

        setPhotoState({
          ...photoState,
          fileUrl: window.URL.createObjectURL(blob),
        })

        resolve(photoState.fileUrl)
      }, 'image/jpeg')
    })
  }

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
            crop={photoState.crop}
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={onCropChange}
            imageStyle={imageStyle}
          />
        </>
      )}

      {photoState.croppedImageUrl && (
        <>
          <span>EXAMPLE HERE</span>
          <img
            alt="Crop"
            style={{ maxWidth: '100%' }}
            src={photoState.croppedImageUrl}
          />
        </>
      )}
      <button onClick={handleFinishedCropping}>Finished Cropping</button>
    </Modal>
  )
}

export default UploadAvatarModal
