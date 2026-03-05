import { useState } from "react";

const CAR_DATA = {
  아반떼: {
    engineOil: { cost: 60000, kmCycle: 15000, yearCycle: 1 },
    airFilter: { cost: 17000, kmCycle: 20000, yearCycle: 3 },
    cabinFilter: { cost: 12000, kmCycle: 10000, yearCycle: 1 },
    sparkPlug: { cost: 100000, kmCycle: 100000, yearCycle: 8 },
    brakePadFront: { cost: 100000, kmCycle: 45000, yearCycle: 6 },
    brakePadRear: { cost: 85000, kmCycle: 55000, yearCycle: 7 },
    brakeFluid: { cost: 25000, kmCycle: 40000, yearCycle: 2 },
    coolant: { cost: 40000, kmCycle: 60000, yearCycle: 4 },
    tire: { cost: 800000, kmCycle: 50000, yearCycle: 5 },
    battery: { cost: 125000, kmCycle: 60000, yearCycle: 4 },
    missionOil: { cost: 125000, kmCycle: 70000, yearCycle: 6 },
    wiper: { cost: 20000, kmCycle: 99999, yearCycle: 1 },
  },
  스포티지: {
    engineOil: { cost: 75000, kmCycle: 15000, yearCycle: 1 },
    airFilter: { cost: 25000, kmCycle: 20000, yearCycle: 3 },
    cabinFilter: { cost: 17000, kmCycle: 10000, yearCycle: 1 },
    sparkPlug: { cost: 125000, kmCycle: 100000, yearCycle: 8 },
    brakePadFront: { cost: 125000, kmCycle: 45000, yearCycle: 6 },
    brakePadRear: { cost: 100000, kmCycle: 55000, yearCycle: 7 },
    brakeFluid: { cost: 25000, kmCycle: 40000, yearCycle: 2 },
    coolant: { cost: 40000, kmCycle: 60000, yearCycle: 4 },
    tire: { cost: 1100000, kmCycle: 50000, yearCycle: 5 },
    battery: { cost: 150000, kmCycle: 60000, yearCycle: 4 },
    missionOil: { cost: 150000, kmCycle: 70000, yearCycle: 6 },
    wiper: { cost: 25000, kmCycle: 99999, yearCycle: 1 },
  },
  일반세단: {
    engineOil: { cost: 60000, kmCycle: 10000, yearCycle: 1 },
    airFilter: { cost: 17000, kmCycle: 15000, yearCycle: 3 },
    cabinFilter: { cost: 12000, kmCycle: 10000, yearCycle: 1 },
    sparkPlug: { cost: 80000, kmCycle: 40000, yearCycle: 5 },
    brakePadFront: { cost: 90000, kmCycle: 40000, yearCycle: 5 },
    brakePadRear: { cost: 75000, kmCycle: 50000, yearCycle: 6 },
    brakeFluid: { cost: 25000, kmCycle: 40000, yearCycle: 2 },
    coolant: { cost: 35000, kmCycle: 50000, yearCycle: 3 },
    tire: { cost: 700000, kmCycle: 45000, yearCycle: 5 },
    battery: { cost: 110000, kmCycle: 60000, yearCycle: 4 },
    missionOil: { cost: 100000, kmCycle: 60000, yearCycle: 6 },
    wiper: { cost: 18000, kmCycle: 99999, yearCycle: 1 },
  },
  일반SUV: {
    engineOil: { cost: 75000, kmCycle: 10000, yearCycle: 1 },
    airFilter: { cost: 22000, kmCycle: 15000, yearCycle: 3 },
    cabinFilter: { cost: 15000, kmCycle: 10000, yearCycle: 1 },
    sparkPlug: { cost: 100000, kmCycle: 40000, yearCycle: 5 },
    brakePadFront: { cost: 110000, kmCycle: 40000, yearCycle: 5 },
    brakePadRear: { cost: 90000, kmCycle: 50000, yearCycle: 6 },
    brakeFluid: { cost: 25000, kmCycle: 40000, yearCycle: 2 },
    coolant: { cost: 40000, kmCycle: 50000, yearCycle: 3 },
    tire: { cost: 1000000, kmCycle: 45000, yearCycle: 5 },
    battery: { cost: 140000, kmCycle: 60000, yearCycle: 4 },
    missionOil: { cost: 130000, kmCycle: 60000, yearCycle: 6 },
    wiper: { cost: 22000, kmCycle: 99999, yearCycle: 1 },
  },
};

const PART_NAMES = {
  engineOil: "엔진오일",
  airFilter: "에어 필터",
  cabinFilter: "에어컨 필터",
  sparkPlug: "점화플러그",
  brakePadFront: "브레이크 패드 (전)",
  brakePadRear: "브레이크 패드 (후)",
  brakeFluid: "브레이크 오일",
  coolant: "냉각수",
  tire: "타이어 (4개)",
  battery: "배터리",
  missionOil: "미션오일",
  wiper: "와이퍼",
};

