"use client";

import { useState } from "react";
import StepIndicator from "@/components/StepIndicator";
import Step1Departure from "@/components/Step1Departure";
import Step2Date from "@/components/Step2Date";
import Step3Seats from "@/components/Step3Seats";
import Step4Passenger from "@/components/Step4Passenger";
import Step5Confirm from "@/components/Step5Confirm";
import HelpModal from "@/components/HelpModal";

export type BookingData = {
  departure: string;
  arrival: string;
  date: string;
  time: string;
  seatCount: number;
  seatType: string;
  passengerName: string;
  passengerPhone: string;
};

const STEPS = ["출발지/도착지", "날짜/시간", "좌석 선택", "탑승자 정보", "예약 확인"];

export default function Home() {
  const [step, setStep] = useState(1);
  const [showHelp, setShowHelp] = useState(false);
  const [booking, setBooking] = useState<BookingData>({
    departure: "",
    arrival: "",
    date: "",
    time: "",
    seatCount: 1,
    seatType: "일반",
    passengerName: "",
    passengerPhone: "",
  });

  const updateBooking = (data: Partial<BookingData>) => {
    setBooking((prev) => ({ ...prev, ...data }));
  };

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const prev = () => setStep((s) => Math.max(s - 1, 1));
  const reset = () => {
    setStep(1);
    setBooking({
      departure: "",
      arrival: "",
      date: "",
      time: "",
      seatCount: 1,
      seatType: "일반",
      passengerName: "",
      passengerPhone: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f0f4ff" }}>
      {/* 헤더 */}
      <header style={{ background: "#1d4ed8", color: "white", padding: "16px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "28px", fontWeight: "900" }}>
              🚌 쉬운 버스 예약
            </div>
            <div style={{ fontSize: "15px", opacity: 0.85, marginTop: "2px" }}>
              누구나 쉽게 고속버스를 예약할 수 있어요
            </div>
          </div>
          <button
            onClick={() => setShowHelp(true)}
            style={{
              background: "white",
              color: "#1d4ed8",
              border: "none",
              borderRadius: "12px",
              padding: "10px 18px",
              fontSize: "17px",
              fontWeight: "700",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
            aria-label="도움말 열기"
          >
            ❓ 도움말
          </button>
        </div>
      </header>

      {/* 단계 표시 */}
      <div style={{ background: "white", borderBottom: "2px solid #e5e7eb", padding: "16px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <StepIndicator current={step} steps={STEPS} />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main style={{ flex: 1, maxWidth: "720px", margin: "0 auto", width: "100%", padding: "24px 16px" }}>
        {step === 1 && <Step1Departure booking={booking} update={updateBooking} onNext={next} />}
        {step === 2 && <Step2Date booking={booking} update={updateBooking} onNext={next} onPrev={prev} />}
        {step === 3 && <Step3Seats booking={booking} update={updateBooking} onNext={next} onPrev={prev} />}
        {step === 4 && <Step4Passenger booking={booking} update={updateBooking} onNext={next} onPrev={prev} />}
        {step === 5 && <Step5Confirm booking={booking} onPrev={prev} onReset={reset} />}
      </main>

      {/* 푸터 */}
      <footer style={{ background: "#1e293b", color: "#94a3b8", textAlign: "center", padding: "20px", fontSize: "15px" }}>
        <p>쉬운 버스 예약 서비스 | 고속버스 예약 안내</p>
        <p style={{ marginTop: "6px", fontSize: "14px" }}>도움이 필요하시면 ❓ 도움말 버튼을 눌러주세요</p>
      </footer>

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
}
