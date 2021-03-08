import React, { ReactElement } from 'react'
import styled from 'styled-components'

interface Props {
  text: string
}

export default function(props: Props): ReactElement {
  const { text } = props
  return <Header>{text}</Header>
}

const Header = styled.h1`
  text-align: center;
  font-size: 20px;
  background: lightblue;
  width: 50%;
  margin: 0 auto;
  border-radius: 15px;
  padding: 10px 0;
`
