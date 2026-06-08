import type { Question } from './QuizApp.tsx'
import './Question.css'
import { useState } from 'react'

export default function Question({ id, question, options, answers, onNextQuestion, onIncreaseScore, isFinalQuestion }: QuestionProp) {
  const [selectedOptions, setSelectedOptions] = useState([false, false, false, false])
  const updateItem = (index: number, newValue: boolean) => {
    setSelectedOptions(prev => prev.map((item, i) => i === index ? newValue : item));
  };

  return (
    <div>
      <h2>Question {id}</h2>
      <h2 style={{ marginTop: 0, fontWeight: 'normal' }}>{question}</h2>
      <ul className="answer-list">
        {options.map((o, index) => (
          <li style={{ background: (selectedOptions[index]) ? (o === answers ? 'green' : 'red') : 'none' }} key={index}>
            <button
              style={{
                background: 'none',
                border: 'none',
                minHeight: '40px',
                width: '100%'
              }}
              onClick={() => {
                updateItem(index, true)
                const isCorrect = o === answers;
                const isFirstSelection = selectedOptions.every(op => !op);
                if (isCorrect && isFirstSelection) onIncreaseScore();
              }}
              disabled={selectedOptions[index]}>
              {o}
            </button>
          </li>
        ))}
      </ul>
      <button disabled={selectedOptions.every(op => !op)} onClick={onNextQuestion}>
        {isFinalQuestion && "View result"}
        {isFinalQuestion || "Next question"}
      </button>
    </div>
  )
}

interface QuestionProp extends Question {
  onNextQuestion: () => void,
  onIncreaseScore: () => void,
  isFinalQuestion: boolean
}
