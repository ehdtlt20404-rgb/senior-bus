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
    desc: "4열 배치 (2+2) · 보통 버스 좌석",
    price: "약 18,000원~",
    color: "#f0f9ff",
    border: "#93c5fd",
    cols: 4,
    rows: 11,
    gap: 1, // 통로 위치 (0-indexed, col 0~gap-1 | gap+1~end)
  },
  {
    id: "우등",
    label: "우등석",
    icon: "🛋️",
    desc: "3열 배치 (2+1) · 넓고 편안한 좌석",
    price: "약 26,000원~",
    color: "#fdf4ff",
    border: "#d8b4fe",
    cols: 3,
    rows: 10,
    gap: 1,
  },
  {
    id: "프리미엄",
    label: "프리미엄석",
    icon: "⭐",
    desc: "2열 배치 (1+1) · 가장 넓고 편안한 좌석",
    price: "약 35,000원~",
    color: "#fffbeb",
    border: "#fcd34d",
    cols: 2,
    rows: 9,
    gap: 0,
  },
];

// 임의로 일부 좌석을 '매진'으로 설정
function getSoldSeats(seatType: string): string[] {
  const sold: Record<string, string[]> = {
    일반: ["1A", "1B", "2C", "3A", "4D", "5B", "6A", "6C", "7D", "8B", "9A", "10C"],
    우등: ["1A", "2B", "3C", "4A", "5B", "6C", "7A", "8B"],
    프리미엄: ["1A", "2B", "3A", "4B", "5A"],
  };
  return sold[seatType] || [];
}

function getSeatLabel(row: number, col: number, seatType: string): string {
  const colLabels: Record<string, string[]> = {
    일반: ["A", "B", "C", "D"],
    우등: ["A", "B", "C"],
    프리미엄: ["A", "B"],
  };
  return `${row}${colLabels[seatType]?.[col] ?? col}`;
}

function SeatMap({
  seatType,
  selected,
  onToggle,
}: {
  seatType: string;
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const config = SEAT_TYPES.find((s) => s.id === seatType);
  if (!config) return null;

  const sold = getSoldSeats(seatType);
  const colLabels: Record<string, string[]> = {
    일반: ["A", "B", "", "C", "D"],
    우등: ["A", "B", "", "C"],
    프리미엄: ["A", "", "B"],
  };
  const headerCols = colLabels[seatType] || [];

  return (
    <div>
      {/* 범례 */}
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "16px", flexWrap: "wrap" }}>
        {[
          { color: "#e5e7eb", label: "빈 자리" },
          { color: "#1d4ed8", label: "내가 선택" },
          { color: "#9ca3af", label: "매진" },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: l.color, border: "1px solid #d1d5db" }} />
            <span>{l.label}</span>
          </div>
        ))}
      </div>

      {/* 운전기사 / 앞 표시 */}
      <div style={{ textAlign: "center", marginBottom: "8px", fontSize: "13px", color: "#6b7280" }}>
        <div style={{ display: "inline-block", background: "#f3f4f6", borderRadius: "8px", padding: "6px 24px", border: "1px solid #e5e7eb" }}>
          🚌 앞 (운전기사)
        </div>
      </div>

      {/* 열 헤더 */}
      <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "4px" }}>
        <div style={{ width: "32px" }} />
        {headerCols.map((h, i) => (
          <div key={i} style={{ width: "40px", textAlign: "center", fontSize: "13px", fontWeight: "700", color: h ? "#374151" : "transparent" }}>
            {h || "·"}
          </div>
        ))}
      </div>

      {/* 좌석 행 */}
      {Array.from({ length: config.rows }, (_, rowIdx) => {
        const rowNum = rowIdx + 1;
        const seats =
          seatType === "일반"
            ? [0, 1, null, 2, 3]
            : seatType === "우등"
            ? [0, 1, null, 2]
            : [0, null, 1];

        return (
          <div key={rowNum} style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "6px", alignItems: "center" }}>
            <div style={{ width: "32px", textAlign: "center", fontSize: "13px", color: "#9ca3af", fontWeight: "600" }}>
              {rowNum}
            </div>
            {seats.map((col, i) => {
              if (col === null) {
                return <div key={i} style={{ width: "40px" }} />;
              }
              const seatId = getSeatLabel(rowNum, col, seatType);
              const isSold = sold.includes(seatId);
              const isSelected = selected.includes(seatId);

              return (
                <button
                  key={i}
                  onClick={() => !isSold && onToggle(seatId)}
                  disabled={isSold}
                  title={isSold ? `${seatId} - 매진` : `${seatId} 선택`}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    border: isSelected ? "2px solid #1e40af" : "1px solid #d1d5db",
                    background: isSold ? "#9ca3af" : isSelected ? "#1d4ed8" : "#f9fafb",
                    color: isSelected ? "white" : isSold ? "#6b7280" : "#374151",
                    fontSize: "11px",
                    fontWeight: "700",
                    cursor: isSold ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label={`${seatId} ${isSold ? "매진" : isSelected ? "선택됨" : "선택가능"}`}
                  aria-pressed={isSelected}
                >
                  {seatId}
                </button>
              );
            })}
          </div>
        );
      })}

      <div style={{ textAlign: "center", marginTop: "10px", fontSize: "13px", color: "#6b7280" }}>뒤</div>
    </div>
  );
}

