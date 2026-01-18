import './QuizPanel.css'

function QuizPanel({ currentWard, showResult, isCorrect, onNext }) {
  // 漢字と読みを切り分ける（スペースやカッコの種類を問わず対応）
  const renderWardName = () => {
    if (!currentWard) return "";
    
    // 全角・半角のカッコで分割
    const parts = currentWard.split(/[（\((]/);
    
    if (parts.length > 1) {
      const kanji = parts[0].trim();
      const yomi = parts[1].replace(/[）\)]/g, '').trim();
      return (
        <ruby>
          {kanji}
          <rt>{yomi}</rt>
        </ruby>
      );
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
  );
}

export default QuizPanel