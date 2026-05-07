import React, { useState } from 'react';

interface DailyEarnings {
  id: number;
  date: string;
  hours: number;
  rate: number;
  type: 'Денна' | 'Нічна';
  total: number;
}

export const Payroll: React.FC = () => {
  const [history] = useState<DailyEarnings[]>([
    { id: 1, date: '06.05.2026', hours: 12, rate: 120, type: 'Денна', total: 1440 },
    { id: 2, date: '05.05.2026', hours: 12, rate: 120, type: 'Денна', total: 1440 },
    { id: 3, date: '02.05.2026', hours: 12, rate: 120, type: 'Денна', total: 1440 },
    { id: 4, date: '01.05.2026', hours: 12, rate: 120, type: 'Денна', total: 1440 },
  ]);

  const totalAmount = history.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="payroll-page">
      <div className="card" style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '4px solid #2d5bff' }}>
        <h3 style={{ color: '#8898aa', marginBottom: '10px' }}>Загальний баланс</h3>
        <div className="big-number" style={{ fontSize: '56px' }}>
          {totalAmount.toLocaleString()} <span>грн</span>
        </div>
        <p className="sub-text">Нараховано за травень 2026</p>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '20px' }}>Історія змін та виплат</h3>
        <div className="payroll-list">
          {history.map((item) => (
            <div 
              key={item.id} 
              className="list-item" 
              style={{ 
                padding: '16px 0', 
                borderBottom: '1px solid #f0f2f5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '16px' }}>{item.date}</span>
                <span className="sub-text">
                  {item.type} зміна • {item.hours} год. (ставка {item.rate} грн/год)
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  fontWeight: 700, 
                  color: item.type === 'Нічна' ? '#2d5bff' : '#333',
                  fontSize: '18px'
                }}>
                  +{item.total} грн
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="btn-outline" 
          style={{ marginTop: '20px', fontSize: '14px' }}
          onClick={() => window.print()} 
        >
          Завантажити виписку (PDF)
        </button>
      </div>
    </div>
  );
};