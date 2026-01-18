import './QuizPanel.css'

function QuizPanel({ currentWard, showResult, isCorrect, onNext }) {
  // 漢字と読みを切り分ける（全角・半角両方のカッコに対応）
  const renderWardName = () => {
    const separator = currentWard.includes('（') ? '（' : (currentWard.includes('(') ? '(' : null);
    
    if (separator) {
      const [kanji, yomiWithParen] = currentWard.split(separator);
      const yomi = yomiWithParen.replace(/[）\)]/g, '').trim();
      return <ruby>{kanji.trim()}<rt>{yomi}</rt></ruby>;
    }
    return currentWard;
  };

  return (
    <div className="quiz-panel">
      <div className="question">
        <h2>この区はどこ？</h2>
        <div className="ward-name">
          {renderWardName()}
        </div>
      </div>

      {showResult && (
        <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="result-icon">{isCorrect ? '✓' : '✕'}</div>
          <div className="result-text">{isCorrect ? '正解！' : '不正解'}</div>
          <button className="next-button" onClick={onNext}>次の問題</button>
        </div>
      )}
    </div>
  )
}

export default QuizPanel