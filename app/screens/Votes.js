import React from 'react'
import styled from 'styled-components'
import {
  BadgeNumber,
  colors,
} from '@aragon/ui'
import VotesTable from '../components/VotesTable'

class Votes extends React.Component {
  render() {
    const { votes, onSelectVote } = this.props
    return (
      <Main>
        {votes.length > 0 && (
          <VotesTableWrapper>
            <Title>
              <span>All Votes</span>
              <BadgeNumber
                background={colors.Rain['Rain Sky']}
                color={colors.Rain.Slate}
                number={votes.length}
                inline
              />
            </Title>
            <VotesTable
              opened
              votes={votes}
              onSelectVote={onSelectVote}
            />
          </VotesTableWrapper>
        )}
      </Main>
    )
  }
}

const Main = styled.div`
  min-width: 800px;
`

const Title = styled.h1`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 16px;
  & > span:first-child {
    margin-right: 10px;
  }
`

const VotesTableWrapper = styled.div`
  margin-bottom: 30px;
`

export default Votes
