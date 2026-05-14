import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageView } from "./types";
import { Sidebar } from "./components/Sidebar";
import { AnimatedPage } from "./components/AnimatedPage";
import { Dashboard } from "./pages/Dashboard";
import { Schedule } from "./pages/Schedule";
import { Medications } from "./pages/Medications";
import { Payroll } from "./pages/Payroll";
import "./styles/style.css";

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
}

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageView>("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Стан для авторизації
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [personnel, setPersonnel] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Стан для форми входу
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // 1. Функція для Логіна
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const response = await axios.post("http://127.0.0.1:8000/token", formData);
      const accessToken = response.data.access_token;
      
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
    } catch (error) {
      setLoginError("Невірний email або пароль");
      console.error("Login error", error);
    }
  };

  // 2. Функція для Виходу
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPersonnel(null);
  };

  // 3. Отримання даних профілю (тільки якщо є токен)
  useEffect(() => {
    if (token) {
      axios.get("http://127.0.0.1:8000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setPersonnel(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Auth error", error);
        handleLogout(); // Якщо токен невалідний — розлогінюємо
        setLoading(false);
      });
    }
  }, [token]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const isWorkDay = (date: Date) => {
    const day = date.getDate();
    return (day - 1) % 4 === 0 || (day - 1) % 4 === 1;
  };

  const todayIsWorkDay = isWorkDay(currentTime);
  const currentHour = currentTime.getHours();
  const isWorkingNow = todayIsWorkDay && currentHour >= 8 && currentHour < 20;

  // --- ВІДОБРАЖЕННЯ ФОРМИ ВХОДУ ---
  if (!token) {
    return (
      <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f7fe' }}>
        <form onSubmit={handleLogin} style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '350px' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#2b3674' }}>Вхід в CareSync</h2>
          {loginError && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{loginError}</p>}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#707eae' }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e0e5f2' }} 
              required 
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#707eae' }}>Пароль</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e0e5f2' }} 
              required 
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: '#4318FF', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            Увійти
          </button>
        </form>
      </div>
    );
  }

  // --- ВІДОБРАЖЕННЯ ОСНОВНОГО ІНТЕРФЕЙСУ ---
  const user = personnel || { name: "Завантаження...", position: "...", id: 0 };

  return (
    <div className="app-container">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        <header className="topbar">
          <div className="greeting">
            <h1>Вітаємо, {user.name}</h1>
            <p>
              Сьогодні: {currentTime.toLocaleDateString("uk-UA", { day: "numeric", month: "long" })} | 
              Ваша зміна: <strong>{todayIsWorkDay ? "Денна (08:00 - 20:00)" : "Вихідний"}</strong>
            </p>
          </div>

          <div className="user-profile">
            <div className="user-info" style={{ marginRight: '15px', textAlign: 'right' }}>
               <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{user.position}</div>
               <div style={{ fontSize: '12px', color: '#666' }}>ID: {user.id || "..."}</div>
               <button onClick={handleLogout} style={{ fontSize: '10px', color: '#4318FF', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>Вийти</button>
            </div>
            <div className={`status-indicator ${isWorkingNow ? "active" : "offline"}`}>
              <span className="status-dot"></span>
              {isWorkingNow ? "На зміні" : "Вихідний"}
            </div>
            <div className="avatar">{user.name.charAt(0)}</div>
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