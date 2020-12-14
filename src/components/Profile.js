import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import dayjs from 'dayjs'

import Loading from '../components/Loading'

import userData from '../ajax/userData'

const Profile = (props) => {
  const [user, setUser] = useState(null)
  const location = useLocation()

  // console.log('the username is: ', username)

  useEffect(() => {
    if (location.pathname !== '/myprofile') {
      const username = props.match.params.username
      userData.getOtherUserStats(username).then((res) => {
        console.log('location', location)
        console.log('other stats:', res)
        setUser(res.data)
      })
    } else {
      userData.getOwnStats().then((res) => {
        console.log('location', location)
        console.log('own stats: ', res)
        setUser(res.data)
      })
    }
  }, [])

  if (!user) {
    return <Loading />
  }

  return (
    <div>
      <DisplayP>{user.username}'s Profile</DisplayP>
      <div>
        <p>
          User since: {dayjs(user.accountCreationDate).format('MMM DD, YYYY')}
        </p>
        <p>Total Public Jokes: {user.publicJokesCount}</p>
        <p>Total Private Jokes: {user.privateJokesCount}</p>
        <p>Total Upvotes: {user.upvoteCount}</p>
        <p>Total Downvotes: {user.downvoteCount}</p>
      </div>
    </div>
  )
}

export default Profile

const DisplayP = styled.p`
  text-align: center;
  font-size: 20px;
  background: lightblue;
  width: 50%;
  margin: 0 auto;
  border-radius: 15px;
  padding: 10px 0;
`
