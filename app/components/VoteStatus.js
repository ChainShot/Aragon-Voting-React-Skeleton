import React from 'react'
import styled from 'styled-components'
import { theme, IconTime, IconCross, IconCheck } from '@aragon/ui'

const VoteStatus = () => {
  const label = 'Open';
  const Icon = IconTime;
  const color =  theme.textSecondary;
  return (
    <Main color={color}>
      <Icon />
      <StatusLabel>{label}</StatusLabel>
    </Main>
  )
}

const Main = styled.span`
  font-weight: 600;
  white-space: nowrap;
  color: ${({ color }) => color};
`

const StatusLabel = styled.span`
  margin-left: 10px;
`

export default VoteStatus;