const PART_ICONS = {
  engineOil: "🛢️", airFilter: "💨", cabinFilter: "🌬️", sparkPlug: "⚡",
  brakePadFront: "🛑", brakePadRear: "🛑", brakeFluid: "💧", coolant: "🌡️",
  tire: "🔵", battery: "🔋", missionOil: "⚙️", wiper: "🌧️",
};

const currentYear = new Date().getFullYear();

function calcNeedAtPurchase(part, carAge, km) {
  const kmOver = km >= part.kmCycle * 0.9;
  const yearOver = carAge >= part.yearCycle * 0.9;
  return kmOver || yearOver;
}

function calcCountIn3Years(part, currentKm, carAge, annualKm) {
  let count = 0;
  for (let m = 1; m <= 36; m++) {
    const km = currentKm + (annualKm / 12) * m;
    const age = carAge + m / 12;
    const kmCycles = Math.floor(km / part.kmCycle);
    const yearCycles = Math.floor(age / part.yearCycle);
    const prevKm = currentKm + (annualKm / 12) * (m - 1);
    const prevAge = carAge + (m - 1) / 12;
    const prevKmCycles = Math.floor(prevKm / part.kmCycle);
    const prevYearCycles = Math.floor(prevAge / part.yearCycle);
    if (kmCycles > prevKmCycles || yearCycles > prevYearCycles) count++;
  }
  return count;
}

