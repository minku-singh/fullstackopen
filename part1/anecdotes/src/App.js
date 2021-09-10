import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))

  const handleSelected = () => {
    let random = Math.floor(Math.random()*(anecdotes.length))
    setSelected(random);
  }
  const handleVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const findMax = () => {
    let z = 0
    let index = 0
    votes.forEach((value, i) => {
      if(z < value){
        z = value
        index = i
      }
    })
    return index
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <button onClick = {handleVotes}>vote</button>
      <button onClick = {handleSelected}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[findMax()]}</p>
      <p>has {votes[findMax()]} votes</p>
    </div>
  )
}

export default App
