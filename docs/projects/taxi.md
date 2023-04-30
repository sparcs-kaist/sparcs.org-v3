import ProjectLogo from '@site/src/components/ProjectLogo';

# Taxi

<ProjectLogo
    name="Taxi"
    url="https://taxi.sparcs.org"
    catchphrase="사공이 많으면 산에 가도 싸다"
/>

## 역사

2011 카이스트 뉴스와 2018 카카오모빌리티 리포트에서 소개될 정도로 카이스트는 많은 사람들이 택시를 승차하는 장소입니다. 이에 따라 같은 시각에 같은 목적지를 향하는 사람을 모아 동승하여 택시비를 절감하고 싶어하는 학우들이 많습니다. 그러나 게시판 형태의 기존 커뮤니티나 SNS를 이용해 택시 동승자를 모집하는 것은 UI/UX 상의 한계가 존재합니다. 이러한 불편함이 [Ara](./ara.md)와 같은 커뮤니티 등에서 표출되며 택시 동승 모집만을 위한 새로운 서비스의 필요성이 제기되었습니다.

이를 계기로 시작된 Taxi는 카이스트 구성원간 택시 동승자 모집 서비스입니다. 기계동 택시승강장, 대전역, 버스터미널 등의 출발/도착지나 출발 시간을 기반으로 택시 동승자를 찾을 수 있습니다. 동승 이전에는 채팅 기능을 통해 세부적인 장소와 시간을 조율하도록 돕고, 동승 이후에는 간편하게 정산 현황을 확인하도록 돕습니다.

Taxi는 2021년 봄학기에 Toy Project로 개발이 시작되었습니다. 이듬해 가을인 2022년 가을학기에 **Taxi Beta**를 출시하여 일부 KAIST 학우들에게 홍보를 진행하여 의견을 수렴하였습니다. 2022년 가을학기에 **Taxi** 정식 서비스를 출시하여 홍보하였습니다.

### 향후 계획

- 카이스트 학우들의 택시 동승 문화를 선도하는 서비스
- 동승부터 정산까지 한 앱에서 모두 해결하도록 도와주는 서비스
- KAIST 학우들이 편하게 접할 수 있는 SPARCS 서비스

### 발표 자료

