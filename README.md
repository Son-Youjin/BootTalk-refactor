# BootTalk
신뢰할 수 있는 부트캠프 정보를 제공하고, 예비 교육생이 현명한 선택을 내릴 수 있도록 돕는 맞춤형 플랫폼입니다.
<br><br>
## 목차
### [1. 프로젝트 기간](#프로젝트-기간)
### [2. 기술스텍](#기술스텍)
### [3. 주요 기능](#주요-기능)
### [4. 트러블 슈팅](#트러블-슈팅)
### [5. 프로젝트 아키텍처](#프로젝트-아키텍처)
<br><br>
## 프로젝트 기간
📍 2025.03.17 ~ 2025.04.23

- 1주차: 프로젝트 기획, 와이어프레임 제작
- 2주차:
  - 프로젝트 초기 세팅
  - 소셜 회원가입/로그인, 메인페이지, 대시보드 UI 구현 
- 3주차: MSW 설정, Express 서버 구축, 구축, 부트캠프 데이터/리뷰 데이터/사용자 데이터 등 모의 데이터 생성
- 4주차: 메인 페이지 및 리뷰 페이지 기능 구현(필터링, 작성 포함), 마이페이지 기능 구현, 커피챗 페이지 기능 구현
- 5주차: 1:1 채팅, 알림 구현, 관리자 페이지 구현
- 6주차: 백&프론트 연동 및 리팩토링 오류 버그 수정
<br><br>
<br><br>
## 팀원
<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/180407885?v=4" width="100px;" alt=""/><br />
      <b>FE 손유진</b>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/154823788?v=4" width="100px;" alt=""/><br />
      <b>FE 방주영</b>
    </td>
  </tr>
</table>
<br><br>

