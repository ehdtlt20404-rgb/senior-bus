"use client";

import { BookingData } from "@/app/page";

const CITIES = [
  "서울(강남)", "서울(센트럴)", "부산", "대구", "광주", "대전",
  "인천", "수원", "전주", "청주", "창원", "춘천", "강릉", "여수",
  "순천", "목포", "포항", "울산", "제주(항공버스)"
];

type Props = {
  booking: BookingData;
  update: (data: Partial<BookingData>) => void;
  onNext: () => void;
};

function CityButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "14px 10px",
        borderRadius: "12px",
        border: selected ? "3px solid #1d4ed8" : "2px solid #d1d5db",
        background: selected ? "#dbeafe" : "white",
        color: selected ? "#1d4ed8" : "#374151",
        fontSize: "17px",
        fontWeight: selected ? "700" : "500",
        textAlign: "center",
        boxShadow: selected ? "0 0 0 3px rgba(29,78,216,0.15)" : "0 1px 3px rgba(0,0,0,0.08)",
        transition: "all 0.15s",
      }}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}

export default function Step1Departure({ booking, update, onNext }: Props) {
  const canNext = booking.departure && booking.arrival && booking.departure !== booking.arrival;

  return (
    <div>
      {/* 출발지 */}
      <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <span style={{ fontSize: "32px" }}>🏠</span>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>출발지 선택</div>
            <div style={{ fontSize: "15px", color: "#6b7280" }}>어디서 출발하시나요?</div>
          </div>
        </div>

        {booking.departure && (
          <div style={{ background: "#dbeafe", borderRadius: "10px", padding: "12px 16px", marginBottom: "14px", fontSize: "18px", fontWeight: "700", color: "#1d4ed8" }}>
            ✅ 선택됨: {booking.departure}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {CITIES.map((city) => (
            <CityButton
              key={city}
              label={city}
              selected={booking.departure === city}
              onClick={() => update({ departure: city })}
            />
          ))}
        </div>
      </div>

      {/* 도착지 */}
      <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <span style={{ fontSize: "32px" }}>📍</span>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>도착지 선택</div>
            <div style={{ fontSize: "15px", color: "#6b7280" }}>어디로 가시나요?</div>
          </div>
        </div>

        {booking.arrival && (
          <div style={{ background: "#dcfce7", borderRadius: "10px", padding: "12px 16px", marginBottom: "14px", fontSize: "18px", fontWeight: "700", color: "#16a34a" }}>
            ✅ 선택됨: {booking.arrival}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {CITIES.filter((c) => c !== booking.departure).map((city) => (
            <CityButton
              key={city}
              label={city}
              selected={booking.arrival === city}
              onClick={() => update({ arrival: city })}
            />
          ))}
        </div>
      </div>

      {/* 안내 */}
      {booking.departure && booking.arrival && (
        <div style={{ background: "#fef9c3", borderRadius: "14px", padding: "16px", marginBottom: "20px", fontSize: "18px", textAlign: "center", fontWeight: "600", color: "#854d0e" }}>
          🚌 {booking.departure} → {booking.arrival} 노선을 선택했어요!
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!canNext}
        style={{
          width: "100%",
          padding: "20px",
          borderRadius: "16px",
          border: "none",
          background: canNext ? "#1d4ed8" : "#d1d5db",
          color: canNext ? "white" : "#9ca3af",
          fontSize: "22px",
          fontWeight: "800",
          cursor: canNext ? "pointer" : "not-allowed",
          boxShadow: canNext ? "0 4px 16px rgba(29,78,216,0.35)" : "none",
          transition: "all 0.2s",
        }}
      >
        {canNext ? "다음 단계로 → (날짜 선택)" : "출발지와 도착지를 모두 선택해주세요"}
      </button>
    </div>
  );
}
