import { useState } from 'react'
import Question from './components/Question.tsx'
import Result from './components/Result.tsx'
import QuestionEditor from './components/QuestionEditor.tsx'

export default function QuizApp() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isQuizEnd, setQuizEnd] = useState(false)
  const [isEditMode, setEditMode] = useState(true)

  if (isEditMode) return <QuestionEditor onDone={(q) => {
    setQuestions(q)
    setEditMode(false)
  }}/>
  if (isQuizEnd) return <Result score={score} />
  return (
    <div>
      <h2>Current score: {score}</h2>
      <Question
        key={questions[currentQuestion].id}
        id={questions[currentQuestion].id}
        question={questions[currentQuestion].question}
        options={questions[currentQuestion].options}
        answers={questions[currentQuestion].answers}
        onNextQuestion={() => {
          if (currentQuestion < questions.length - 1) setCurrentQuestion(prev => prev + 1)
          else setQuizEnd(true)
        }}
        onIncreaseScore={() => setScore(prev => prev + 1)}
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
