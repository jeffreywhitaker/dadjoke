import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import dayjs from 'dayjs'

import Loading from '../components/Loading'

import userData from '../ajax/userData'

const Profile = (props) => {
  const [username, setUsername] = useState(props.match.params.username)
  const [user, setUser] = useState(null)
  const location = useLocation()

  // console.log('the username is: ', username)

  useEffect(() => {
    userData.getProfileStats(username).then((res) => {
      console.log('location', location)
      console.log('getProfileStats res: ', res)
      setUser(res.data)
    })
  }, [username])

  return (
    <WrapperDiv>
      <h1 className="title">{username}'s Profile</h1>
      {!user ? (
        <Loading />
      ) : (
        <div className="mainContainer">
          <div className="leftColumn">
            <h2 className="subTitle">Statistics</h2>
            <hr />
            <p>
              User since:{' '}
              {dayjs(user.accountCreationDate).format('MMM DD, YYYY')}
            </p>
            <p>Total Public Jokes: {user.publicJokesCount}</p>
            <p>Total Private Jokes: {user.privateJokesCount}</p>
            <p>Total Upvotes: {user.upvoteCount}</p>
            <p>Total Downvotes: {user.downvoteCount}</p>
          </div>
          <div className="rightColumn">
            <h2 className="subTitle">Following</h2>
            <hr />
            <h4>{username} is currently following:</h4>
            {user.followingUsers.length < 1 && <span>[N/A]</span>}
            {user.followingUsers.map((username) => {
              return (
                <Link
                  to={`/profile/${username}`}
                  onClick={() => {
                    setUser(null)
                    setUsername(username)
                  }}
                  key={`${username}_following`}
                >
                  -&nbsp;{username}
                </Link>
              )
            })}
            <hr />
            <h4>{username} is being followed by:</h4>
            {user.followedByUsers.length < 1 && <span>[N/A]</span>}
            {user.followedByUsers.map((username) => {
              return (
                <Link
                  to={`/profile/${username}`}
                  onClick={() => {
                    setUser(null)
                    setUsername(username)
                  }}
                  key={`${username}_follower`}
                >
                  -&nbsp;{username}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </WrapperDiv>
  )
}

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
  }

  .mainContainer {
    display: flex;
    justify-content: space-between;
    background-color: lightblue;
    margin-top: 10px;
    border-radius: 15px;
    padding: 10px 80px;
  }
`
