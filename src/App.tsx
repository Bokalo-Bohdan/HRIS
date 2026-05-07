import React, { useState, useEffect } from "react";
import { PageView } from "./types";
import { Sidebar } from "./components/Sidebar";
import { AnimatedPage } from "./components/AnimatedPage";
import { Dashboard } from "./pages/Dashboard";
import { Schedule } from "./pages/Schedule";
import { Medications } from "./pages/Medications";
import { Payroll } from "./pages/Payroll";
import "./styles/style.css";

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageView>("dashboard");
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

  const todayIsWorkDay = isWorkDay(currentTime);
  const isWorkingNow =
    todayIsWorkDay && currentHour >= startHour && currentHour < endHour;

  return (
    <div className="app-container">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        <header className="topbar">
          <div className="greeting">
            <h1>Вітаємо, *ПІБ працівника*</h1>
            <p>
              Сьогодні:{" "}
              {currentTime.toLocaleDateString("uk-UA", {
                day: "numeric",
                month: "long",
              })}{" "}
              | Ваша зміна:{" "}
              <strong>
                {todayIsWorkDay ? "Денна (08:00 - 20:00)" : "Вихідний"}
              </strong>
            </p>
          </div>

          <div className="user-profile">
            <div
              className={`status-indicator ${isWorkingNow ? "active" : "offline"}`}
            >
              <span className="status-dot"></span>
              {isWorkingNow ? "На зміні" : "Вихідний"}
            </div>
            <div className="avatar">*</div>
          </div>
        </header>

        <AnimatedPage pageKey={activePage}>
          {activePage === "dashboard" && <Dashboard />}
          {activePage === "schedule" && <Schedule />}
          {activePage === "medications" && <Medications />}
          {activePage === "payroll" && <Payroll />}
        </AnimatedPage>
      </main>
    </div>
  );
};
