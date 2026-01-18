import './QuizPanel.css'

function QuizPanel({ currentWard, showResult, isCorrect, onNext }) {
  const renderWardName = () => {
    if (!currentWard) return "";
    
    // カッコ（全角・半角どちらでも）の位置を探す
    const openParenIndex = currentWard.indexOf('（') !== -1 ? currentWard.indexOf('（') : currentWard.indexOf('(');
    
    if (openParenIndex !== -1) {
      const kanji = currentWard.substring(0, openParenIndex).trim();
      // 閉じカッコを無視して、中身の読みがなだけを取り出す
      const yomiPart = currentWard.substring(openParenIndex + 1);
      const yomi = yomiPart.replace(/[）\)]/g, '').trim();
      
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