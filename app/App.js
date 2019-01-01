import React from 'react'
import PropTypes from 'prop-types'
import { isBefore } from 'date-fns/esm'
import { AragonApp, AppBar, Button, SidePanel, observe } from '@aragon/ui'
import EmptyState from './screens/EmptyState'
import Votes from './screens/Votes'
import VotePanelContent from './components/VotePanelContent'
import NewVotePanelContent from './components/NewVotePanelContent'
import AppLayout from './components/AppLayout'
import { networkContextType } from './utils/provideNetwork'
import { safeDiv } from './math-utils'

class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  }
  static defaultProps = {
    network: {
      etherscanBaseUrl: 'https://rinkeby.etherscan.io',
      name: 'rinkeby',
    },
    userAccount: '',
    votes: [],
  }
  static childContextTypes = {
    network: networkContextType,
  }
  getChildContext() {
    return { network: this.props.network }
  }

  constructor(props) {
    super(props)
    this.state = {
      createVoteVisible: false,
      currentVoteId: -1,
      voteVisible: false,
      voteSidebarOpened: false,
    }
  }

  handleCreateVote = question => {
    this.props.app.newVote(question)
    this.handleCreateVoteClose()
  }
  handleCreateVoteOpen = () => {
    this.setState({ createVoteVisible: true })
  }
  handleCreateVoteClose = () => {
    this.setState({ createVoteVisible: false })
  }
  handleVoteOpen = voteId => {
    const exists = this.props.votes.some(vote => voteId === vote.id)
    if (!exists) return
    this.setState({
      currentVoteId: voteId,
      voteVisible: true,
      voteSidebarOpened: false,
    })
  }
  handleVote = (voteId, voteType) => {
    this.props.app.castVote(voteId, voteType)
    this.handleVoteClose()
  }
  handleVoteClose = () => {
    this.setState({ voteVisible: false })
  }
  handleVoteTransitionEnd = opened => {
    this.setState(opened ? { voteSidebarOpened: true } : { currentVoteId: -1 })
  }
  render() {
    const {
      app,
      userAccount,
      votes,
    } = this.props
    const {
      createVoteVisible,
      currentVoteId,
      voteSidebarOpened,
      voteVisible,
    } = this.state

    const displayVotes = votes.length > 0

    // Add useful properties to the votes
    const preparedVotes = displayVotes
      ? votes.map(vote => {
          return {
            ...vote,
          }
        })
      : votes

    const currentVote =
      currentVoteId === -1
        ? null
        : preparedVotes.find(vote => vote.id === currentVoteId)

    return (
      <AragonApp publicUrl="./aragon-ui/">
        <AppLayout>
          <AppLayout.Header>
            <AppBar
              title="Vote"
              endContent={
                <Button mode="strong" onClick={this.handleCreateVoteOpen}>
                  New Vote
                </Button>
              }
            />
          </AppLayout.Header>
          <AppLayout.ScrollWrapper>
            <AppLayout.Content>
              {displayVotes ? (
                <Votes
                  votes={preparedVotes}
                  onSelectVote={this.handleVoteOpen}
                />
              ) : (
                <EmptyState onActivate={this.handleCreateVoteOpen} />
              )}
            </AppLayout.Content>
          </AppLayout.ScrollWrapper>
        </AppLayout>

        {displayVotes &&
          currentVote && (
            <SidePanel
              title={`Vote #${currentVoteId} (Open)`}
              opened={Boolean(!createVoteVisible && voteVisible)}
              onClose={this.handleVoteClose}
              onTransitionEnd={this.handleVoteTransitionEnd}
            >
              <VotePanelContent
                app={app}
                vote={currentVote}
                user={userAccount}
                ready={Boolean(!createVoteVisible && voteVisible)}
                onVote={this.handleVote}
              />
            </SidePanel>
          )}

        <SidePanel
          title="New Vote"
          opened={createVoteVisible}
          onClose={this.handleCreateVoteClose}
        >
          <NewVotePanelContent
            opened={createVoteVisible}
            onCreateVote={this.handleCreateVote}
          />
        </SidePanel>
      </AragonApp>
    )
  }
}

export default observe(
  observable => observable.map(state => ({ ...state })),
  {}
)(App)
