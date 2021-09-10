import React from 'react'

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ content }) => {
  const total = content.reduce((sum, part) => {
    sum = sum + part.exercises
    return sum
  }, 0)
  return(
    <div>
      <h3>total of {total} exercises</h3>
    </div>
  ) 
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ content }) => {
  return (
    <div>
      <p>{content.map((part) => <Part key = {part.id} part = {part} />)}</p>
    </div>
  )
}

const Course = ({course}) => {
  return(
    <div>
      <Header name = {course.name} />
      <Content content = {course.parts} />
      <Total content = {course.parts} />
    </div>
  )
}

export default Course