type Props = {
  current: number;
  steps: string[];
};

export default function StepIndicator({ current, steps }: Props) {
  return (
    <div>
      {/* 모바일: 간단 표시 */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <span style={{ fontSize: "16px", color: "#6b7280" }}>
          전체 {steps.length}단계 중
        </span>
        <span style={{ fontSize: "20px", fontWeight: "800", color: "#1d4ed8", marginLeft: "8px" }}>
          {current}단계
        </span>
        <span style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a1a", marginLeft: "8px" }}>
          — {steps[current - 1]}
        </span>
      </div>

      {/* 진행 바 */}
      <div style={{ display: "flex", gap: "6px" }}>
        {steps.map((label, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div
              style={{
                height: "10px",
                borderRadius: "99px",
                background: i + 1 <= current ? "#1d4ed8" : "#e5e7eb",
                transition: "background 0.3s",
              }}
            />
            <div
              style={{
                textAlign: "center",
                fontSize: "12px",
                marginTop: "4px",
                color: i + 1 === current ? "#1d4ed8" : "#9ca3af",
                fontWeight: i + 1 === current ? "700" : "400",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
