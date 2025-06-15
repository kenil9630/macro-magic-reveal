
import React, { useEffect, useState } from 'react';

interface ExcelCell {
  id: number;
  content: string;
  x: number;
  y: number;
  delay: number;
}

const ExcelCells: React.FC = () => {
  const [cells, setCells] = useState<ExcelCell[]>([]);

  const excelContent = [
    'A1', 'B2', 'C3', '=SUM(A1:A10)', '=VLOOKUP()', 'PIVOT', 'CHART',
    '=IF(A1>0,"Yes","No")', 'Data', '=COUNT()', '=AVERAGE()', 'Formula',
    'Macro', 'VBA', 'Automate', '=TODAY()', '=CONCATENATE()', 'Report',
    '=INDEX()', '=MATCH()', 'Analysis', 'Dashboard', '=ROUND()', 'Template'
  ];

  useEffect(() => {
    const generateCells = () => {
      const newCells: ExcelCell[] = [];
      for (let i = 0; i < 20; i++) {
        newCells.push({
          id: i,
          content: excelContent[Math.floor(Math.random() * excelContent.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 6
        });
      }
      setCells(newCells);
    };

    generateCells();
    const interval = setInterval(generateCells, 10000); // Regenerate every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {cells.map((cell) => (
        <div
          key={cell.id}
          className="excel-cell animate-float opacity-30"
          style={{
            left: `${cell.x}%`,
            top: `${cell.y}%`,
            animationDelay: `${cell.delay}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        >
          {cell.content}
        </div>
      ))}
      
      {/* Sparkle effects */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="sparkle animate-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

export default ExcelCells;
