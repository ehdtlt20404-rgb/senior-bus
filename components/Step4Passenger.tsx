"use client";

import { BookingData } from "@/app/page";

type Props = {
  booking: BookingData;
  update: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function Step4Passenger({ booking, update, onNext, onPrev }: Props) {
  const isValidPhone = /^01[0-9]-?\d{3,4}-?\d{4}$/.test(booking.passengerPhone.replace(/-/g, ""));
  const canNext = booking.passengerName.trim().length >= 2 && isValidPhone;

  const formatPhone = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 11);
    if (nums.length <= 3) return nums;
    if (nums.length <= 7) return `${nums.slice(0, 3)}-${nums.slice(3)}`;
    return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7)}`;
  };

  return (
    <div>
      <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <span style={{ fontSize: "32px" }}>👤</span>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>탑승자 정보</div>
            <div style={{ fontSize: "15px", color: "#6b7280" }}>예약자의 이름과 연락처를 입력해주세요</div>
          </div>
        </div>

        {/* 이름 */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "19px", fontWeight: "700", color: "#1a1a1a", marginBottom: "10px" }}>
            📝 이름 (실명을 입력해주세요)
          </label>
          <input
            type="text"
            value={booking.passengerName}
            onChange={(e) => update({ passengerName: e.target.value })}
            placeholder="예) 홍길동"
            style={{
              width: "100%",
              padding: "16px 20px",
              borderRadius: "12px",
              border: booking.passengerName.trim().length >= 2
                ? "2px solid #22c55e"
                : "2px solid #d1d5db",
              fontSize: "22px",
              color: "#1a1a1a",
              outline: "none",
              background: "white",
            }}
            aria-label="이름 입력"
          />
          {booking.passengerName.trim().length >= 2 && (
            <div style={{ color: "#16a34a", fontSize: "15px", marginTop: "6px", fontWeight: "600" }}>
              ✅ 이름이 입력되었어요
            </div>
          )}
        </div>

        {/* 전화번호 */}
        <div>
          <label style={{ display: "block", fontSize: "19px", fontWeight: "700", color: "#1a1a1a", marginBottom: "10px" }}>
            📱 휴대폰 번호
          </label>
          <input
            type="tel"
            value={booking.passengerPhone}
            onChange={(e) => update({ passengerPhone: formatPhone(e.target.value) })}
            placeholder="예) 010-1234-5678"
            style={{
              width: "100%",
              padding: "16px 20px",
              borderRadius: "12px",
              border: isValidPhone
                ? "2px solid #22c55e"
                : booking.passengerPhone.length > 0
                ? "2px solid #f97316"
                : "2px solid #d1d5db",
              fontSize: "22px",
              color: "#1a1a1a",
              outline: "none",
              background: "white",
            }}
            aria-label="휴대폰 번호 입력"
          />
          {isValidPhone && (
            <div style={{ color: "#16a34a", fontSize: "15px", marginTop: "6px", fontWeight: "600" }}>
              ✅ 올바른 번호 형식이에요
            </div>
          )}
          {!isValidPhone && booking.passengerPhone.length > 0 && (
            <div style={{ color: "#ea580c", fontSize: "15px", marginTop: "6px", fontWeight: "600" }}>
              ⚠️ 010-0000-0000 형식으로 입력해주세요
            </div>
          )}
        </div>
      </div>

      {/* 개인정보 안내 */}
      <div style={{ background: "#f0fdf4", borderRadius: "14px", padding: "16px", marginBottom: "20px", border: "1px solid #bbf7d0" }}>
        <div style={{ fontSize: "16px", color: "#166534", fontWeight: "600", marginBottom: "6px" }}>
          🔒 개인정보 안내
        </div>
        <div style={{ fontSize: "14px", color: "#4b7a60", lineHeight: "1.6" }}>
          입력하신 정보는 버스 예약 확인 목적으로만 사용되며, 예약 완료 후 즉시 삭제됩니다.
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
          {canNext ? "예약 내용 확인 →" : "이름과 번호를 입력해주세요"}
        </button>
      </div>
    </div>
  );
}
