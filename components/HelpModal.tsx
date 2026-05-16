"use client";

type Props = {
  onClose: () => void;
};

const STEPS = [
  {
    num: "1",
    icon: "🏠",
    title: "출발지와 도착지 선택",
    desc: "어디서 출발하고 어디로 갈지 버튼을 눌러서 선택하세요.",
  },
  {
    num: "2",
    icon: "📅",
    title: "날짜와 시간 선택",
    desc: "언제 떠날지 날짜 버튼을 누르고, 몇 시에 출발할지 시간을 선택하세요.",
  },
  {
    num: "3",
    icon: "🪑",
    title: "좌석 선택",
    desc: "일반석, 우등석 중 원하는 좌석을 고르고, 몇 명이 탈지 +/- 버튼으로 선택하세요.",
  },
  {
    num: "4",
    icon: "👤",
    title: "탑승자 정보 입력",
    desc: "이름과 핸드폰 번호를 입력하세요. 초록색 체크가 뜨면 잘 입력된 거예요.",
  },
  {
    num: "5",
    icon: "✅",
    title: "예약 확인",
    desc: "내용을 확인하고 '예약 완료하기' 버튼을 누르면 예약번호가 나와요!",
  },
];

export default function HelpModal({ onClose }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "0",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="도움말"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "24px 24px 0 0",
          padding: "28px 20px 36px",
          width: "100%",
          maxWidth: "720px",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div style={{ fontSize: "24px", fontWeight: "900", color: "#1a1a1a" }}>
            ❓ 예약하는 방법
          </div>
          <button
            onClick={onClose}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "2px solid #e5e7eb",
              background: "white",
              fontSize: "22px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="도움말 닫기"
          >
            ✕
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
          {STEPS.map((step) => (
            <div
              key={step.num}
              style={{
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
                background: "#f8fafc",
                borderRadius: "14px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#1d4ed8",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "800",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a1a", marginBottom: "4px" }}>
                  {step.icon} {step.title}
                </div>
                <div style={{ fontSize: "15px", color: "#4b5563", lineHeight: "1.6" }}>
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fef9c3", borderRadius: "14px", padding: "16px", marginBottom: "20px" }}>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#854d0e", marginBottom: "6px" }}>
            💡 팁
          </div>
          <ul style={{ fontSize: "15px", color: "#713f12", lineHeight: "2", margin: 0, paddingLeft: "18px" }}>
            <li>파란색 버튼을 눌러서 다음 단계로 가세요</li>
            <li>잘못 선택했으면 ← 이전 버튼을 눌러 수정하세요</li>
            <li>초록색 체크 표시가 뜨면 올바르게 입력된 거예요</li>
          </ul>
        </div>

        <button
          onClick={onClose}
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
          알겠어요, 닫기 ✕
        </button>
      </div>
    </div>
  );
}
