"use client";

import { BookingData } from "@/app/page";

type Props = {
  booking: BookingData;
  update: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
};

const CARD_BRANDS = [
  { id: "신한", label: "신한카드", color: "#003087", icon: "💳" },
  { id: "삼성", label: "삼성카드", color: "#1428A0", icon: "💳" },
  { id: "현대", label: "현대카드", color: "#1a1a1a", icon: "💳" },
  { id: "KB국민", label: "KB국민카드", color: "#FFBC00", icon: "💳" },
  { id: "롯데", label: "롯데카드", color: "#E60012", icon: "💳" },
  { id: "우리", label: "우리카드", color: "#0068B7", icon: "💳" },
  { id: "하나", label: "하나카드", color: "#009B77", icon: "💳" },
  { id: "NH농협", label: "NH농협카드", color: "#009530", icon: "💳" },
];

function formatCardNumber(v: string) {
  const nums = v.replace(/\D/g, "").slice(0, 16);
  return nums.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(v: string) {
  const nums = v.replace(/\D/g, "").slice(0, 4);
  if (nums.length <= 2) return nums;
  return `${nums.slice(0, 2)}/${nums.slice(2)}`;
}

export default function Step5Payment({ booking, update, onNext, onPrev }: Props) {
  const payment = booking.payment || {};

  const setPayment = (fields: Record<string, string>) => {
    update({ payment: { ...payment, ...fields } });
  };

  const cardNum = payment.cardNumber || "";
  const expiry = payment.expiry || "";
  const cvc = payment.cvc || "";
  const cardName = payment.cardName || "";
  const cardBrand = payment.cardBrand || "";

  const isValidCard = cardNum.replace(/\s/g, "").length === 16;
  const isValidExpiry = /^\d{2}\/\d{2}$/.test(expiry);
  const isValidCvc = /^\d{3,4}$/.test(cvc);
  const isValidName = cardName.trim().length >= 2;
  const canNext = cardBrand && isValidCard && isValidExpiry && isValidCvc && isValidName;

  return (
    <div>
      {/* 카드사 선택 */}
      <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <span style={{ fontSize: "32px" }}>💳</span>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>카드사 선택</div>
            <div style={{ fontSize: "15px", color: "#6b7280" }}>어떤 카드로 결제하시나요?</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
          {CARD_BRANDS.map((card) => (
            <button
              key={card.id}
              onClick={() => setPayment({ cardBrand: card.id })}
              style={{
                padding: "14px 16px",
                borderRadius: "14px",
                border: cardBrand === card.id ? `3px solid ${card.color}` : "2px solid #e5e7eb",
                background: cardBrand === card.id ? card.color : "white",
                color: cardBrand === card.id ? "white" : "#374151",
                fontSize: "17px",
                fontWeight: "700",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: cardBrand === card.id ? `0 4px 12px ${card.color}55` : "none",
              }}
              aria-pressed={cardBrand === card.id}
            >
              <span style={{ fontSize: "24px" }}>{card.icon}</span>
              {card.label}
              {cardBrand === card.id && <span style={{ marginLeft: "auto" }}>✅</span>}
            </button>
          ))}
        </div>
      </div>

      {/* 카드 정보 입력 */}
      <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
          <span style={{ fontSize: "32px" }}>🔢</span>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a" }}>카드 정보 입력</div>
            <div style={{ fontSize: "15px", color: "#6b7280" }}>카드 앞면/뒷면을 보고 입력하세요</div>
          </div>
        </div>

        {/* 카드 번호 */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "#1a1a1a" }}>
            📇 카드 번호 <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: "400" }}>(카드 앞면 긴 번호)</span>
          </label>
          <input
            type="tel"
            inputMode="numeric"
            value={cardNum}
            onChange={(e) => setPayment({ cardNumber: formatCardNumber(e.target.value) })}
            placeholder="0000 0000 0000 0000"
            style={{
              width: "100%", padding: "16px 20px", borderRadius: "12px", fontSize: "22px",
              border: isValidCard ? "2px solid #22c55e" : cardNum.length > 0 ? "2px solid #f97316" : "2px solid #d1d5db",
              outline: "none", letterSpacing: "2px",
            }}
          />
          {isValidCard && <div style={{ color: "#16a34a", fontSize: "14px", marginTop: "6px", fontWeight: "600" }}>✅ 카드 번호 확인됐어요</div>}
        </div>

        {/* 유효기간 + CVC */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "#1a1a1a" }}>
              📅 유효기간
              <span style={{ display: "block", fontSize: "13px", color: "#6b7280", fontWeight: "400" }}>카드 앞면 MM/YY</span>
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={expiry}
              onChange={(e) => setPayment({ expiry: formatExpiry(e.target.value) })}
              placeholder="MM/YY"
              maxLength={5}
              style={{
                width: "100%", padding: "16px 14px", borderRadius: "12px", fontSize: "20px",
                border: isValidExpiry ? "2px solid #22c55e" : expiry.length > 0 ? "2px solid #f97316" : "2px solid #d1d5db",
                outline: "none", textAlign: "center", letterSpacing: "2px",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "#1a1a1a" }}>
              🔒 CVC
              <span style={{ display: "block", fontSize: "13px", color: "#6b7280", fontWeight: "400" }}>카드 뒷면 3~4자리</span>
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={cvc}
              onChange={(e) => setPayment({ cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
              placeholder="000"
              maxLength={4}
              style={{
                width: "100%", padding: "16px 14px", borderRadius: "12px", fontSize: "20px",
                border: isValidCvc ? "2px solid #22c55e" : cvc.length > 0 ? "2px solid #f97316" : "2px solid #d1d5db",
                outline: "none", textAlign: "center", letterSpacing: "4px",
              }}
            />
          </div>
        </div>

        {/* 카드 명의자 */}
        <div>
          <label style={{ display: "block", fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "#1a1a1a" }}>
            👤 카드 명의자 이름
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setPayment({ cardName: e.target.value })}
            placeholder="예) 홍길동"
            style={{
              width: "100%", padding: "16px 20px", borderRadius: "12px", fontSize: "20px",
              border: isValidName ? "2px solid #22c55e" : cardName.length > 0 ? "2px solid #f97316" : "2px solid #d1d5db",
              outline: "none",
            }}
          />
          {isValidName && <div style={{ color: "#16a34a", fontSize: "14px", marginTop: "6px", fontWeight: "600" }}>✅ 이름 확인됐어요</div>}
        </div>
      </div>

      {/* 카드 위치 안내 */}
      <div style={{ background: "#f0f9ff", borderRadius: "16px", padding: "20px", marginBottom: "20px", border: "1px solid #bae6fd" }}>
        <div style={{ fontSize: "17px", fontWeight: "700", color: "#0369a1", marginBottom: "10px" }}>💡 카드 어디를 보면 되나요?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", color: "#0c4a6e" }}>
          <div>📇 <strong>카드 번호</strong> — 카드 앞면 가운데 긴 숫자 16자리</div>
          <div>📅 <strong>유효기간</strong> — 카드 앞면 하단 월/연도 (예: 08/28)</div>
          <div>🔒 <strong>CVC</strong> — 카드 뒷면 서명란 옆 숫자 3자리</div>
        </div>
      </div>

      {/* 보안 안내 */}
      <div style={{ background: "#f0fdf4", borderRadius: "14px", padding: "16px", marginBottom: "20px", border: "1px solid #bbf7d0" }}>
        <div style={{ fontSize: "15px", color: "#166534" }}>
          🔒 <strong>안전한 결제</strong> — 카드 정보는 암호화되어 전송되며 저장되지 않습니다
        </div>
      </div>

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
            background: canNext ? "#16a34a" : "#d1d5db",
            color: canNext ? "white" : "#9ca3af",
            fontSize: "20px", fontWeight: "800",
            cursor: canNext ? "pointer" : "not-allowed",
            boxShadow: canNext ? "0 4px 16px rgba(22,163,74,0.35)" : "none",
          }}
        >
          {canNext ? "결제 및 예약 확인 →" : "카드 정보를 모두 입력해주세요"}
        </button>
      </div>
    </div>
  );
}
