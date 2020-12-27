import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import dayjs from 'dayjs'
import FormData from 'form-data'

import Chart from 'chart.js'

// bootstrap
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import Loading from '../components/Loading'

import userData from '../ajax/userData'

const Profile = (props) => {
  const inputRef = useRef(null)
  const loggedInUsername = props.loggedInUsername
  const [isUpdatingDesc, setIsUpdatingDesc] = useState(false)
  const [username, setUsername] = useState(props.match.params.username)
  const [user, setUser] = useState(null)
  const [binary, setBinary] = useState(null)
  const [isUserHaveAvatar, setIsUserHaveAvatar] = useState(false)
  const [newDescription, setNewDescription] = useState('')
  const [isLoading, setIsLoading] = useState(true)

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
    const img = e.target.files[0]
    console.log('img', img)
    let data = new FormData()
    data.append('image', img)
    data.append('foo', 'bar')

    console.log('formdata', data)
    userData
      .uploadAvatar(data)
      .then(() => {
        window.alert('Image successfully uploaded')
        setIsLoading(true)
      })
      .catch((err) => {
        window.alert('Unable to upload avatar: ' + err)
      })
  }

  useEffect(() => {
    userData
      .getAvatar(username)
      .then((res) => {
        console.log('get avatar res is: ', res)
        var base64Flag = 'data:image/jpeg;base64,'
        var imageStr = arrayBufferToBase64(res.data.data.data)
        setBinary(base64Flag + imageStr)
      })
      .catch((error) => console.log('unable to fetch profile avatar', error))
  }, [username])

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
    <WrapperDiv>
      <h1 className="title">{username}'s Profile</h1>
      {!user ? (
        <Loading />
      ) : (
        <div className="mainContainer">
          {/* LEFT COLUMN */}
          <div className="leftColumn">
            {/* AVATAR */}
            <div className="avatarWrapper">
              <h2 className="subTitle">Avatar</h2>

              <img
                className="avatar"
                src={!isUserHaveAvatar ? '/img/defaultAvatar.png' : binary}
              />
              {username === loggedInUsername && (
                <div>
                  <Button
                    size="sm"
                    onClick={() => {
                      if (
                        window.confirm(
                          'For best results, please upload an image 200 x 200 pixels.',
                        )
                      ) {
                        inputRef.current.click()
                      }
                    }}
                  >
                    Edit
                  </Button>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    ref={inputRef}
                    accept="image/*"
                    onChange={handleUploadAvatar}
                  />
                </div>
              )}
            </div>

            {/* STATS */}
            <div>
              <h2 className="subTitle">Statistics</h2>

              <canvas id="myChart" width="400" height="400" />
            </div>
          </div>

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
                      <Button size="sm" onClick={() => setIsUpdatingDesc(true)}>
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
  )
}

// connect to redux
const mapStateToProps = (state) => {
  return {
    loggedInUsername: state.loginReducer.username,
  }
}

// export
export default connect(mapStateToProps, {})(Profile)

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

    .leftColumn {
      width: 420px;
      background-color: lightblue;
    }

    .rightColumn {
      width: 420px;
      background-color: lightblue;
    }

    .avatarWrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;

      .avatar {
        display: block;
        max-width: 200px;
        max-height: 200px;
        width: auto;
        height: auto;
        border-radius: 10px;
        margin-bottom: 10px;
      }

      input {
        align-self: flex-end;
        display: none;
      }
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
