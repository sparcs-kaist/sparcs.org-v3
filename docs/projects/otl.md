import ProjectLogo from '@site/src/components/ProjectLogo';

# OTL

<ProjectLogo
    name="OTL"
    url="https://otl.kaist.ac.kr"
    catchphrase="Online Timeplanner with Lectures"
/>

## 역사

**_OTL_**은 과거 존재했던 강의 평가 사이트인 **_LKIN_**을 바탕으로 2009년 처음 개발되었습니다. 2009년 당시 서비스의 주된 목적은 학생들이 강의 및 교수자에 대한 평가를 공유할 수 있도록 하는 것이었습니다. 이는 KAIST에서 공식적으로 진행하는 강의 평가는 학생들에게 공개되지 않는다는 점에서 착안하였습니다. 이에 더하여, 학생들이 모의 시간표를 자유롭게 구성할 수 있도록 하는 돕는 '모의 시간표' 기능이 제공되었습니다. 학생들은 매 학기 개설되는 과목들의 강의 시간, syllabus 등을 한눈에 확인하고 미리 시간표를 구성해 볼 수 있습니다.

OTL은 매 학기 4,000여 명이 넘는 KAIST 학우들이 사용하는 서비스로, 그간 크고 작은 변화를 거치며 꾸준히 발전해 왔습니다. 하지만 시간이 지남에 따라 프레임워크의 노후화, 신기술의 개발, 환경의 변화, 기능 추가의 한계 등으로 인해 재설계가 필요하게 되었습니다. 이에 따라 2015년에 **_OTL Plus_**라는 이름의 프로젝트가 시작되었습니다.

기존 OTL을 종료하고 2016년에 배포된 OTL Plus는 다음의 개선점을 가지고 있습니다. 과목사전의 후기 작성이 더욱 편리해졌으며, 검색 기능이 강화되었습니다. 또한 과목 후기에 '좋아요'를 남길 수 있게 되었습니다. 모의시간표에는 장바구니, 후기 미리보기, 시간표 복사 등 다양한 기능들이 추가되었습니다. 전체적으로 개선된 UI가 적용되었고, 이에 따라 과목사전과 모의시간표 간의 연계가 강화되었습니다. OTL Plus는 현재 과거와 같이 **_OTL_**로 이름을 통합하여 서비스되고 있습니다. 이는 KAIST 학우들의 혼란을 방지하기 위함입니다.

2020년에는 모바일로 OTL에 접근하는 학생들이 증가하고 있는 시대 상황을 반영하여 **_OTL App_** 프로젝트가 새로이 시작되었습니다. 기존에 모바일용 웹 페이지가 제공되고 있었으나, 이것만으로는 부족하다는 판단하에 학생들의 편이성을 증진하기 위한 방법을 모색한 결과입니다. OTL App 프로젝트는 현재도 활발히 진행 중이며, 2023년 가을 이전 배포를 목표로 하고 있습니다.

2023년에는 NestJS 프레임워크 기반 백엔드로의 이전 준비를 시작하였습니다. OTL 서비스가 오래 지속되면서 과거 Django2.1로 작성된 코드를 이용해 기능을 개발하거나 버그를 수정하는 속도가 비교적 더뎌지는 문제가 발생하였습니다. 그렇기 때문에 이러한 문제 상황을 근본적으로 해결하고자 최신 프레임워크의 도입을 결정하였고, 향후 1년의 기간이 소요될 것으로 예상됩니다.

## 협업

- Web TF, App TF로 나뉘어 매주 1회 정기 모임을 진행하고 있습니다. 필요한 경우 공동 코딩을 추가로 진행합니다.
- Slack을 통해 소통합니다.
  - 과거에는 **#otl**을 주로 사용하였으나, 현재는 새로 개설한 **#otl-plus**을 주요한 소통창구로 사용하고 있습니다.
  - 앱 개발 관련 대화는 **#otl-app**에서 많이 나누고 있습니다.
  - **#otl-notify**과 **#otl-app-notify**에서 Notion과 GitHub Webhook을 추가하여 사용하고 있습니다.
- Notion을 이용해 디자인 문서, 기능 제안, 회의록 등의 자료를 정리하여 보관하고 있습니다.

![OTL Notion](/projects/otl-notion.png)

### 사용하는 기술

- **Web**: UI 프레임워크는 React, 전역 상태관리 라이브러리는 Redux를 사용하고 있습니다. JavaScript를 통한 PropTypes로 작성되었으나 TypeScript 및 React Functional Component로 다시 작성하고 있습니다.
- **App**: Flutter로 제작하였습니다.
- **Server**: Django 2.1로 제작되었으나 TypeScript 기반의 NestJS 프레임워크로 이전하고 있습니다.

### GitHub 저장소

- **Web**: https://github.com/sparcs-kaist/otlplus
- **App**: https://github.com/sparcs-kaist/otl-app
- **Server Migration:** https://github.com/sparcs-kaist/otl-nest

## 문의

[otlplus@sparcs.org](mailto:otlplus@sparcs.org)

### 프로젝트 소개 PDF

[프로젝트 소개 PDF](/projects/introduction/otl.pdf)