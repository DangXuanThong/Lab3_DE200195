export default function Result({ score }: ResultProp) {
  return (
    <div style={{ height: '100%', textAlign: 'center' }}>
      <h1>Quiz Ended</h1>
      <h1>Your score: {score}</h1>
    </div>
  )
}

interface ResultProp {
  score: number
}
