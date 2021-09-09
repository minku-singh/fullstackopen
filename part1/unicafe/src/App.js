import React, {useState} from "react";

const StatisticLine = (props) => {
  return(
    <div>
      <tr>{props.text}</tr>
      <td>{props.value}</td>
    </div>
  );
}

const Statistics = ({good, bad, neutral}) => {
  const all = (good + neutral + bad)
  const average = (good*1 + bad*-1)/all;
  const positive = (good/all)*100;

  if(all === 0){
    return(
      <div>No feedback given</div>
    );
  }

  return(
    <table>
      <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + " %"} />
        </tbody>
    </table>
  );
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.clickEvent}>{props.text}</button>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good+1);
  }

  const handleNeutral = () => {
    setNeutral(neutral+1);
  }

  const handleBad = () => {
    setBad(bad+1);
  }

  return(
    <div>
      <h1>give feedback</h1>
      <Button text='good' clickEvent={handleGood} />
      <Button text='neutral' clickEvent={handleNeutral} />
      <Button text='bad' clickEvent={handleBad} />
      
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App;