import type { Question } from '../QuizApp.tsx'
import { useState } from 'react'

export default function QuestionEditor({ onDone }: QuestionEditor) {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answers: "Paris"
    },
    {
      id: 2,
      question: "What is the largest planet in our solar system?",
      options: ["Saturn", "Mars", "Earth", "Jupiter"],
      answers: "Jupiter"
    }
  ])
  const setAnswer = (index: number, newAnswer: string) => {
    setQuestions(prev => prev.map((q, i) =>
      i === index ? { ...q, answers: newAnswer } : q
    ))
  }
  const setQuestion = (index: number, newQuestion: string) => {
    setQuestions(prev => prev.map((q, i) =>
      i === index ? { ...q, question: newQuestion } : q
    ))
  }
  const setOption = (qIndex: number, oIndex: number, newOption: string) => {
    setQuestions(prev => prev.map((q, i) => {
      if (i !== qIndex) return q
      const newOptions = q.options.map((o, j) =>
        j === oIndex ? newOption : o
      ) as [string, string, string, string]
      // if the edited option was the answer, update the answer too
      const newAnswers = q.answers === q.options[oIndex] ? newOption : q.answers
      return { ...q, options: newOptions, answers: newAnswers }
    }))
  }
  const [nextId, setNextId] = useState(3)
  const addNewQuestion = () => {
    setQuestions(prev => [...prev, {
      id: nextId,
      question: "Change question here",
      options: ["Example option 1", "Example option 2", "Example option 3", "Example option 4"],
      answers: "Example option 1"
    }])
    setNextId(prev => prev + 1)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Question Editor Mode</h1>
      {questions.map((q, qIndex) => (
        <div key={q.id} style={{ width: '60%', marginBottom: '16px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ width: '100%' }}>
              Question #{qIndex + 1}: <input
              type="text"
              value={q.question}
              style={{ width: '60%' }}
              onChange={e => setQuestion(qIndex, e.target.value)}
            />
            </h3>
            {q.options.map((o, oIndex) => (
              <label key={oIndex}
                     style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', width: '100%' }}>
                <input
                  type="radio"
                  name={`options-${qIndex}`}
                  checked={o === q.answers}
                  onChange={() => setAnswer(qIndex, o)}
                />
                <input
                  type="text"
                  value={o}
                  style={{ width: '60%' }}
                  onChange={e => setOption(qIndex, oIndex, e.target.value)}
                />
              </label>
            ))}
          </form>
        </div>
      ))}
      <div>
        <button onClick={addNewQuestion} style={{ marginRight: '8px', marginTop: '12px' }}>
          Add new question
        </button>
        <button onClick={() => onDone(questions)}>Done</button>
      </div>
    </div>
  )
}

interface QuestionEditor {
  onDone: (questions: Question[]) => void
}