## 기술스텍
### Front-End
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-4353FF?style=for-the-badge&logo=socket.io&logoColor=white)
![STOMP](https://img.shields.io/badge/STOMP-black?style=for-the-badge&logo=apache-activemq&logoColor=white)
![SSE](https://img.shields.io/badge/SSE-008000?style=for-the-badge)
![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![MSW](https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### Collaboration Tool
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)

<br><br>
## 주요 기능
<table>
  <tr>
    <th align="center">✨ 네이버 회원가입</th>
     <th align="center">✨ 무한스크롤</th>
  </tr>
  <tr>
    <td align="center">
    <img src="https://github.com/user-attachments/assets/6387dac2-6ba6-4887-b7d1-66af0dbdae00" width="60px;" alt="네이버 회원가입"><br />
    </td>
     <td align="center">
      <img src="https://github.com/user-attachments/assets/6ee50777-2b23-4e0d-804a-300782d02561" width="100px;" alt="무한스크롤"><br />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center">✨ 필터링</th>
    <th align="center">✨ 검색</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/640d2cda-3d13-4230-b76e-f010c56cba7a" width="100px;" alt="필터링"><br />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/302c09d1-be19-4f9d-8a69-2e7bc53077b5" width="100px;" alt="검색"><br />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center">✨ 이미지 업로드</th>
    <th align="center">✨ 수료증 업로드</th>
    <th align="center">✨ 리뷰 작성</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/872cb032-5d03-4748-a568-e6f9101a4455" width="100px;" alt="이미지 업로드"><br />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/1ef348d6-d7f9-4b23-a20a-9c69a105ee1c" width="100px;" alt="수료증 업로드"><br />
    </td>
     <td align="center">
      <img src="https://github.com/user-attachments/assets/e00caed7-5d24-44b6-9908-70ac42746850" width="100px;" alt="리뷰 작성"><br />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center">✨ 멘토 찾기</th>
    <th align="center">✨ 멘토 등록</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/1fd0d897-9789-4d4c-a378-418b42611647" width="100px;" alt="멘토 찾기"><br />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/3e1a250c-a25b-4902-982b-94d467683a22" width="100px;" alt="멘토 등록"><br />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center width:50%">✨ 커피챗 신청</th>
    <th align="center width:50%">✨ 실시간 알림</th>
    <th align="center width:50%">✨ 실시간 채팅</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/31a13fdf-5dbc-4be7-b0ac-93275b3d1f31" width="100px;"  alt="커피챗 신청"><br />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/0fa3459e-b607-4371-89e0-c3f583615113" width="100px;" alt="실시간 알림"><br />
    </td>
     <td align="center">
      <img src="https://github.com/user-attachments/assets/b1c93c7d-7ecb-4ea7-bc67-7b691ee6cb86" width="100px;" alt="실시간 채팅"><br />
    </td>

  </tr>
</table>
<table>
  <tr>
    <th align="center width:50%">✨ 커피챗 승인</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/73cf4963-8f77-4d68-b84f-75ee26868695" width="100px;" alt="커피챗 승인"><br />
    </td>
  </tr>
</table>
<br><br>

## 트러블 슈팅

### 1. 필터 선택값이 API에 반영되지 않던 문제

#### **문제 상황** 
필터 버튼 클릭 시 부트캠프 리스트에 반영되지 않고, API 요청 URL에 필터 파라미터가 누락되거나 잘못된 값으로 전달됨.


#### **원인 분석**
- `queryKey`에 `filters`가 정상적으로 반영되지 않거나,
- `queryFn` 내부에서 필터 값을 쿼리스트링으로 변환하는 과정에서 오류 발생.
- 특히 `react-query`의 캐싱 전략과 충돌하여 의도한 fetch가 일어나지 않음.


#### **해결 방법** 
- `filters` 객체를 순회하며 `URLSearchParams`에 key-value 쌍을 append하는 방식으로 수정
```tsx
const queryParams = new URLSearchParams({
  page: page.toString(),
  size: PAGE_SIZE.toString(),
});

Object.entries(filters).forEach(([key, value]) => {
  if (key && value) {
    const transformedValue = transformFilterValue(key, value);
    queryParams.append(key, transformedValue);
  }
});
```
- 각 필터 값은 `transformFilterValue` 함수로 백엔드 요구 포맷에 맞게 변환
```tsx
const transformFilterValue = (key: string, value: string): string => {
  if (key === "duration") {
    const valueMap: Record<string, string> = {
      "4주 미만": "1",
      "4~12주": "2",
      "12주 이상": "3",
    };
    return valueMap[value] || value;
  }

  if (key === "minRating") {
    const valueMap: Record<string, string> = {
      "2점 대": "2",
      "3점 대": "3",
      "4점 대": "4",
    };
    return valueMap[value] || value;
  }

  return value;
};
```
- 최종적으로 `?page=0&size=10&region=서울&duration=2&minRating=3`처럼 여러 필터가 적용된 쿼리스트링을 동적으로 생성하여 정확한 API 요청이 가능하게 개선.
<br><br>

### 2. 무한 요청

#### **문제 상황** 
리뷰 페이지에서 무한 스크롤을 구현했지만, 실제로는 페이지 진입 직후 스크롤 여부와 상관없이 서버에 계속 요청을 보내는 무한 요청 현상이 발생


#### **원인 분석**
- `IntersectionObserver`가 잘못된 위치에 적용되어 있거나, `observerRef`가 DOM에 제대로 연결되지 않아 렌더링되자마자 바로 교차 상태로 판단됨
- 또는 `getNextPageParam` 로직에서 `last` 값 또는 `pageable.pageNumber` 처리 미흡으로 인해 다음 페이지 조건이 무조건 true가 됨


#### **해결 방법** 
```tsx
getNextPageParam: (lastPage) =>
  lastPage.last ? undefined : lastPage.pageable.pageNumber + 1
```
- `IntersectionObserver`는 `observer.observe(target)` 시점을 마지막 요소 렌더 이후로 조정
- `observerRef`가 페이지 로드와 함께 관찰을 시작하지 않도록 `useEffect`에서 `data?.pages.length`를 의존성으로 설정
- 리뷰 요청 단위를 `size=10` → `size=20`으로 조정하여 초기 과요청 문제 감소
<br><br>

### 3. 웹소켓 무한 입장

#### **문제 상황** 
웹소켓 무한 입장 현상 발생. `useWebSocket` 훅 내부에서 `client.publish({ destination: '/app/chat/enter' })`가 반복 실행되며 서버에 과도한 요청이 발생.
```tsx
// ChatRoomPage 컴포넌트 내부

const { sendMessage, connected } = useWebSocket({
  roomUuid: selectedChat.roomUuid,
  onMessage: (msg) => {
    setMessages((prev) => [...prev, msg]);
  },
  isActive: selectedChat.isActive,
});
```
```tsx
// useWebSocket 내부 구조 (초기 문제 버전)

useEffect(() => {
  // ...
}, [roomUuid, onMessage, socketUrl, isActive])
```


#### **원인 분석**
- `useWebSocket` 훅 내부의 `useEffect` 의존성 배열에 `onMessage`가 포함되어 있음
- `onMessage`는 렌더링마다 새로 정의되므로 참조값이 바뀌고그 결과 `useEffect`가 반복 실행되며 소켓 연결이 무한 재생성됨 → 무한 입장


#### **해결 방법** 
1. onMessageRef 사용
```tsx
const onMessageRef = useRef(onMessage);

useEffect(() => {
  onMessageRef.current = onMessage;
}, [onMessage]);
```
- 이후 `client.subscribe`에서 직접 `onMessageRef.current`를 사용함으로써, `useEffect` 의존성 배열에서 `onMessage`를 제거함.
- 이렇게 함으로써 `onMessage` 함수의 참조 변경이 `useEffect` 재실행에 영향을 주지 않도록 처리함.

2. 의존성 배열에서 onMessage 제거
```tsx
useEffect(() => {
  // websocket init and subscribe
}, [roomUuid, socketUrl, isActive]); // onMessage 제거됨
```
- 이 구조는 메시지 핸들러가 동적으로 바뀔 수 있으나, useRef를 통해 현재 핸들러를 항상 최신 상태로 유지하면서 소켓 재연결 없이 콜백만 갱신하는 구조를 갖게 됨

<br><br>
## 프로젝트 아키텍처
![image](https://github.com/user-attachments/assets/c83fb717-a8f3-459e-bc82-3167317f2607)
