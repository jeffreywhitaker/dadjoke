import React, { useCallback, useEffect, useRef, useState } from 'react'

// bootstrap
import Modal from 'react-bootstrap/Modal'

import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const UploadAvatarModal = (props) => {
  // destructure props
  const { handleCloseUploadModal, showUploadModal, photoSrc } = props

  // local state for modal
  // TODO: set up loading
  const [loading, setLoading] = useState(false)
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 })
  const [completedCrop, setCompletedCrop] = useState(null)

  // methods
  useEffect(() => {
    console.log('photoSrc changed')
    console.log(photoSrc)
  }, [photoSrc])

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

  // style
  const imageStyle = {
    maxWidth: '400px',
  }

  const canvasStyle = {
    // TODO: get loaders that will handle new JS
    width: completedCrop ? Math.round(completedCrop.width) : 0,
    height: completedCrop ? Math.round(completedCrop.height) : 0,

    // width: Math.round(completedCrop?.width ?? 0),
    // height: Math.round(completedCrop?.height ?? 0),
  }

  // return the modal
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
          style={canvasStyle}
        />
      </div>
      <button
        onClick={() =>
          generateDownload(previewCanvasRef.current, completedCrop)
        }
      >
        Finished Cropping
      </button>
    </Modal>
  )
}

// export
export default UploadAvatarModal
