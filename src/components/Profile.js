import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import dayjs from 'dayjs'

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
  const loggedInUsername = props.loggedInUsername
  const [isUpdatingDesc, setIsUpdatingDesc] = useState(false)
  const [username, setUsername] = useState(props.match.params.username)
  const [user, setUser] = useState(null)
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
        console.log('error updating descrip', error)
      })
  }

  // gather user data on page load, and when prompted
  useEffect(() => {
    if (isLoading) {
      userData.getProfileStats(username).then((res) => {
        setUser(res.data)
        setNewDescription(res.data.description)
        setIsLoading(false)
      })
    }
  }, [username, isLoading])

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
          <div className="columnWrapper">
            <div className="leftColumn">
              <h2 className="subTitle">Statistics</h2>
              <hr />

              <canvas id="myChart" width="400" height="400" />
            </div>
            <div className="verticalSpacer" />
            <div className="rightColumn">
              <div className="descWrapper">
                <h2 className="subTitle">Description</h2>
                <hr />
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
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>Description</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="User Description Update"
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
  }

  .mainContainer {
    background-color: lightblue;
    margin-top: 10px;
    border-radius: 15px;
    padding: 10px 80px;

    .columnWrapper {
      display: flex;
      justify-content: space-between;
    }

    .descButtonWrapper {
      display: flex;
      justify-content: space-between;
    }

    .verticalSpacer {
      width: 100px;
    }
  }
`
