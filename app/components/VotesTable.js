import React from 'react'
import { compareDesc } from 'date-fns/esm'
import { Table, TableHeader, TableRow } from '@aragon/ui'
import VoteRow from './VoteRow'

const VotesTable = ({ votes, opened, onSelectVote }) => (
  <Table
    header={
      <TableRow>
        <TableHeader title="Status" />
        <TableHeader title="Question" />
        <TableHeader title="Total Votes" align="right" />
        <TableHeader title="Progress" />
        <TableHeader title="Actions" />
      </TableRow>
    }
  >
    {votes
      .map(vote => (
        <VoteRow key={vote.id} vote={vote} onSelectVote={onSelectVote} />
      ))}
  </Table>
)

export default VotesTable
