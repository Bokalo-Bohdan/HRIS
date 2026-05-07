import React, { useState, useEffect } from "react";

export const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const isWorkDay = (date: Date) => {
    const day = date.getDate();
    const cycleDay = (day - 1) % 4;
    return cycleDay === 0 || cycleDay === 1;
  };

  const startHour = 8;
  const endHour = 20;
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const todayIsWorkDay = isWorkDay(currentTime);
  const isWorkingNow =
    todayIsWorkDay && currentHour >= startHour && currentHour < endHour;

  const totalMinutes = (endHour - startHour) * 60;
  const passedMinutes = (currentHour - startHour) * 60 + currentMinutes;
  const progress = Math.min(
    Math.max((passedMinutes / totalMinutes) * 100, 0),
    100,
  );

  return (
    <section className="dashboard-grid">
      <div className="card">
        <div
          className="card-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Статус зміни</h3>
          {isWorkingNow ? (
            <span className="badge-live">LIVE</span>
          ) : (
            <span
              style={{ fontSize: "10px", fontWeight: "bold", color: "#8898aa" }}
            >
              OFFLINE
            </span>
          )}
        </div>

        <div className="card-content">
          {isWorkingNow ? (
            <>
              <div className="info-row">
                <span>Зараз у зміні:</span>
                <strong>
                  {currentHour}:
                  {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}
                </strong>
              </div>
              <div
                className="progress-bar"
                style={{
                  height: "10px",
                  backgroundColor: "#eef2ff",
                  borderRadius: "5px",
                  margin: "15px 0",
                  overflow: "hidden",
                }}
              >
                <div
                  className="progress"
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    backgroundColor: "#2d5bff",
                    transition: "width 1s ease-in-out",
                  }}
                ></div>
              </div>
              <p className="sub-text">
                Зміна виконана на {Math.round(progress)}%
              </p>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <h4 style={{ margin: "3rem 0", fontSize: "1.5rem" }}>Вихідний</h4>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Нараховано за травень</h3>
        <div className="card-content">
          <div className="big-number">
            11 520 <span>грн</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <span
              style={{ color: "#2ecc71", fontSize: "14px", fontWeight: "bold" }}
            >
              ↑ 12%
            </span>
            <span className="sub-text">порівняно з квітнем</span>
          </div>
        </div>
      </div>

      <div
        className="card warning-card"
        style={{ borderTop: "4px solid #ff4757" }}
      >
        <h3 style={{ color: "#ff4757" }}>⚠️ Критичні залишки</h3>
        <div className="card-content list-content">
          <div
            className="list-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #f8f9fe",
            }}
          >
            <span>Адреналін (амп.)</span>
            <strong style={{ color: "#ff4757" }}>2 шт.</strong>
          </div>
          <div
            className="list-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
            }}
          >
            <span>Фізрозчин 400мл</span>
            <strong style={{ color: "#ff4757" }}>5 шт.</strong>
          </div>
          <button
            className="btn-outline"
            style={{
              marginTop: "12px",
              width: "100%",
              borderColor: "#ff4757",
              color: "#ff4757",
            }}
          >
            Замовити на склад
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Наступна зміна</h3>
        <div className="card-content">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                padding: "8px 12px",
                backgroundColor: "#eef2ff",
                borderRadius: "8px",
                textAlign: "center",
                minWidth: "50px",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "10px",
                  color: "#2d5bff",
                  fontWeight: "bold",
                }}
              >
                ТРА
              </span>
              <strong style={{ fontSize: "18px", color: "#2d5bff" }}>09</strong>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "14px" }}>
                Субота, 09 травня
              </p>
              <span className="sub-text">Денна зміна (12 год)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
