"use client";

import { useState } from "react";
import { BookingData } from "@/app/page";
import { REGION_GROUPS, ROUTE_MAP } from "@/lib/routes";

type Props = {
  booking: BookingData;
  update: (data: Partial<BookingData>) => void;
  onNext: () => void;
};

function RegionPicker({
  title,
  selectedCity,
  availableCities,
  onSelect,
  showAll,
}: {
  title: string;
  selectedCity: string;
  availableCities: string[] | null; // null = 모두 선택 가능
  onSelect: (city: string) => void;
  showAll: boolean;
}) {
  const [openRegion, setOpenRegion] = useState<string | null>(null);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {REGION_GROUPS.map((region) => {
          const isOpen = openRegion === region.label;
          const hasSelection = region.cities.includes(selectedCity);

          // 이 지역에서 선택 가능한 도시 수
          const availableInRegion = availableCities
            ? region.cities.filter((c) => availableCities.includes(c))
            : region.cities;

          if (!showAll && availableCities && availableInRegion.length === 0) {
            return null; // 갈 수 없는 지역은 숨김
          }

          return (
            <div key={region.label}>
              {/* 지역 버튼 */}
              <button
                onClick={() => setOpenRegion(isOpen ? null : region.label)}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  borderRadius: isOpen ? "14px 14px 0 0" : "14px",
                  border: hasSelection
                    ? "3px solid #1d4ed8"
                    : isOpen
                    ? "2px solid #93c5fd"
                    : "2px solid #e5e7eb",
                  background: hasSelection ? "#dbeafe" : isOpen ? "#f0f9ff" : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "28px" }}>{region.icon}</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "19px", fontWeight: "800", color: hasSelection ? "#1d4ed8" : "#1a1a1a" }}>
                      {region.label}
                      {hasSelection && <span style={{ marginLeft: "8px", fontSize: "16px" }}>✅ {selectedCity}</span>}
                    </div>
                    <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "2px" }}>
                      {availableCities
                        ? `${availableInRegion.length}개 노선 운행 중`
                        : `${region.cities.length}개 도시`}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: "20px", color: "#6b7280" }}>{isOpen ? "▲" : "▼"}</span>
              </button>

              {/* 도시 목록 */}
              {isOpen && (
                <div
                  style={{
                    border: "2px solid #93c5fd",
                    borderTop: "none",
                    borderRadius: "0 0 14px 14px",
                    padding: "16px",
                    background: "#f8faff",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px",
                  }}
                >
                  {region.cities.map((city) => {
                    const isAvailable = availableCities ? availableCities.includes(city) : true;
                    const isSelected = selectedCity === city;
                    return (
                      <button
                        key={city}
                        onClick={() => {
                          if (!isAvailable) return;
                          onSelect(city);
                          setOpenRegion(null);
                        }}
                        disabled={!isAvailable}
                        style={{
                          padding: "12px 6px",
                          borderRadius: "10px",
                          border: isSelected
                            ? "3px solid #1d4ed8"
                            : isAvailable
                            ? "2px solid #d1d5db"
                            : "2px solid #f3f4f6",
                          background: isSelected ? "#1d4ed8" : isAvailable ? "white" : "#f9fafb",
                          color: isSelected ? "white" : isAvailable ? "#374151" : "#d1d5db",
                          fontSize: "15px",
                          fontWeight: isSelected ? "800" : "500",
                          cursor: isAvailable ? "pointer" : "not-allowed",
                          textAlign: "center",
                        }}
                        aria-pressed={isSelected}
                      >
                        {city}
                      </button>
                    );
                  })}
                  {availableCities && availableInRegion.length === 0 && (
                    <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#9ca3af", fontSize: "14px", padding: "8px" }}>
                      이 지역으로 가는 직행 노선이 없어요
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Step1Departure({ booking, update, onNext }: Props) {
  const availableArrivals = booking.departure ? ROUTE_MAP[booking.departure] || [] : null;
  const canNext = !!(booking.departure && booking.arrival);

  const handleDepartureSelect = (city: string) => {
    update({ departure: city, arrival: "" });
  };

  return (
    <div>
      {/* 출발지 */}
      <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <span style={{ fontSize: "32px" }}>🏠</span>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>1️⃣ 출발지 선택</div>
            <div style={{ fontSize: "15px", color: "#6b7280" }}>지역을 누르면 도시 목록이 나와요</div>
          </div>
        </div>
        <RegionPicker
          title="출발지"
          selectedCity={booking.departure}
          availableCities={null}
          onSelect={handleDepartureSelect}
          showAll={true}
        />
      </div>

      {/* 도착지 */}
      <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <span style={{ fontSize: "32px" }}>📍</span>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>2️⃣ 도착지 선택</div>
            <div style={{ fontSize: "15px", color: "#6b7280" }}>
              {booking.departure
                ? `${booking.departure}에서 갈 수 있는 곳만 표시돼요`
                : "출발지를 먼저 선택해주세요"}
            </div>
          </div>
        </div>

        {!booking.departure ? (
          <div style={{ textAlign: "center", padding: "32px", color: "#9ca3af", fontSize: "18px", background: "#f9fafb", borderRadius: "14px" }}>
            ☝️ 위에서 출발지를 먼저 선택해주세요
          </div>
        ) : (
          <RegionPicker
            title="도착지"
            selectedCity={booking.arrival}
            availableCities={availableArrivals}
            onSelect={(city) => update({ arrival: city })}
            showAll={false}
          />
        )}
      </div>

      {/* 노선 요약 */}
      {booking.departure && booking.arrival && (
        <div style={{ background: "#fef9c3", borderRadius: "14px", padding: "18px", marginBottom: "20px", fontSize: "20px", textAlign: "center", fontWeight: "700", color: "#854d0e" }}>
          🚌 {booking.departure} → {booking.arrival}
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!canNext}
        style={{
          width: "100%", padding: "20px", borderRadius: "16px", border: "none",
          background: canNext ? "#1d4ed8" : "#d1d5db",
          color: canNext ? "white" : "#9ca3af",
          fontSize: "22px", fontWeight: "800",
          cursor: canNext ? "pointer" : "not-allowed",
          boxShadow: canNext ? "0 4px 16px rgba(29,78,216,0.35)" : "none",
        }}
      >
        {!booking.departure ? "출발지를 선택해주세요" : !booking.arrival ? "도착지를 선택해주세요" : "다음 단계로 → (날짜 선택)"}
      </button>
    </div>
  );
}
