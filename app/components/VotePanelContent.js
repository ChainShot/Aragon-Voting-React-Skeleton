import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Blockies from 'react-blockies'
import {
  Button,
  Info,
  SafeLink,
  SidePanelSplit,
  SidePanelSeparator,
  Countdown,
  Text,
  theme,
} from '@aragon/ui'
import { combineLatest } from '../rxjs'
import provideNetwork from '../utils/provideNetwork'
import VoteSummary from './VoteSummary'
import VoteStatus from './VoteStatus'

class VotePanelContent extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  }
  handleNoClick = () => {
    this.props.onVote(this.props.vote.id, false)
  }
  handleYesClick = () => {
    this.props.onVote(this.props.vote.id, true)
  }
  render() {
    const { network: { etherscanBaseUrl }, vote, ready } = this.props
    if (!vote) {
      return null
    }

    const { creator, question, no, yes } = vote;

    return (
      <div>
        <SidePanelSplit>
          <div>
            <h2>
              <Label>Quorum</Label>
            </h2>
            <div>50%</div>
          </div>
        </SidePanelSplit>
        <Part>
          {question && (
            <React.Fragment>
              <h2>
                <Label>Question:</Label>
              </h2>
              <Question>{question}</Question>
            </React.Fragment>
          )}
        </Part>
        <SidePanelSeparator />
        <Part>
          <h2>
            <Label>Created By:</Label>
          </h2>
          <Creator>
            <CreatorImg>
              <Blockies seed={creator} size={8} />
            </CreatorImg>
            <div>
              <p>
                <SafeLink
                  href={`${etherscanBaseUrl}/address/${creator}`}
                  target="_blank"
                >
                  {creator}
                </SafeLink>
              </p>
            </div>
          </Creator>
        </Part>
        <SidePanelSeparator />

        <VoteSummary
          votesYea={yes}
          votesNay={no}
          ready={ready}
        />

        <div>
          <SidePanelSeparator />
          <VotingButtons>
            <Button
              mode="strong"
              emphasis="positive"
              wide
              onClick={this.handleYesClick}
            >
              Yes
            </Button>
            <Button
              mode="strong"
              emphasis="negative"
              wide
              onClick={this.handleNoClick}
            >
              No
            </Button>
          </VotingButtons>
        </div>
      </div>
    )
  }
}

const Label = styled(Text).attrs({
  smallcaps: true,
  color: theme.textSecondary,
})`
  display: block;
  margin-bottom: 10px;
`

const Part = styled.div`
  padding: 20px 0;
  h2 {
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
`

const Question = styled.p`
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  hyphens: auto;
`

const Creator = styled.div`
  display: flex;
  align-items: center;
`
const CreatorImg = styled.div`
  margin-right: 20px;
  canvas {
    display: block;
    border: 1px solid ${theme.contentBorder};
    border-radius: 16px;
  }
  & + div {
    a {
      color: ${theme.accent};
    }
  }
`

const VotingButtons = styled.div`
  display: flex;
  padding: 30px 0 20px;
  & > * {
    width: 50%;
    &:first-child {
      margin-right: 10px;
    }
  }
`

export default provideNetwork(VotePanelContent)
