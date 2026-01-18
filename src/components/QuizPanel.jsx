import './QuizPanel.css'

function QuizPanel({ currentWard, showResult, isCorrect, onNext }) {
  return (
    <div className="quiz-panel">
      <div className="question">
        <h2>この区はどこ？</h2>
        <div className="ward-name">{currentWard}</div>
      </div>
      
      {showResult && (
        <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="result-icon">
            {isCorrect ? '✓' : '✗'}
          </div>
          <div className="result-text">
            {isCorrect ? '正解！' : '不正解'}
          </div>
          <button className="next-button" onClick={onNext}>
            次の問題
          </button>
        </div>
      )}
    </div>
  )
}

export default QuizPanel