export default function Step3Seats({ booking, update, onNext, onPrev }: Props) {
  const selectedSeats: string[] = booking.selectedSeats || [];
  const needed = booking.seatCount;
  const canNext = booking.seatType && selectedSeats.length === needed;

  const toggleSeat = (id: string) => {
    if (selectedSeats.includes(id)) {
      update({ selectedSeats: selectedSeats.filter((s) => s !== id) });
    } else {
      if (selectedSeats.length >= needed) {
        // 가장 오래된 것 제거 후 추가
        update({ selectedSeats: [...selectedSeats.slice(1), id] });
      } else {
        update({ selectedSeats: [...selectedSeats, id] });
      }
    }
  };

  const handleTypeChange = (type: string) => {
    update({ seatType: type, selectedSeats: [] });
  };

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
              onClick={() => handleTypeChange(seat.id)}
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
              }}
              aria-pressed={booking.seatType === seat.id}
            >
              <span style={{ fontSize: "36px" }}>{seat.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "20px", fontWeight: "700", color: booking.seatType === seat.id ? "#1d4ed8" : "#1a1a1a" }}>
                  {seat.label} {booking.seatType === seat.id && "✅"}
                </div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "3px" }}>{seat.desc}</div>
              </div>
              <div style={{ fontSize: "15px", fontWeight: "600", color: "#374151", whiteSpace: "nowrap" }}>
                {seat.price}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 인원 수 */}
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
            onClick={() => { update({ seatCount: Math.max(1, booking.seatCount - 1), selectedSeats: [] }); }}
            style={{ width: "64px", height: "64px", borderRadius: "50%", border: "2px solid #d1d5db", background: "white", fontSize: "32px", fontWeight: "700", cursor: "pointer", color: "#374151" }}
            aria-label="인원 줄이기"
          >−</button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "56px", fontWeight: "900", color: "#1d4ed8", lineHeight: 1 }}>{booking.seatCount}</div>
            <div style={{ fontSize: "18px", color: "#6b7280", marginTop: "4px" }}>명</div>
          </div>
          <button
            onClick={() => { update({ seatCount: Math.min(9, booking.seatCount + 1), selectedSeats: [] }); }}
            style={{ width: "64px", height: "64px", borderRadius: "50%", border: "none", background: "#1d4ed8", fontSize: "32px", fontWeight: "700", cursor: "pointer", color: "white", boxShadow: "0 4px 12px rgba(29,78,216,0.3)" }}
            aria-label="인원 늘리기"
          >+</button>
        </div>
      </div>

      {/* 좌석 배치도 */}
      {booking.seatType && (
        <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <span style={{ fontSize: "32px" }}>🗺️</span>
            <div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>자리 선택</div>
              <div style={{ fontSize: "15px", color: "#6b7280" }}>
                원하는 자리를 눌러서 선택하세요
                <span style={{ marginLeft: "8px", color: "#1d4ed8", fontWeight: "700" }}>
                  ({selectedSeats.length}/{needed}자리 선택)
                </span>
              </div>
            </div>
          </div>

          {selectedSeats.length > 0 && (
            <div style={{ background: "#dbeafe", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px", fontSize: "17px", fontWeight: "700", color: "#1d4ed8" }}>
              ✅ 선택된 자리: {selectedSeats.join(", ")}
            </div>
          )}

          <SeatMap
            seatType={booking.seatType}
            selected={selectedSeats}
            onToggle={toggleSeat}
          />
        </div>
      )}

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={onPrev}
          style={{ flex: 1, padding: "18px", borderRadius: "16px", border: "2px solid #d1d5db", background: "white", color: "#374151", fontSize: "20px", fontWeight: "700", cursor: "pointer" }}
        >← 이전</button>
        <button
          onClick={onNext}
          disabled={!canNext}
          style={{
            flex: 2, padding: "18px", borderRadius: "16px", border: "none",
            background: canNext ? "#1d4ed8" : "#d1d5db",
            color: canNext ? "white" : "#9ca3af",
            fontSize: "20px", fontWeight: "800",
            cursor: canNext ? "pointer" : "not-allowed",
            boxShadow: canNext ? "0 4px 16px rgba(29,78,216,0.35)" : "none",
          }}
        >
          {!booking.seatType
            ? "좌석 종류를 선택해주세요"
            : selectedSeats.length < needed
            ? `자리를 ${needed - selectedSeats.length}개 더 선택해주세요`
            : "다음 단계 → (탑승자 정보)"}
        </button>
      </div>
    </div>
  );
}
