"use client";

import { useState } from "react";
import { BookingData } from "@/app/page";

type Props = {
  booking: BookingData;
  onPrev: () => void;
  onReset: () => void;
};

export default function Step5Confirm({ booking, onPrev, onReset }: Props) {
  const [confirmed, setConfirmed] = useState(false);
  const [reservationNo] = useState(
    () => "BUS" + String(Math.floor(Math.random() * 9000000 + 1000000))
  );

  const formatDate = (d: string) => {
    if (!d) return "";
    const [y, m, day] = d.split("-");
    return `${y}년 ${m}월 ${day}일`;
  };

  const rows = [
    { label: "🚌 노선", value: `${booking.departure} → ${booking.arrival}` },
    { label: "📅 날짜", value: formatDate(booking.date) },
    { label: "🕐 출발 시간", value: booking.time },
    { label: "🪑 좌석 종류", value: `${booking.seatType}석` },
    { label: "👥 인원", value: `${booking.seatCount}명` },
    { label: "👤 탑승자", value: booking.passengerName },
    { label: "📱 연락처", value: booking.passengerPhone },
  ];

  if (confirmed) {
    return (
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "40px 24px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
          <div style={{ fontSize: "28px", fontWeight: "900", color: "#16a34a", marginBottom: "10px" }}>
            예약 완료!
          </div>
          <div style={{ fontSize: "18px", color: "#374151", marginBottom: "24px" }}>
            고속버스 예약이 완료되었어요.
          </div>

          <div
            style={{
              background: "#f0fdf4",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "24px",
              border: "2px solid #86efac",
            }}
          >
            <div style={{ fontSize: "16px", color: "#6b7280", marginBottom: "6px" }}>예약 번호</div>
            <div style={{ fontSize: "32px", fontWeight: "900", color: "#16a34a", letterSpacing: "2px" }}>
              {reservationNo}
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>
              이 번호를 기억해두세요 (화면 캡처 또는 메모 권장)
            </div>
          </div>

          <div style={{ background: "#fef9c3", borderRadius: "12px", padding: "16px", fontSize: "15px", color: "#854d0e", lineHeight: 1.7, marginBottom: "24px" }}>
            <strong>📌 출발 30분 전까지 터미널에 도착해주세요</strong><br />
            신분증 또는 예약번호를 창구에 제시하시면 됩니다.
          </div>

          <button
            onClick={onReset}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "16px",
              border: "none",
              background: "#1d4ed8",
              color: "white",
              fontSize: "20px",
              fontWeight: "800",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(29,78,216,0.35)",
            }}
          >
            🏠 처음으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "24px",
          marginBottom: "20px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <span style={{ fontSize: "32px" }}>📋</span>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>예약 내용 확인</div>
            <div style={{ fontSize: "15px", color: "#6b7280" }}>내용을 다시 한 번 확인해주세요</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: i < rows.length - 1 ? "1px solid #f3f4f6" : "none",
                gap: "12px",
              }}
            >
              <div style={{ fontSize: "17px", color: "#6b7280", minWidth: "130px", fontWeight: "600" }}>
                {row.label}
              </div>
              <div style={{ fontSize: "19px", fontWeight: "700", color: "#1a1a1a" }}>
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#fef2f2", borderRadius: "14px", padding: "16px", marginBottom: "20px", border: "1px solid #fca5a5" }}>
        <div style={{ fontSize: "16px", color: "#dc2626", fontWeight: "700", marginBottom: "6px" }}>
          ⚠️ 결제 안내
        </div>
        <div style={{ fontSize: "15px", color: "#7f1d1d", lineHeight: "1.6" }}>
          실제 결제는 터미널 창구 또는 고속버스 앱에서 진행해주세요. 이 서비스는 예약 연습 및 안내용입니다.
        </div>
      </div>

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
          ← 수정하기
        </button>
        <button
          onClick={() => setConfirmed(true)}
          style={{
            flex: 2,
            padding: "18px",
            borderRadius: "16px",
            border: "none",
            background: "#16a34a",
            color: "white",
            fontSize: "20px",
            fontWeight: "800",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(22,163,74,0.35)",
          }}
        >
          ✅ 예약 완료하기
        </button>
      </div>
    </div>
  );
}
