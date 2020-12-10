import React, { useEffect } from 'react'

import userData from '../ajax/userData'

export default function Profile() {
  useEffect(() => {
    userData.getStats().then((res) => {
      console.log('stats: ', res)
    })
  }, [])

  return <div>hi</div>
}