export default function App() {
  const [carType, setCarType] = useState("아반떼");
  const [year, setYear] = useState(2020);
  const [km, setKm] = useState(50000);
  const [annualKm, setAnnualKm] = useState(15000);
  const [result, setResult] = useState(null);
  const [tab, setTab] = useState("purchase");

  const calculate = () => {
    const carAge = currentYear - year;
    const parts = CAR_DATA[carType];
    const purchaseItems = [];
    const futureItems = [];
    let purchaseTotal = 0;
    let futureTotal = 0;

    Object.entries(parts).forEach(([key, part]) => {
      const needNow = calcNeedAtPurchase(part, carAge, km);
      const futureCount = calcCountIn3Years(part, needNow ? 0 : km % part.kmCycle || km, carAge, annualKm);

      if (needNow) {
        purchaseItems.push({ key, cost: part.cost, reason: getOverReason(part, carAge, km), kmCycle: part.kmCycle, yearCycle: part.yearCycle });
        purchaseTotal += part.cost;
      }
      if (futureCount > 0) {
        futureItems.push({ key, count: futureCount, cost: part.cost * futureCount, unitCost: part.cost, kmCycle: part.kmCycle, yearCycle: part.yearCycle });
        futureTotal += part.cost * futureCount;
      }
    });

    setResult({ purchaseItems, futureItems, purchaseTotal, futureTotal, carAge });
    setTab("purchase");
  };

  const getOverReason = (part, carAge, km) => {
    const kmOver = km >= part.kmCycle * 0.9;
    const yearOver = carAge >= part.yearCycle * 0.9;
    if (kmOver && yearOver) return "주행거리·연식 초과";
    if (kmOver) return `주행거리 기준 초과`;
    return `연식 기준 초과`;
  };

  const fmt = (n) => n.toLocaleString() + "원";

  return (
    <div style={{ fontFamily: "'Apple SD Gothic Neo', sans-serif", background: "#f0f4f8", minHeight: "100vh", padding: "0 0 40px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a73e8, #0d47a1)", padding: "28px 20px 22px", color: "#fff" }}>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>🚗 중고차 소모품 계산기</div>
        <div style={{ fontSize: 13, opacity: 0.85 }}>구매 시 + 향후 3년간 예상 비용 분석</div>
      </div>

      {/* Input Card */}
      <div style={{ margin: "16px 16px 0", background: "#fff", borderRadius: 16, padding: "20px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: "#333" }}>차량 정보 입력</div>

        <Label>차종</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
          {Object.keys(CAR_DATA).map(c => (
            <button key={c} onClick={() => setCarType(c)}
              style={{ padding: "10px 0", borderRadius: 10, border: carType === c ? "2px solid #1a73e8" : "2px solid #e0e0e0",
                background: carType === c ? "#e8f0fe" : "#fafafa", color: carType === c ? "#1a73e8" : "#555",
                fontWeight: carType === c ? 700 : 400, fontSize: 14, cursor: "pointer" }}>
              {c}
            </button>
          ))}
        </div>

        <Label>연식</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <input type="range" min={2005} max={currentYear} value={year} onChange={e => setYear(+e.target.value)}
            style={{ flex: 1, accentColor: "#1a73e8" }} />
          <span style={{ fontWeight: 700, color: "#1a73e8", minWidth: 50, textAlign: "right" }}>{year}년</span>
        </div>

        <Label>현재 주행거리</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <input type="range" min={0} max={200000} step={1000} value={km} onChange={e => setKm(+e.target.value)}
            style={{ flex: 1, accentColor: "#1a73e8" }} />
          <span style={{ fontWeight: 700, color: "#1a73e8", minWidth: 70, textAlign: "right" }}>{(km/10000).toFixed(1)}만km</span>
        </div>

        <Label>연간 예상 주행거리</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <input type="range" min={5000} max={50000} step={1000} value={annualKm} onChange={e => setAnnualKm(+e.target.value)}
            style={{ flex: 1, accentColor: "#1a73e8" }} />
          <span style={{ fontWeight: 700, color: "#1a73e8", minWidth: 70, textAlign: "right" }}>{(annualKm/10000).toFixed(1)}만km</span>
        </div>

        <button onClick={calculate}
          style={{ width: "100%", padding: "14px 0", background: "linear-gradient(135deg, #1a73e8, #0d47a1)",
            color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>
          비용 계산하기 🔍
        </button>
      </div>

      {/* Result */}
      {result && (
        <div style={{ margin: "16px 16px 0" }}>
          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
            <SummaryCard label="구매 즉시" value={fmt(result.purchaseTotal)} color="#e53935" sub={`${result.purchaseItems.length}개 항목`} />
            <SummaryCard label="3년 예상" value={fmt(result.futureTotal)} color="#1a73e8" sub={`${result.futureItems.length}개 항목`} />
            <SummaryCard label="총 합계" value={fmt(result.purchaseTotal + result.futureTotal)} color="#2e7d32" sub="전체 예상" />
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", background: "#e8eaf6", borderRadius: 10, padding: 4, marginBottom: 12 }}>
            {[["purchase", `구매 즉시 (${result.purchaseItems.length})`], ["future", `향후 3년 (${result.futureItems.length})`]].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)}
                style={{ flex: 1, padding: "9px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: tab === id ? 700 : 400,
                  background: tab === id ? "#fff" : "transparent", color: tab === id ? "#1a73e8" : "#777",
                  boxShadow: tab === id ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.2s" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Item List */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "8px 0", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            {tab === "purchase" && (
              result.purchaseItems.length === 0
                ? <EmptyMsg text="즉시 교체 필요한 소모품이 없습니다 👍" />
                : result.purchaseItems.map(item => (
                  <ItemRow key={item.key}
                    icon={PART_ICONS[item.key]}
                    name={PART_NAMES[item.key]}
                    sub={item.reason}
                    cost={fmt(item.cost)}
                    badge="교체 필요"
                    badgeColor="#e53935"
                    kmCycle={item.kmCycle}
                    yearCycle={item.yearCycle} />
                ))
            )}
            {tab === "future" && (
              result.futureItems.length === 0
                ? <EmptyMsg text="3년 내 예정된 소모품 교체가 없습니다 👍" />
                : result.futureItems.map(item => (
                  <ItemRow key={item.key}
                    icon={PART_ICONS[item.key]}
                    name={PART_NAMES[item.key]}
                    sub={`${item.count}회 교체 예정`}
                    cost={fmt(item.cost)}
                    badge={`×${item.count}`}
                    badgeColor="#1a73e8"
                    kmCycle={item.kmCycle}
                    yearCycle={item.yearCycle}
                    unitCost={item.unitCost} />
                ))
            )}
          </div>

          <div style={{ fontSize: 11, color: "#999", textAlign: "center", marginTop: 10, lineHeight: 1.6 }}>
            ※ 공임비 포함 평균 견적 기준 / 실제 비용은 정비소·부품 등급에 따라 다를 수 있습니다
          </div>
        </div>
      )}
    </div>
  );
}

function Label({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6 }}>{children}</div>;
}

function SummaryCard({ label, value, color, sub }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: "12px 8px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
      <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 800, color, marginBottom: 2, wordBreak: "keep-all" }}>{value}</div>
      <div style={{ fontSize: 10, color: "#aaa" }}>{sub}</div>
    </div>
  );
}

function ItemRow({ icon, name, sub, cost, badge, badgeColor, kmCycle, yearCycle, unitCost }) {
  const cycleKm = kmCycle >= 99999 ? "해당없음" : `${(kmCycle / 10000).toFixed(0)}만km`;
  const cycleYear = `${yearCycle}년`;
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "13px 16px", borderBottom: "1px solid #f0f0f0" }}>
      <span style={{ fontSize: 22, marginRight: 12 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#222" }}>{name}</div>
        <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{sub}</div>
        <div style={{ fontSize: 11, color: "#aaa", marginTop: 3 }}>
          교체주기: {cycleKm} · {cycleYear}
          {unitCost != null && <span style={{ marginLeft: 6, color: "#bbb" }}>| 1회 {unitCost.toLocaleString()}원</span>}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ display: "inline-block", background: badgeColor, color: "#fff", fontSize: 10, fontWeight: 700,
          borderRadius: 6, padding: "2px 7px", marginBottom: 4 }}>{badge}</div>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#333" }}>{cost}</div>
      </div>
    </div>
  );
}

function EmptyMsg({ text }) {
  return (
    <div style={{ textAlign: "center", padding: "30px 20px", color: "#aaa", fontSize: 14 }}>{text}</div>
  );
}