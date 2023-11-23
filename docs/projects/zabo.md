import ProjectLogo from '@site/src/components/ProjectLogo';

# Zabo

<ProjectLogo
    name="Zabo"
    url="https://zabo.kaist.ac.kr"
    catchphrase="이제 포스터 확인은 자보에서"
/>

## 역사

Zabo는 매 학기 초 수많은 동아리와 단체들이 부착하는 포스터를 한 곳에 정리하고, 관심 있는 사람들이 이를 웹에서 쉽게 확인할 수 있도록 하는 서비스입니다. 학기 초마다 많은 동아리와 교내 단체가 홍보를 위해 학교 곳곳에 포스터를 부착하고 있습니다. 이런 포스터를 사용자가 쉽게 모아볼 수 있는 서비스의 필요성은 항상 제기되어 왔고, 이러한 필요에 따라 Zabo는 총 4번이나 새롭게 개발되었습니다.

### Zabo의 시작 (2014~2016)

2015년 2월 21일, 2년간의 개발 끝에 Zabo가 처음으로 출시되었습니다. 서비스 초기에 사용자 수를 확보하기 위해 서비스 운영진이 동아리와 교내 단체의 포스터를 직접 업로드하는 노력을 기울였다는 기록이 남아 있습니다.

### 새로운 Zabo의 등장 (2017~2018)

2017년도 봄학기가 되자 기존 Zabo를 유지보수할 개발 인력이 충분하지 않게 되었고, 이를 부활시키고자 Vue.js와 Django에 기반한 새로운 Zabo의 개발이 시작되었습니다. 2018년 초에 시작된 개발은 11월까지 1년 가까이 진행되었으나, 그해 겨울방학 때부터 시작된 PM의 부재로 인해 새로운 Zabo는 세상의 빛을 볼 수 없었습니다.

### 다시, 새롭게, 가보자 (2019~)

Zabo는 2020년 봄 출시한 이후 교내 각 동아리의 선발 공고 및 행사 홍보용 플랫폼으로 활발하게 사용되어 왔습니다.

지난 2020년 가을학기 이후 프로젝트 활동 인원이 없어져 동아리 차원에서 기본적인 사용자 지원만 제공해왔습니다. 그러나 2022년 여름학기 이후 Zabo에 열정적인 회원들이 모이게 되며 사용자 확충, 추가적인 기능 개발, 그리고 교내 학생지원팀과의 협업을 통해 서비스를 재활성화하고자 노력하고 있습니다.

## 협업

- 매주 주말에 동아리방에서 진행되는 대면 회의, 그리고 화상 회의로 진행되는 비대면 공동코딩을 진행합니다.
- Slack을 통해 소통합니다.
  - **#zabo-main**을 통해 매 학기 프로젝트 운영과 개발에 관한 논의사항을 공유하고 있습니다.
  - **#zabo-admin**에서 신규 그룹 신청 허가 여부를 논의하고 있습니다.
- Figma를 이용해 디자인 관련 협업을 진행하고 있습니다.
- 중/단기적인 개발 태스크를 관리하기 위한 칸반으로써 [GitHub Project](https://github.com/orgs/sparcs-kaist/projects/6)을 사용하고 있습니다.
  - SPARCS 회원에게만 공개된 상태입니다.
- Notion를 이용해 회의록과 프로젝트 개발 관련 문서를 정리하고 있습니다.

![Zabo Notion](/projects/zabo-notion.png)

### 사용하는 기술

- **Front-End**: UI 프레임워크로 React.js, 전역 상태관리 라이브러리로 Redux를 사용하고 있습니다. 최근 전역 상태와 컴포넌트 속성에 대한 TypeScript 전환 작업을 완료하였습니다.
- **Back-End**: 백엔드 프레임워크로 Express.js를 사용하고 있고, 데이터베이스로 MongoDB를 Mongoose ODM과 같이 사용하고 있습니다.

### GitHub 저장소

- **Front-End**: https://github.com/sparcs-kaist/zabo-front-reactjs
- **Back-End**: https://github.com/sparcs-kaist/zabo-server-nodejs

# 문의

- [Zabo](https://zabo.kaist.ac.kr) 좌측 하단에 위치한 채널톡
- [zabo@sparcs.org](mailto:zabo@sparcs.org)

### 프로젝트 소개 PDF

![프로젝트 소개 PDF](/projects/introudction/zabo.pdf)