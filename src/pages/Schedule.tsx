export const Schedule: React.FC = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const daysInMonth = new Date(2026, currentMonth + 1, 0).getDate();

  const isWorkDay = (day: number) => {
    const cycleDay = (day - 1) % 4;
    return cycleDay === 0 || cycleDay === 1;
  };

  const allWorkDays = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1,
  ).filter(isWorkDay);
  const workedDays = allWorkDays.filter((day) => day < today.getDate()).length;
  const remainingDays = allWorkDays.length - workedDays;

  return (
    <div className="schedule-page">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div className="card" style={{ borderLeft: "4px solid #2d5bff" }}>
          <h4 className="sub-text">Відпрацьовано</h4>
          <div className="big-number" style={{ fontSize: "32px" }}>
            {workedDays} <span>змін</span>
          </div>
        </div>
        <div className="card" style={{ borderLeft: "4px solid #ffbc00" }}>
          <h4 className="sub-text">Залишилось відпрацювати:</h4>
          <div className="big-number" style={{ fontSize: "32px" }}>
            {remainingDays} <span>змін</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3>Травень 2026</h3>
          <span className="sub-text">Графік: 2 через 2</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "10px",
            textAlign: "center",
          }}
        >
          {["Пт", "Сб", "Нд", "Пн", "Вт", "Ср", "Чт"].map((d) => (
            <div
              key={d}
              style={{
                fontWeight: "bold",
                color: "#8898aa",
                fontSize: "12px",
                paddingBottom: "10px",
              }}
            >
              {d}
            </div>
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const work = isWorkDay(day);
            const isToday = day === today.getDate();

            return (
              <div
                key={day}
                style={{
                  padding: "15px 5px",
                  borderRadius: "10px",
                  backgroundColor: work ? "#eef2ff" : "#dedede",
                  border: isToday
                    ? "2px solid #2d5bff"
                    : "1px solid transparent",
                  position: "relative",
                  transition: "transform 0.2s",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    color: work ? "#2d5bff" : "#333",
                    display: "block",
                  }}
                >
                  {day}
                </span>
                {work && (
                  <span
                    style={{
                      fontSize: "9px",
                      textTransform: "uppercase",
                      color: "#2d5bff",
                      fontWeight: 800,
                      marginTop: "4px",
                      display: "block",
                    }}
                  >
                    Зміна
                  </span>
                )}
                {isToday && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      backgroundColor: "#2d5bff",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#eef2ff",
              borderRadius: "3px",
            }}
          ></div>
          <span className="sub-text" style={{ fontSize: "12px" }}>
            Робоча зміна (12 год)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#f8f9fe",
              borderRadius: "3px",
            }}
          ></div>
          <span className="sub-text" style={{ fontSize: "12px" }}>
            Вихідний
          </span>
        </div>
      </div>
    </div>
  );
};
