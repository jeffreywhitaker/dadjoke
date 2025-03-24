import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import dayjs from 'dayjs'

import Stats from './Stats'

import Chart from 'chart.js'

// bootstrap
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import Loading from '../Loading'

import imageData from '../../ajax/imageData'
import userData from '../../ajax/userData'

import UploadAvatarModal from '../modals/UploadAvatarModal'

const Profile = (props) => {
  const loggedInUsername = useSelector((s) => s.loginReducer.loggedInUsername)

  const params = useParams()
  const inputRef = useRef(null)
  const [isUpdatingDesc, setIsUpdatingDesc] = useState(false)
  const [username, setUsername] = useState(params.username)
  const [user, setUser] = useState(null)
  const [binary, setBinary] = useState(null)
  const [isUserHaveAvatar, setIsUserHaveAvatar] = useState(false)
  const [newDescription, setNewDescription] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // for the new version
  const [photoSrc, setPhotoSrc] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  // send the updated description to server
  const callUpdateDesc = () => {
    console.log('new Descrip is: ', newDescription)
    userData
      .updateUserDescription(newDescription)
      .then(() => {
        setIsUpdatingDesc(false)
        setIsLoading(true)
      })
      .catch((error) => {
        window.alert(
          'There was an error updating your user description: ' + error,
        )
      })
  }

  // gather user data on page load, and when prompted
  useEffect(() => {
    if (isLoading) {
      userData
        .getProfileStats(username)
        .then((res) => {
          setUser(res.data)
          setIsUserHaveAvatar(res.data.hasAvatar)
          setNewDescription(res.data.description)
          setIsLoading(false)
        })
        .catch((err) => {
          window.alert(`Unable to find ${username}. Error is: ${err}`)
        })
    }
  }, [username, isLoading])

  const handleUploadAvatar = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setShowUploadModal(true)
      const reader = new FileReader()
      reader.addEventListener('load', () => setPhotoSrc(reader.result))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleCloseUploadModal = () => {
    setShowUploadModal(false)
  }

  const handleDeleteAvatar = () => {
    if (username !== loggedInUsername) {
      // not the correct user
      window.alert('You can only delete your own avatar.')
    } else {
      // correct user, delete avatar
      imageData
        .deleteAvatar(username)
        .then(() => {
          window.alert('Avatar successfully deleted.')
          setIsUserHaveAvatar(false)
          // TODO: refresh
        })
        .catch((err) => {
          window.alert('There was an error deleting your avatar: ' + err)
        })
    }
  }

  useEffect(() => {
    getUserAvatar()
  }, [username])

  function getUserAvatar() {
    userData
      .getAvatar(username)
      .then((res) => {
        console.log('get avatar res is: ', res)
        var base64Flag = 'data:image/jpeg;base64,'
        var imageStr = arrayBufferToBase64(res.data.data.data)
        setBinary(base64Flag + imageStr)
        setIsUserHaveAvatar(true)
      })
      .catch((error) => console.log('unable to fetch profile avatar', error))
  }

  function arrayBufferToBase64(buffer) {
    var binary = ''
    var bytes = [].slice.call(new Uint8Array(buffer))
    bytes.forEach((b) => (binary += String.fromCharCode(b)))
    return window.btoa(binary)
  }

  // build the canvas chart
  useEffect(() => {
    if (user) {
      const ctx = document.getElementById('myChart')
      new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: [
            'Public',
            'Private',
            'Upvotes',
            'Downvotes',
            'Following',
            'Followed By',
          ],
          datasets: [
            {
              label: 'Count',
              data: [
                user.publicJokesCount,
                user.privateJokesCount,
                user.upvoteCount,
                user.downvoteCount,
                user.followingUsers.length,
                user.followedByUsers.length,
              ],
              backgroundColor: [
                'Red',
                'Blue',
                'Yellow',
                'Green',
                'Purple',
                'Orange',
              ],
              borderColor: [
                'Red',
                'Blue',
                'Yellow',
                'Green',
                'Purple',
                'Orange',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function(value) {
                    if (Number.isInteger(value)) {
                      return value
                    }
                  },
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Count',
                },
              },
            ],
          },
        },
      })
    }
  }, [user])

  return (
    <>
      <WrapperDiv>
        <h1 className="title">{username}'s Profile</h1>
        {!user ? (
          <Loading />
        ) : (
          <div className="mainContainer">
            {/* LEFT COLUMN */}
            <Stats
              binary={binary}
              handleDeleteAvatar={handleDeleteAvatar}
              handleUploadAvatar={handleUploadAvatar}
              inputRef={inputRef}
              isUserHaveAvatar={isUserHaveAvatar}
              loggedInUsername={loggedInUsername}
              username={username}
            />

            <div className="verticalSpacer" />

            {/* RIGHT COLUMN */}
            <div className="rightColumn">
              {/* DESCRIPTION */}
              <div className="descWrapper">
                <h2 className="subTitle">Description</h2>
                {!isUpdatingDesc ? (
                  <>
                    <p>
                      {'"'}
                      {user.description
                        ? user.description
                        : '[No description provided]'}
                      {'"'}
                    </p>
                    <div className="descButtonWrapper">
                      {user.username === loggedInUsername && (
                        <Button
                          size="sm"
                          onClick={() => setIsUpdatingDesc(true)}
                        >
                          Edit
                        </Button>
                      )}
                      <span>
                        User since:{' '}
                        {dayjs(user.accountCreationDate).format('MMM DD, YYYY')}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <InputGroup className="mb-3" size="sm">
                      <FormControl
                        aria-label="User Description Update"
                        as="textarea"
                        name="description"
                        value={newDescription}
                        onChange={(e) => {
                          console.log('e target value: ', e.currentTarget.value)
                          setNewDescription(e.currentTarget.value)
                        }}
                      />
                    </InputGroup>
                    <div className="descButtonWrapper">
                      <div>
                        <Button
                          size="sm"
                          variant="success"
                          onClick={callUpdateDesc}
                        >
                          Accept
                        </Button>
                        &nbsp;
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            setNewDescription(user.description)
                            setIsUpdatingDesc(false)
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                      <span>
                        User since:{' '}
                        {dayjs(user.accountCreationDate).format('MMM DD, YYYY')}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="followingWrapper">
                <h2 className="subTitle">Following</h2>
                <hr />
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Accordion.Toggle
                      as={Card.Header}
                      variant="link"
                      eventKey="0"
                    >
                      {'['}
                      {user.followingUsers.length}
                      {']'} Following these users:
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        {user.followingUsers.length < 1 && <span>[N/A]</span>}
                        {user.followingUsers.map((username) => {
                          return (
                            <>
                              <Link
                                to={`/profile/${username}`}
                                onClick={() => {
                                  setIsLoading(true)
                                  setUser(null)
                                  setUsername(username)
                                }}
                                key={`${username}_following`}
                              >
                                -&nbsp;{username}
                              </Link>
                              <br />
                            </>
                          )
                        })}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle
                      as={Card.Header}
                      variant="link"
                      eventKey="1"
                    >
                      {'['}
                      {user.followedByUsers.length}
                      {']'} Followed by these users:
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        {user.followedByUsers.length < 1 && <span>[N/A]</span>}
                        {user.followedByUsers.map((username) => {
                          return (
                            <>
                              <Link
                                to={`/profile/${username}`}
                                onClick={() => {
                                  setIsLoading(true)
                                  setUser(null)
                                  setUsername(username)
                                }}
                                key={`${username}_follower`}
                              >
                                -&nbsp;{username}
                              </Link>
                              <br />
                            </>
                          )
                        })}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </WrapperDiv>

      <UploadAvatarModal
        getUserAvatar={getUserAvatar}
        handleCloseUploadModal={handleCloseUploadModal}
        setShowUploadModal={setShowUploadModal}
        showUploadModal={showUploadModal}
        photoSrc={photoSrc}
      />
    </>
  )
}

// export
export default Profile

const WrapperDiv = styled.div`
  padding: 10px;

  .title {
    text-align: center;
    font-size: 20px;
    background: lightblue;
    width: 50%;
    margin: 0 auto;
    border-radius: 15px;
    padding: 10px 0;
  }

  .subTitle {
    text-align: center;
    border-bottom: 1px solid black;
    display: block;
    width: 100%;
  }

  .mainContainer {
    background-color: lightblue;
    margin-top: 10px;
    border-radius: 15px;
    padding: 10px 80px;
    display: flex;
    justify-content: space-between;

    .rightColumn {
      width: 420px;
      background-color: lightblue;
    }

    .descWrapper {
      margin-bottom: 10px;
    }

    .descButtonWrapper {
      display: flex;
      justify-content: space-between;
    }

    .verticalSpacer {
      width: 100px;
    }

    @media only screen and (max-width: 1000px) {
      flex-direction: column;
      align-items: center;
      width: max-content;
      margin: 10px auto;
    }
  }
`
