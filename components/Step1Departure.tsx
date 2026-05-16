"use client";

import { BookingData } from "@/app/page";
import { ALL_CITIES, ROUTE_MAP } from "@/lib/routes";

type Props = {
  booking: BookingData;
  update: (data: Partial<BookingData>) => void;
  onNext: () => void;
};

function CityButton({
  label,
  selected,
  disabled,
  onClick,
}: {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "14px 8px",
        borderRadius: "12px",
        border: selected
          ? "3px solid #1d4ed8"
          : disabled
          ? "2px solid #f3f4f6"
          : "2px solid #d1d5db",
        background: selected
          ? "#dbeafe"
          : disabled
          ? "#f9fafb"
          : "white",
        color: selected ? "#1d4ed8" : disabled ? "#d1d5db" : "#374151",
        fontSize: "15px",
        fontWeight: selected ? "700" : "500",
        textAlign: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: selected ? "0 0 0 3px rgba(29,78,216,0.15)" : "none",
        transition: "all 0.15s",
      }}
      aria-pressed={selected}
      aria-disabled={disabled}
    >
      {label}
    </button>
  );
}

export default function Step1Departure({ booking, update, onNext }: Props) {
  const availableArrivals = booking.departure ? ROUTE_MAP[booking.departure] || [] : [];
  const canNext = booking.departure && booking.arrival;

  const handleDepartureSelect = (city: string) => {
    // 출발지 바꾸면 도착지 초기화
    update({ departure: city, arrival: "" });
  };

  return (
    <div>
      {/* 출발지 */}
      <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {ALL_CITIES.map((city) => (
            <CityButton
              key={city}
              label={city}
              selected={booking.departure === city}
              onClick={() => handleDepartureSelect(city)}
            />
          ))}
        </div>
      </div>

      {/* 도착지 */}
      <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <span style={{ fontSize: "32px" }}>📍</span>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>도착지 선택</div>
            <div style={{ fontSize: "15px", color: "#6b7280" }}>
              {booking.departure
                ? `${booking.departure}에서 갈 수 있는 곳만 표시됩니다`
                : "먼저 출발지를 선택해주세요"}
            </div>
          </div>
        </div>

        {!booking.departure && (
          <div style={{ textAlign: "center", padding: "32px 16px", color: "#9ca3af", fontSize: "17px" }}>
            ☝️ 위에서 출발지를 먼저 선택해주세요
          </div>
        )}

        {booking.departure && (
          <>
            {booking.arrival && (
              <div style={{ background: "#dcfce7", borderRadius: "10px", padding: "12px 16px", marginBottom: "14px", fontSize: "18px", fontWeight: "700", color: "#16a34a" }}>
                ✅ 선택됨: {booking.arrival}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              {ALL_CITIES.map((city) => {
                const isAvailable = availableArrivals.includes(city);
                const isSelected = booking.arrival === city;
                return (
                  <CityButton
                    key={city}
                    label={city}
                    selected={isSelected}
                    disabled={!isAvailable}
                    onClick={() => isAvailable && update({ arrival: city })}
                  />
                );
              })}
            </div>

            <div style={{ marginTop: "14px", fontSize: "13px", color: "#9ca3af", textAlign: "center" }}>
              회색 버튼은 {booking.departure}에서 직행으로 갈 수 없는 곳이에요
            </div>
          </>
        )}
      </div>

      {/* 노선 요약 */}
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
        {!booking.departure
          ? "출발지를 선택해주세요"
          : !booking.arrival
          ? "도착지를 선택해주세요"
          : "다음 단계로 → (날짜 선택)"}
      </button>
    </div>
  );
}
