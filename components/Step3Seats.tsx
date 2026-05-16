"use client";

import { BookingData } from "@/app/page";

type Props = {
  booking: BookingData;
  update: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
};

const SEAT_TYPES = [
  {
    id: "일반",
    label: "일반석",
    icon: "🪑",
    desc: "보통 버스 좌석이에요",
    price: "약 18,000원~",
    color: "#f0f9ff",
    border: "#93c5fd",
  },
  {
    id: "우등",
    label: "우등석",
    icon: "🛋️",
    desc: "넓고 편안한 좌석이에요",
    price: "약 26,000원~",
    color: "#fdf4ff",
    border: "#d8b4fe",
  },
  {
    id: "프리미엄",
    label: "프리미엄석",
    icon: "⭐",
    desc: "가장 넓고 편안한 좌석이에요",
    price: "약 35,000원~",
    color: "#fffbeb",
    border: "#fcd34d",
  },
];

export default function Step3Seats({ booking, update, onNext, onPrev }: Props) {
  const canNext = booking.seatCount > 0 && booking.seatType;

  return (
    <div>
      {/* 좌석 종류 */}
      <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <span style={{ fontSize: "32px" }}>🪑</span>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>좌석 종류 선택</div>
            <div style={{ fontSize: "15px", color: "#6b7280" }}>어떤 좌석을 원하시나요?</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {SEAT_TYPES.map((seat) => (
            <button
              key={seat.id}
              onClick={() => update({ seatType: seat.id })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "18px 20px",
                borderRadius: "16px",
                border: booking.seatType === seat.id ? "3px solid #1d4ed8" : `2px solid ${seat.border}`,
                background: booking.seatType === seat.id ? "#dbeafe" : seat.color,
                cursor: "pointer",
                textAlign: "left",
                boxShadow: booking.seatType === seat.id ? "0 0 0 4px rgba(29,78,216,0.12)" : "none",
                transition: "all 0.15s",
              }}
              aria-pressed={booking.seatType === seat.id}
            >
              <span style={{ fontSize: "36px" }}>{seat.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "20px", fontWeight: "700", color: booking.seatType === seat.id ? "#1d4ed8" : "#1a1a1a" }}>
                  {seat.label}
                  {booking.seatType === seat.id && " ✅"}
                </div>
                <div style={{ fontSize: "15px", color: "#6b7280", marginTop: "3px" }}>{seat.desc}</div>
              </div>
              <div style={{ fontSize: "16px", fontWeight: "600", color: "#374151", whiteSpace: "nowrap" }}>
                {seat.price}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 좌석 수 */}
      <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <span style={{ fontSize: "32px" }}>👥</span>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>인원 선택</div>
            <div style={{ fontSize: "15px", color: "#6b7280" }}>몇 명이 타실 건가요?</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px" }}>
          <button
            onClick={() => update({ seatCount: Math.max(1, booking.seatCount - 1) })}
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: "2px solid #d1d5db",
              background: "white",
              fontSize: "32px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#374151",
            }}
            aria-label="인원 줄이기"
          >
            −
          </button>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "56px", fontWeight: "900", color: "#1d4ed8", lineHeight: 1 }}>
              {booking.seatCount}
            </div>
            <div style={{ fontSize: "18px", color: "#6b7280", marginTop: "4px" }}>명</div>
          </div>

          <button
            onClick={() => update({ seatCount: Math.min(9, booking.seatCount + 1) })}
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: "none",
              background: "#1d4ed8",
              fontSize: "32px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: "0 4px 12px rgba(29,78,216,0.3)",
            }}
            aria-label="인원 늘리기"
          >
            +
          </button>
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
          다음 단계 → (탑승자 정보)
        </button>
      </div>
    </div>
  );
}
