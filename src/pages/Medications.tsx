import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MedicationRecord {
  id: number;
  name: string;
  patient: string;
  amount: string;
  time: string;
}

export const Medications: React.FC = () => {
  const [records, setRecords] = useState<MedicationRecord[]>([
    {
      id: 1,
      name: "Адреналін",
      patient: "Іванов П.Р.",
      amount: "1 амп.",
      time: "09:15",
    },
    {
      id: 2,
      name: "Фізрозчин 400мл",
      patient: "Петрова О.М.",
      amount: "1 пак.",
      time: "10:30",
    },
    {
      id: 3,
      name: "Анальгін",
      patient: "Сидоренко В.А.",
      amount: "2 мл",
      time: "11:00",
    },
    {
      id: 4,
      name: "Дексаметазон",
      patient: "Ковальчук О.І.",
      amount: "1 амп.",
      time: "11:45",
    },
    {
      id: 5,
      name: "Глюкоза 5%",
      patient: "Бондар Ю.М.",
      amount: "200 мл",
      time: "12:20",
    },
    {
      id: 6,
      name: "Гепарин",
      patient: "Мельник А.В.",
      amount: "4000 ОД",
      time: "13:10",
    },
    {
      id: 7,
      name: "Магнію сульфат",
      patient: "Павленко Т.С.",
      amount: "5 мл",
      time: "14:00",
    },
    {
      id: 8,
      name: "Кордарон",
      patient: "Лисенко В.П.",
      amount: "3 мл",
      time: "14:35",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPatient, setNewPatient] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFormOpen && formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, scale: 0.9, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" },
      );
    }
  }, [isFormOpen]);

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPatient || !newAmount) return;

    const newRecord: MedicationRecord = {
      id: Date.now(),
      name: newName,
      patient: newPatient,
      amount: newAmount,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setRecords([newRecord, ...records]);

    setNewName("");
    setNewPatient("");
    setNewAmount("");
    setIsFormOpen(false);
  };

  return (
    <div className="medications-page">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2>Журнал використання медикаментів</h2>
        <button
          className="btn-primary"
          style={{ width: "auto", padding: "10px 20px" }}
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? "Закрити" : "+ Списати препарат"}
        </button>
      </header>

      {isFormOpen && (
        <div
          ref={formRef}
          className="card"
          style={{ marginBottom: "24px", border: "1px solid #2d5bff" }}
        >
          <form
            onSubmit={handleAddRecord}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr auto",
              gap: "15px",
              alignItems: "end",
            }}
          >
            <div>
              <label className="sub-text">Назва препарату</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
                placeholder="напр. Анальгін"
              />
            </div>
            <div>
              <label className="sub-text">Пацієнт</label>
              <input
                type="text"
                value={newPatient}
                onChange={(e) => setNewPatient(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
                placeholder="Прізвище І.О."
              />
            </div>
            <div>
              <label className="sub-text">Кількість</label>
              <input
                type="text"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
                placeholder="1 амп / 200 мл"
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ height: "38px" }}
            >
              Зберегти
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                textAlign: "left",
                borderBottom: "2px solid #E4E8ED",
                color: "#8898AA",
              }}
            >
              <th style={{ padding: "12px" }}>Медикамент</th>
              <th style={{ padding: "12px" }}>Пацієнт</th>
              <th style={{ padding: "12px" }}>Списана к-сть</th>{" "}
              <th style={{ padding: "12px" }}>Час введення</th>{" "}
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.id}
                className="table-row-animate"
                style={{ borderBottom: "1px solid #F0F0F0" }}
              >
                <td style={{ padding: "12px", fontWeight: 500 }}>
                  {record.name}
                </td>
                <td style={{ padding: "12px" }}>{record.patient}</td>
                <td style={{ padding: "12px" }}>{record.amount}</td>
                <td style={{ padding: "12px", color: "#8898AA" }}>
                  {record.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
