import React, { useCallback, useEffect, useRef, useState } from 'react'

// bootstrap
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'

import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import userData from '../../ajax/userData'

import styled from 'styled-components'

const UploadAvatarModal = (props) => {
  // destructure props
  const {
    handleCloseUploadModal,
    setShowUploadModal,
    showUploadModal,
    photoSrc,
  } = props

  // local state for modal
  const [loading, setLoading] = useState(true)
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 200 / 200 })
  const [completedCrop, setCompletedCrop] = useState(null)

  // methods
  const onLoad = useCallback((img) => {
    setLoading(false)
    imgRef.current = img
  }, [])

  function generateDownload(canvas, crop) {
    if (!crop || !canvas) {
      return
    }

    // convert the canvas to a blob
    canvas.toBlob(
      (blob) => {
        // create a form data to send, and append the blob
        let data = new FormData()
        data.append('image', blob)

        // send the image
        userData
          .uploadAvatar(data)
          .then(() => {
            window.alert('Image successfully uploaded')
            setShowUploadModal(false)
            setLoading(true)
          })
          .catch((err) => {
            window.alert('Unable to upload avatar: ' + err)
          })
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
    // working version
    // width: completedCrop ? Math.round(completedCrop.width) : 0,
    // height: completedCrop ? Math.round(completedCrop.height) : 0,

    // their version
    // width: Math.round(completedCrop?.width ?? 0),
    // height: Math.round(completedCrop?.height ?? 0),

    // set to 200
    width: 200,
    height: 200,
  }

  // return the modal
  return (
    <Modal show={showUploadModal} onHide={handleCloseUploadModal}>
      <UploadModalWrapper>
        {/* LOADING */}
        {loading && <h3>Loading ...</h3>}
        <Card style={{ display: loading ? 'none' : null }}>
          {photoSrc && (
            <>
              <Card.Header>Please crop the image:</Card.Header>
              <Card.Body>
                <ReactCrop
                  src={photoSrc}
                  crop={crop}
                  onImageLoaded={onLoad}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  style={imageStyle}
                />
              </Card.Body>
            </>
          )}
        </Card>
        <Card style={{ display: loading ? 'none' : null }}>
          <Card.Header>Image to upload:</Card.Header>
          <Card.Body className="previewWrapper">
            <canvas ref={previewCanvasRef} style={canvasStyle} />
          </Card.Body>
          <Card.Footer>
            <Button
              onClick={() =>
                generateDownload(previewCanvasRef.current, completedCrop)
              }
            >
              Upload Cropped Image
            </Button>
            &nbsp;
            <Button
              variant="danger"
              onClick={() => {
                setShowUploadModal(false)
                setLoading(true)
              }}
            >
              Cancel
            </Button>
          </Card.Footer>
        </Card>
      </UploadModalWrapper>
    </Modal>
  )
}

// export
export default UploadAvatarModal

const UploadModalWrapper = styled.div`
  padding: 20px;

  .previewCard {
  }

  .previewWrapper {
    display: flex;
    justify-content: center;
  }
`
