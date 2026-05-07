// components/Sidebar.tsx
import React from "react";
import { PageView } from "../types";

interface SidebarProps {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  setActivePage,
}) => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>
          Care
          <span
            style={{
              color: "white",
              backgroundColor: "#2d5bff",
              borderRadius: "5px",
              padding: "3px",
            }}
          >
            Sync
          </span>
          <br />
          <span>HRIS</span>
        </h2>
      </div>
      <nav className="nav-menu">
        <a
          href="#"
          className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setActivePage("dashboard");
          }}
        >
          Головна
        </a>
        <a
          href="#"
          className={`nav-item ${activePage === "schedule" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setActivePage("schedule");
          }}
        >
          Мій розклад
        </a>
        <a
          href="#"
          className={`nav-item ${activePage === "medications" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setActivePage("medications");
          }}
        >
          Медикаменти
        </a>
        <a
          href="#"
          className={`nav-item ${activePage === "payroll" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setActivePage("payroll");
          }}
        >
          Зарплата та Години
        </a>
      </nav>
      <div className="sidebar-footer">
        <a href="#" className="nav-item">
          Налаштування
        </a>
        <a href="#" className="nav-item logout">
          Вийти
        </a>
      </div>
    </aside>
  );
};
