import React from 'react'
import styled from 'styled-components'
import { Button, Countdown, TableCell, TableRow } from '@aragon/ui'
import ProgressBar from './ProgressBar'
import VoteStatus from './VoteStatus'
import { safeDiv } from '../math-utils'

class VoteRow extends React.Component {
  static defaultProps = {
    onSelectVote: () => {},
  }

  handleVoteClick = () => {
    this.props.onSelectVote(this.props.vote.id)
  }
  render() {
    const { vote } = this.props
    const { question, no, yes } = vote
    const totalVotes = yes + no;

    return (
      <TableRow>
        <StatusCell>
          <VoteStatus vote={vote} />
        </StatusCell>
        <QuestionCell>
          <div>
            <QuestionWrapper>
              {question}
            </QuestionWrapper>
          </div>
        </QuestionCell>
        <Cell align="right">{totalVotes}</Cell>
        <BarsCell>
          <BarsGroup>
            <Bar>
              <ProgressBar
                type="positive"
                progress={safeDiv(yes, totalVotes)}
              />
            </Bar>
            <Bar>
              <ProgressBar
                type="negative"
                progress={safeDiv(no, totalVotes)}
              />
            </Bar>
          </BarsGroup>
        </BarsCell>
        <ActionsCell>
          <Button mode="outline" onClick={this.handleVoteClick}>
            View Vote
          </Button>
        </ActionsCell>
      </TableRow>
    )
  }
}

const Cell = styled(TableCell)`
  vertical-align: top;
`

const StatusCell = styled(Cell)`
  vertical-align: top;
  width: 190px;
`

const QuestionCell = styled(Cell)`
  width: 40%;
`

const BarsCell = styled(Cell)`
  flex-shrink: 0;
  width: 25%;
  min-width: 200px;
`

const ActionsCell = styled(Cell)`
  width: 0;
`

const QuestionWrapper = styled.p`
  margin-right: 20px;
  word-break: break-word;
  hyphens: auto;
`

const BarsGroup = styled.div`
  width: 100%;
`

const Bar = styled.div`
  &:not(:first-child) {
    margin-top: 20px;
  }
`

export default VoteRow
