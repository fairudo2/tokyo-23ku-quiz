import './QuizPanel.css'

function QuizPanel({ currentWard, showResult, isCorrect, onNext }) {
  return (
    <div className="quiz-panel">
      <div className="question">
        <h2>この区はどこ？</h2>
        <div className="ward-name">
          {/* 括弧が含まれている場合のみルビ表示にする仕組み */}
          {currentWard.includes('（') ? (
            <ruby>
              {currentWard.split('（')[0]}
              <rt>{currentWard.split('（')[1].replace('）', '')}</rt>
            </ruby>
          ) : (
            currentWard
          )}
        </div>
      </div>

      {showResult && (
        <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="result-icon">
            {isCorrect ? '✓' : '✕'}
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