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
  "世田谷区": "二子玉川、三軒茶屋、豪徳寺",
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
    <div style={{ textAlign: 'center', backgroundColor: '#6b63b5', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ 
        backgroundColor: isCorrect ? '#eff6ff' : 'white', borderRadius: '25px', padding: '20px', maxWidth: '800px', margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'background-color 0.3s ease'
      }}>
        <h1>東京23区クイズ</h1>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#6b63b5' }}>{score.correct} / 23 達成！</div>
        <hr style={{ margin: '15px 0', border: 'none', height: '1px', backgroundColor: '#eee' }} />
        
        {/* メッセージ表示エリア */}
        <div style={{ minHeight: '2.5em', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
          <div style={{ fontSize: '1.2rem', color: isCorrect ? '#1d4ed8' : '#333', fontWeight: 'bold' }}>{message}</div>
        </div>

        {/* 区名（読み仮名は小さく） */}
        <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: isCorrect ? '#1e40af' : '#6b63b5', marginBottom: '10px' }}>
          {currentWard !== "完全制覇！" ? (
            <>
              {currentWard}
              <span style={{ fontSize: '1.2rem', fontWeight: 'normal', marginLeft: '8px', opacity: 0.6 }}>
                （{wardReadings[currentWard]}）
              </span>
            </>
          ) : currentWard}
        </div>

        {/* 有名なもの */}
        {currentWard !== "完全制覇！" && (
          <div style={{ fontSize: '0.95rem', color: '#666', marginBottom: '10px', backgroundColor: '#f9fafb', display: 'inline-block', padding: '6px 18px', borderRadius: '15px' }}>
            🌟 有名なもの：<span style={{ color: '#333', fontWeight: 'bold' }}>{wardFamous[currentWard]}</span>
          </div>
        )}

        {/* 覚え方（有名なものの下に配置） */}
        <div style={{ minHeight: '2.5em', marginBottom: '15px' }}>
          {currentWard !== "完全制覇！" && !isCorrect && (
            <div style={{ color: '#6b63b5', fontSize: '1.1rem', fontWeight: '500', animation: 'fadeIn 0.5s' }}>
              💡 覚え方：{wardMnemonics[currentWard]}
            </div>
          )}
        </div>

        <TokyoMap onwardClick={handleWardClick} answeredWards={answeredWards} />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;