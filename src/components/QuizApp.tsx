import { useState } from 'react'
import Question from './Question.tsx'

export default function QuizApp() {
  const [questions, _] = useState<Question[]>([
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answers: "Paris"
    },
    {
      id: 2,
      question: "What is the largest planet in our solar system?",
      options: ["Jupiter", "Saturn", "Mars", "Earth"],
      answers: "Jupiter"
    }
  ])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isQuizEnd, setIsQuizEnd] = useState(false)

  return (
    <div style={{ padding: '0 24px' }}>
      <h2>Current score: {score}</h2>
      <Question
        key={questions[currentQuestion].id}
        id={questions[currentQuestion].id}
        question={questions[currentQuestion].question}
        options={questions[currentQuestion].options}
        answers={questions[currentQuestion].answers}
        onNextQuestion={() => {
          if (currentQuestion < questions.length - 1) setCurrentQuestion(prev => prev + 1)
          else setIsQuizEnd(true)
        }}
        onIncreaseScore={() => setScore(prev => prev + 10)}
        isFinalQuestion={currentQuestion == questions.length - 1}
      />
    </div>
  )
}

export interface Question {
  id: number,
  question: string,
  options: [string, string, string, string],
  answers: string
}
