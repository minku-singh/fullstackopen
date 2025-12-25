import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = total === 0 ? 0 : (good / total) * 100;

  return (
    <div>
      <h1>Statistics</h1>
      {total == 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <table>
            <tbody>
              <StatisticLine text="Good" value={good} />
              <StatisticLine text="Neutral" value={neutral} />
              <StatisticLine text="Bad" value={bad} />
              <StatisticLine text="All" value={total} />
              <StatisticLine text="Average" value={average} />
              <StatisticLine text="Positive" value={positive} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <div>
          <Button handleClick={() => setGood(good + 1)} text="Good" />
          <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
          <Button handleClick={() => setBad(bad + 1)} text="Bad" />
        </div>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
