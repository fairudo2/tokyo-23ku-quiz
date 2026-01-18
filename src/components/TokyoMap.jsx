import React, { useEffect, useState } from 'react';
import * as d3 from 'd3-geo';

const TokyoMap = ({ onwardClick, answeredWards = [] }) => {
  const [geodata, setGeodata] = useState(null);

  useEffect(() => {
    fetch('/tokyo23.json')
      .then(res => res.json())
      .then(data => setGeodata(data))
      .catch(err => console.error("Data Load Error:", err));
  }, []);

  if (!geodata) return <div style={{ padding: '50px', color: '#666' }}>地図を読み込み中...</div>;

  const projection = d3.geoMercator()
    .center([139.75, 35.68])
    .scale(85000)
    .translate([400, 300]);

  const pathGenerator = d3.geoPath().projection(projection);

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <svg width="800" height="600" viewBox="0 0 800 600" style={{ width: '100%', height: 'auto', background: '#f8fafc', borderRadius: '20px' }}>
        {geodata.features.map((feature, i) => {
          const wardName = feature.properties.N03_004 || feature.properties.name || "";
          const isAnswered = answeredWards.includes(wardName);
          const centroid = pathGenerator.centroid(feature);

          return (
            <g key={i}>
              <path
                d={pathGenerator(feature)}
                // 【修正】緑から青（#60a5fa）に変更しました
                fill={isAnswered ? "#60a5fa" : "#ffffff"}
                stroke={isAnswered ? "#2563eb" : "#cbd5e1"}
                strokeWidth={isAnswered ? "2" : "0.5"}
                style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
                onClick={() => onwardClick(wardName)}
              />
              {isAnswered && (
                <text
                  x={centroid[0]}
                  y={centroid[1]}
                  textAnchor="middle"
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    fill: '#1e40af', // 濃い青色の文字
                    pointerEvents: 'none', 
                    paintOrder: 'stroke', 
                    stroke: '#ffffff', 
                    strokeWidth: '3px' 
                  }}
                >
                  {wardName.replace("区", "")}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default TokyoMap;