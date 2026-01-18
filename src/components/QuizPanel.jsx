import './QuizPanel.css'

function QuizPanel({ currentWard, showResult, isCorrect, onNext }) {
  // かっこ（読み）を切り分ける処理
  const renderWardName = () => {
    // 全角または半角のかっこを探す
    const match = currentWard.match(/^(.*?)[（\((](.*?)[）\))]$/);
    
    if (match) {
      const kanji = match[1]; // 漢字部分
      const yomi = match[2];  // よみがな部分
      return (
        <ruby>
          {kanji}<rt>{yomi}</rt>
        </ruby>
      );
    }
    // かっこがない場合はそのまま表示
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