- [2021년 가을학기 SPARCS Homecoming](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/stitch_1637422019377.pdf) / 이채영-stitch
- [2022년 봄학기 SPARCS 임시총회](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/suwon_1660753366898.pdf) / 김건-suwon
- [2022년 봄학기 Taxi Intern Project](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/andy_1659942777418.pptx) / 예상우-andy
- [2022년 가을학기 SPARCS 개강총회](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/suwon_1682521842595.pdf) / 김건-suwon
- [2022년 가을학기 SPARCS Homecoming](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/agent%2C+andy%2C+macintosh_1682521983214.pdf) / 예상우-andy, 최지헌-agent, 정상-macintosh
- [2022년 가을학기 SPARCS 종강총회](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/suwon_1682522169035.pdf) / 김건-suwon
- [2022년 가을학기 Taxi Intern Project](https://s3.ap-northeast-2.amazonaws.com/sparcs.home/won_1682522258809.pptx) / 최동원-won

## 협업

- 매주 화요일 오후 9시 ~ 12시에 회의 및 공동 코딩을 진행합니다.
- 대면 회의는 교양분관 SPARCS 동방에서, 비대면 회의는 Discord에서 진행됩니다.
- Slack을 통해 공지, 질문, 아이디어 제안, Github Bot, 자동배포 봇, Notion Bot 등을 관리합니니다.
- Notion으로 Coding Rules와 Coding Conventions를 지정하고, 매주 회의록을 작성합니다.
- [Figma](https://www.figma.com/file/7Y8jsGFupTqruFu636r0Mz/SPARCS-Taxi-Design)로 디자인 작업을 합니다.

### 개발 과정

1. 회의에서 제시된 아이디어 및 발견된 버그의 문제 해결을 논의합니다.
2. 기획 후 Figma로 디자인합니다.
3. 하나의 작업은 여러 Task로 분할될 수 있고, 각 Task들을 팀원들과 분할합니다.
   - 새로운 Task가 생기면 Template(Issue, bug-report 등)에 맞게 Github Issue를 생성합니다.
4. Github Pull Request 로 작업 내용을 공유합니다.
   - Template에 맞게 작업한 내용을 설명하여 공유합니다.
5. Code Review를 통한 팀원들의 피드백을 받습니다.
   - 2개 이상의 approve가 있어야, Merge가 가능합니다.
6. Github Action으로 Unit & E2E 테스트로 코드를 검증합니다.
7. 개발용 서비스에 자동 배포 후, 실제 서비스에서 발생할 수 있는 문제를 사전에 확인해 봅니다.
8. 실제 서비스에 자동 배포합니다.

### 사용하는 기술

- **Web**: React
- **App**: Flutter
- **Server**: Express, MongoDB, Redis

### GitHub 저장소

- **Web**: https://github.com/sparcs-kaist/taxi-front
- **App**: https://github.com/sparcs-kaist/taxi-app
- **Server**: https://github.com/sparcs-kaist/taxi-back

## 구성원

- Project Manager
  ```javascript
  { name: "김건", id: "suwon", period: "2022 ~ 2023" }, // 22봄 ~ 23봄 (누적 5학기)
  { name: "이채영", id: "stitch", period: "2021" }, // 21봄 ~ 21겨울 (누적 4학기)
  ```
- Designer
  ```javascript
  { name: "최지헌", id: "agent", period: "2021 ~ 2022" }, // 21여름 ~ 22겨울 (누적 7학기)
  { name: "이혜원", id: "chillo", period: "2021" }, // 21가을 ~ 21겨울 (누적 2학기)
  ```
- Developer
  ```javascript
  { name: "정상", id: "macintosh", period: "2021 ~ 2023" }, // 21가을 ~ 23봄 (누적 7학기)
  { name: "최지헌", id: "agent", period: "2022" }, // 22봄 ~ 22겨울 (누적 4학기)
  { name: "이진우", id: "jaydub", period: "2022" }, // 22봄 ~ 22겨울 (누적 3학기)
  { name: "예상우", id: "andy", period: "2022 ~ 2023" }, // 22봄 ~ 23봄 (누적 5학기)
  { name: "손성민", id: "happycastle", period: "2022 ~ 2023" }, // 22여름 ~ 23봄 (누적 4학기)
  { name: "최동원", id: "won", period: "2022 ~ 2023" }, // 22가을 ~ 23봄 (누적 3학기)
  { name: "이서완", id: "swany", period: "2022 ~ 2023" }, // 22봄 ~ 23봄 (누적 5학기)
  { name: "최준영", id: "dogma", period: "2021" }, // 21봄 ~ 21겨울 (누적 4학기)
  { name: "김태우", id: "toby", period: "2021 ~ 2022" }, // 21가을 ~ 22봄 (누적 3학기)
  { name: "안태찬", id: "return", period: "2022 ~ 2023" }, // 22가을 ~ 23봄 (누적 3학기)
  { name: "김효경", id: "diana", period: "2022 ~ 2023" }, // 22가을 ~ 23봄 (누적 3학기)
  { name: "신태현", id: "kiko", period: "2022" }, // 22봄 ~ 22여름 (누적 2학기)
  { name: "박진호", id: "bread", period: "2021" }, // 21가을 ~ 21겨울 (누적 2학기)
  { name: "송인화", id: "ina", period: "2021" }, // 21봄 ~ 21여름 (누적 2학기)
  { name: "박지호", id: "night", period: "2022" }, // 22여름 ~ 22가을 (누적 2학기)
  { name: "김건", id: "suwon", period: "2021 ~ 2023" }, // 21봄 ~ 21겨울 (누적 4학기)
  { name: "이채영", id: "stitch", period: "2021" }, // 21봄 ~ 21겨울 (누적 4학기)
  ```

## 문의

- [Taxi 마이페이지](https://taxi.sparcs.org/mypage) 하단에 위치한 **채널톡 문의하기**
- [taxi@sparcs.org](mailto:taxi@sparcs.org)
