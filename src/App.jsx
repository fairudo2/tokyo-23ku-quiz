import React, { useState, useEffect } from 'react';
import TokyoMap from './components/TokyoMap';

const wardReadings = {
  "千代田区": "ちよだく", "中央区": "ちゅうおうく", "港区": "みなとく",
  "新宿区": "しんじゅくく", "文京区": "ぶんきょうく", "台東区": "たいとうく",
  "墨田区": "すみだく", "江東区": "こうとうく", "品川区": "しながわく",
  "目黒区": "めぐろく", "大田区": "おおたく", "世田谷区": "せたがやく",
  "渋谷区": "しぶやく", "中野区": "なかのく", "杉並区": "すぎなみく",
  "豊島区": "としまく", "北区": "きたく", "荒川区": "あらかわく",
  "板橋区": "いたばしく", "練馬区": "ねりまく", "足立区": "あだちく",
  "葛飾区": "かつしかく", "江戸川区": "えどがわく"
};

const wardMnemonics = {
  "千代田区": "千代田区は、日本の中心だから、ど真ん中！",
  "中央区": "中央区は、中心のすぐ右にある、商業のセンター！",
  "港区": "港区は、お城の下にある、海への玄関口！",
  "新宿区": "新宿区は、お城の左にある、新しい西の宿！",
  "文京区": "文京区は、お城の上にある、お勉強の山！",
  "台東区": "台東区は、お城の右上の台地にある、一番小さな区！",
  "墨田区": "墨田区は、台東区の右に川を渡って、スカイツリーを立てた！",
  "江東区": "江東区は、隅田川の東にあるから、右下の海の横！",
  "品川区": "品川区は、港区の下に並んで、川のように南へ続く！",
  "目黒区": "目黒区は、品川区の左上で、南西を守る黒い目！",
  "大田区": "大田区は、一番下にある大きな田んぼに、飛行場を作った！",
  "世田谷区": "世田谷区は、左下の広い角っこに、世田を広げた！",
  "渋谷区": "渋谷区は、新宿と目黒の間に、深い谷を作った！",
  "中野区": "中野区は、新宿のすぐ左で、西の住宅街の真ん中！",
  "杉並区": "杉並区は、中野区のさらに左に、杉の木を並べて端っこにした！",
  "豊島区": "豊島区は、新宿の上にある、北へ向かう豊かな島！",
  "北区": "北区は、名前の通り、真ん中より北に置いた！",
  "荒川区": "荒川区は、北区と台東区の間で、荒い川に沿って細長くなった！",
  "板橋区": "板橋区は、北区の左に、板の橋をかけて北西へ逃げた！",
  "練馬区": "練馬区は、一番左上の角で、広い畑で馬を練り歩かせた！",
  "足立区": "足立区は、一番上の広い場所で、埼玉県に足をふみ出した！",
  "葛飾区": "葛飾区は、一番右上の角っこで、勝利の旗を飾った！",
  "江戸川区": "江戸川区は、一番右の江戸川で、千葉県との境目を作った！"
};

const wardFamous = {
  "千代田区": "皇居、東京駅、秋葉原",
  "中央区": "銀座、日本橋、築地",
  "港区": "東京タワー、六本木ヒルズ、レインボーブリッジ",
  "新宿区": "東京都庁、歌舞伎町、新宿御苑",
  "文京区": "東京ドーム、後楽園、東京大学",
  "台東区": "浅草寺、上野動物園、アメ横",
  "墨田区": "東京スカイツリー、両国国技館",
  "江東区": "豊洲市場、東京ビッグサイト、清澄庭園",
  "品川区": "しながわ水族館、大井競馬場",
  "目黒区": "目黒川の桜、自由が丘",
  "大田区": "羽田空港、洗足池",
  "世田谷区": "二子玉川、三軒屋、豪徳寺",
  "渋谷区": "ハチ公、スクランブル交差点、代々木公園",
  "中野区": "中野ブロードウェイ、哲学堂公園",
  "杉並区": "高円寺（阿波おどり）、荻窪ラーメン",
  "豊島区": "サンシャインシティ、池袋、とげぬき地蔵",
  "北区": "飛鳥山公園、赤羽、旧古河庭園",
  "荒川区": "あらかわ遊園、都電荒川線",
  "板橋区": "赤塚植物園、いたばし花火大会",
  "練馬区": "アニメ、光が丘公園、練馬大根",
  "足立区": "西新井大師、北千住、舎人公園",
  "葛飾区": "柴又（寅さん）、亀有（こち亀）、水元公園",
  "江戸川区": "葛西臨海水族園、小松菜、ポニーランド"
};

const wardsList = Object.keys(wardMnemonics);

