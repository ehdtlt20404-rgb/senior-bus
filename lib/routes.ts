// 실제 고속버스 노선 기반 출발지→도착지 연결 데이터
// 양방향 노선이므로 A→B 존재하면 B→A도 자동 생성

const ONE_WAY_ROUTES: [string, string[]][] = [
  [
    "서울(강남)",
    [
      "부산", "대구", "울산", "창원", "진주", "경주", "포항", "안동", "구미",
      "광주", "순천", "여수", "목포",
      "대전", "청주", "전주", "익산", "군산",
      "강릉", "속초", "원주", "춘천",
      "천안", "세종", "평택", "오산",
    ],
  ],
  [
    "서울(센트럴)",
    [
      "광주", "순천", "여수", "목포", "나주",
      "전주", "익산", "군산", "정읍",
      "대전",
    ],
  ],
  [
    "인천",
    [
      "부산", "대구", "광주", "대전", "전주", "청주", "울산", "창원",
      "강릉", "춘천",
    ],
  ],
  [
    "수원",
    [
      "부산", "대구", "광주", "대전", "전주", "청주", "울산", "창원", "포항",
      "강릉", "군산", "익산",
    ],
  ],
  [
    "부산",
    [
      "대구", "울산", "창원", "진주", "경주", "포항",
      "광주", "순천", "전주",
      "대전", "청주",
    ],
  ],
  [
    "대구",
    [
      "울산", "창원", "진주", "경주", "포항", "구미", "안동",
      "광주", "전주",
      "대전", "청주",
    ],
  ],
  [
    "광주",
    [
      "순천", "여수", "목포", "나주",
      "전주", "익산", "군산",
      "대전", "청주",
      "부산", "울산",
    ],
  ],
  [
    "대전",
    [
      "청주", "세종",
      "전주", "익산", "군산",
      "강릉", "원주",
      "부산", "울산", "창원",
    ],
  ],
  [
    "전주",
    [
      "익산", "군산", "정읍",
      "순천", "여수", "목포",
      "청주",
      "부산", "울산",
    ],
  ],
  [
    "강릉",
    ["속초", "원주", "춘천"],
  ],
  [
    "청주",
    ["천안", "세종"],
  ],
  [
    "창원",
    ["진주", "울산"],
  ],
];

// 양방향 확장
function buildRouteMap(): Record<string, string[]> {
  const map: Record<string, Set<string>> = {};

  const add = (from: string, to: string) => {
    if (!map[from]) map[from] = new Set();
    if (!map[to]) map[to] = new Set();
    map[from].add(to);
    map[to].add(from);
  };

  for (const [from, tos] of ONE_WAY_ROUTES) {
    for (const to of tos) {
      add(from, to);
    }
  }

  const result: Record<string, string[]> = {};
  for (const [city, set] of Object.entries(map)) {
    result[city] = Array.from(set).sort();
  }
  return result;
}

export const ROUTE_MAP: Record<string, string[]> = buildRouteMap();

// 모든 도시 목록 (알파벳/가나다 순)
export const ALL_CITIES = Object.keys(ROUTE_MAP).sort();
