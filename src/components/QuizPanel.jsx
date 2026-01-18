import './QuizPanel.css'

function QuizPanel({ currentWard, showResult, isCorrect, onNext }) {
  // 漢字とよみがなを切り分ける処理（スペースや括弧の種類を問わず対応）
  const renderWardName = () => {
    // スペースがあっても、半角・全角どちらの括弧でも切り分けられるように強化
    const match = currentWard.match(/^(.*?)\s*[（\((](.*?)[）\))]\s*$/);
    
    if (match) {
      const kanji = match[1].trim(); // 漢字部分（前後の余白を消す）
      const yomi = match[2].trim();  // よみがな部分
      return (
        <ruby>
          {kanji}<rt>{yomi}</rt>
        </ruby>
      );
    }
    // 括弧がない場合はそのまま表示
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