function App() {
  const [currentWard, setCurrentWard] = useState("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [message, setMessage] = useState("この区はどこ？");
  const [answeredWards, setAnsweredWards] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const first = wardsList[Math.floor(Math.random() * wardsList.length)];
    setCurrentWard(first);
  }, []);

  const handleWardClick = (clickedWardName) => {
    if (clickedWardName === currentWard) {
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      setAnsweredWards(prev => [...new Set([...prev, clickedWardName])]);
      setIsCorrect(true);
      setMessage("✨ 正解！すごい！ ✨");
      setTimeout(() => {
        const remaining = wardsList.filter(w => !answeredWards.includes(w) && w !== clickedWardName);
        if (remaining.length === 0) {
          setMessage("🎉 23区すべて制覇！おめでとう！ 🎉");
          setCurrentWard("完全制覇！");
        } else {
          const next = remaining[Math.floor(Math.random() * remaining.length)];
          setCurrentWard(next);
          setMessage("この区はどこ？");
        }
        setIsCorrect(false);
      }, 1500);
    } else {
      setMessage(`残念！そこは「${clickedWardName}」だよ。`);
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
    }
  };

  if (!currentWard) return null;

  return (
    <div className="app-container">
      <div className="quiz-card">
        <h1>東京23区クイズ</h1>
        <div className="score-display">{score.correct} / 23 達成！</div>
        <hr className="divider" />
        
        <div className="message-area">
          <div className={`message-text ${isCorrect ? 'correct' : ''}`}>{message}</div>
        </div>

        <div className="ward-display">
          {currentWard !== "完全制覇！" ? (
            <ruby>
              {currentWard}
              <rt>{wardReadings[currentWard]}</rt>
            </ruby>
          ) : currentWard}
        </div>

        {currentWard !== "完全制覇！" && (
          <div className="famous-tag">
            🌟 有名なもの：<strong>{wardFamous[currentWard]}</strong>
          </div>
        )}

        <div className="hint-area">
          {currentWard !== "完全制覇！" && !isCorrect && (
            <div className="hint-text">💡 覚え方：{wardMnemonics[currentWard]}</div>
          )}
        </div>

        {/* スクロール可能な地図エリア */}
        <div className="scrollable-map-container">
          <div className="map-zoom-wrapper">
            <TokyoMap onwardClick={handleWardClick} answeredWards={answeredWards} />
          </div>
        </div>
      </div>

      <style>{`
        .app-container {
          text-align: center;
          background-color: #6b63b5;
          min-height: 100vh;
          padding: 10px;
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
        }
        .quiz-card {
          background-color: white;
          border-radius: 25px;
          padding: 15px;
          max-width: 800px;
          margin: 0 auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        h1 { font-size: 1.4rem; margin: 5px 0; }
        .score-display { font-size: 1rem; font-weight: bold; color: #6b63b5; }
        .divider { margin: 8px 0; border: none; height: 1px; background-color: #eee; }
        .message-area { min-height: 2.2em; display: flex; align-items: center; justify-content: center; }
        .message-text { font-size: 1rem; font-weight: bold; }
        .message-text.correct { color: #1d4ed8; }
        
        .ward-display {
          font-size: 3.8rem;
          font-weight: bold;
          color: #6b63b5;
          margin: 15px 0 5px 0;
          line-height: 1.2;
        }
        rt {
          font-size: 1rem;
          font-weight: normal;
          display: ruby-text;
          color: #666;
          padding-bottom: 3px;
        }

        .famous-tag { font-size: 0.85rem; color: #666; margin-bottom: 5px; background-color: #f9fafb; padding: 4px 12px; border-radius: 12px; display: inline-block; margin: 0 auto; }
        .hint-area { min-height: 2.5em; margin: 8px 0; }
        .hint-text { color: #6b63b5; font-size: 0.95rem; font-weight: 500; padding: 0 10px; }
        
        /* 地図スクロールエリアの設定 */
        .scrollable-map-container {
          flex-grow: 1;
          height: 500px; /* PCでの表示高さ */
          overflow: auto; /* スクロールを許可 */
          border: 2px solid #f0f0f0;
          border-radius: 15px;
          background-color: #fafafa;
          -webkit-overflow-scrolling: touch; /* iOSでの滑らかなスクロール */
        }

        /* 地図を強制的に大きく表示させるためのラッパー */
        .map-zoom-wrapper {
          width: 800px; /* スマホ画面よりわざと大きくする */
          height: 600px; /* 高さを確保する */
          margin: 0 auto;
        }

        @media (max-width: 600px) {
          .ward-display { font-size: 3.2rem; }
          .scrollable-map-container {
            height: 450px; /* スマホでのスクロール窓の高さ */
          }
          .map-zoom-wrapper {
            width: 700px; /* スマホでスクロールしたくなる大きさ */
            height: 500px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;