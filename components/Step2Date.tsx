"use client";

import { BookingData } from "@/app/page";

const TIMES = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00",
];

type Props = {
  booking: BookingData;
  update: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
};

function getDateOptions() {
  const options = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const day = days[d.getDay()];
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    options.push({ value: `${yyyy}-${mm}-${dd}`, label: `${mm}월 ${dd}일 (${day})`, isWeekend });
  }
  return options;
}

export default function Step2Date({ booking, update, onNext, onPrev }: Props) {
  const dates = getDateOptions();
  const canNext = booking.date && booking.time;

  return (
    <div>
      {/* 날짜 선택 */}
      <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <span style={{ fontSize: "32px" }}>📅</span>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>날짜 선택</div>
            <div style={{ fontSize: "15px", color: "#6b7280" }}>언제 출발하실 건가요? (오늘부터 14일)</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
          {dates.map((d) => (
            <button
              key={d.value}
              onClick={() => update({ date: d.value })}
              style={{
                padding: "16px 12px",
                borderRadius: "12px",
                border: booking.date === d.value ? "3px solid #1d4ed8" : "2px solid #e5e7eb",
                background: booking.date === d.value ? "#dbeafe" : d.isWeekend ? "#fef3c7" : "white",
                color: booking.date === d.value ? "#1d4ed8" : d.isWeekend ? "#92400e" : "#374151",
                fontSize: "17px",
                fontWeight: booking.date === d.value ? "800" : "500",
                textAlign: "center",
                cursor: "pointer",
              }}
              aria-pressed={booking.date === d.value}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* 시간 선택 */}
      <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <span style={{ fontSize: "32px" }}>🕐</span>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>출발 시간 선택</div>
            <div style={{ fontSize: "15px", color: "#6b7280" }}>몇 시에 출발하시나요?</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          {TIMES.map((t) => (
            <button
              key={t}
              onClick={() => update({ time: t })}
              style={{
                padding: "14px 8px",
                borderRadius: "12px",
                border: booking.time === t ? "3px solid #1d4ed8" : "2px solid #e5e7eb",
                background: booking.time === t ? "#dbeafe" : "white",
                color: booking.time === t ? "#1d4ed8" : "#374151",
                fontSize: "18px",
                fontWeight: booking.time === t ? "800" : "500",
                cursor: "pointer",
              }}
              aria-pressed={booking.time === t}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 선택 요약 */}
      {booking.date && booking.time && (
        <div style={{ background: "#fef9c3", borderRadius: "14px", padding: "16px", marginBottom: "20px", fontSize: "18px", textAlign: "center", fontWeight: "600", color: "#854d0e" }}>
          📅 {booking.date.replace(/-/g, "년 ").replace("-", "월 ") + "일"} {booking.time} 출발
        </div>
      )}

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={onPrev}
          style={{
            flex: 1,
            padding: "18px",
            borderRadius: "16px",
            border: "2px solid #d1d5db",
            background: "white",
            color: "#374151",
            fontSize: "20px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          ← 이전
        </button>
        <button
          onClick={onNext}
          disabled={!canNext}
          style={{
            flex: 2,
            padding: "18px",
            borderRadius: "16px",
            border: "none",
            background: canNext ? "#1d4ed8" : "#d1d5db",
            color: canNext ? "white" : "#9ca3af",
            fontSize: "20px",
            fontWeight: "800",
            cursor: canNext ? "pointer" : "not-allowed",
            boxShadow: canNext ? "0 4px 16px rgba(29,78,216,0.35)" : "none",
          }}
        >
          {canNext ? "다음 단계 → (좌석 선택)" : "날짜와 시간을 선택해주세요"}
        </button>
      </div>
    </div>
  );
}
