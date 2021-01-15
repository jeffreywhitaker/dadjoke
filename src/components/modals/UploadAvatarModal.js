import React, { useEffect, useState } from 'react'

// bootstrap
import Modal from 'react-bootstrap/Modal'

import ReactCrop from 'react-image-crop'

const UploadAvatarModal = (props) => {
  const { handleCloseUploadModal, showUploadModal, uncroppedPhoto } = props

  // local photo state
  const [photoState, setPhotoState] = useState({
    src: null,
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
    // pass in the uncropped photo on load
    setPhotoState({ ...photoState, src: uncroppedPhoto })
  }, [])

  handleFinishedCropping = (e) => {
    // done cropping
    // should now convert to form data and send to back end
  }

  // react crop methods
  // TODO: has to maybe return false
  onImageLoaded = (image) => {
    setPhotoState({ ...photoState, imageRef: image })
    return false
  }

  onCropComplete = (crop) => {
    makeClientCrop(crop)
  }

  onCropChange = (crop) => {
    setPhotoState({ ...photoState, crop })
  }

  makeClientCrop = async function(crop) {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        'newFile.jpeg',
      )
      setPhotoState({ ...photoState, croppedImageUrl })
    }
  }

  getCroppedImg = (image, crop, fileName) => {
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

        if (photoState.fileUrl) {
          window.URL.revokeObjectURL(photoState.fileUrl)
        }

        setPhotoState({
          ...photoState,
          fileUrl: window.URL.createObjectURL(blob),
        })

        resolve(fileUrl)
      }, 'image/jpeg')
    })
  }

  return (
    <Modal show={showUploadModal} onHide={handleCloseUploadModal}>
      <ReactCrop
        src={photoState.src}
        crop={photoState.crop}
        onImageLoaded={onImageLoaded}
        onComplete={onCropComplete}
        onChange={onCropChange}
      />
      {croppedImageUrl && (
        <img
          alt="Crop"
          style={{ maxWidth: '100%' }}
          src={photoState.croppedImageUrl}
        />
      )}
      <button onClick={handleFinishedCropping}>Finished Cropping</button>
    </Modal>
  )
}

export default UploadAvatarModal
