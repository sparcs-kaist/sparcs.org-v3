import ProjectLogo from '@site/src/components/ProjectLogo';

# Biseo

<ProjectLogo
    name="Biseo"
    url="https://biseo.sparcs.org"
    catchphrase="스팍스 총회를 비서가 책임집니다"
/>

## 역사

### 필요성

SPARCS 종강총회 대부분의 시간은 정회원 승급 투표에 할애됩니다. 사전에 만든 구글 설문지의 링크를 공유하여 진행한 투표 과정에는 여러 불편함이 있었습니다.

우선 20개에서 30개에 달하는 설문지를 임원진이 손수 직접 만들어야 한다는 번거로움이 존재합니다. 또한 투표를 한 사람이 아닌 하지 않은 사람을 보여주는 기능의 부재로 인해 미투표자에 대한 독촉이 늦어져 투표가 지연되는 경우가 많았습니다. 마지막으로 채팅을 전담하는 카카오톡과 투표를 전담하는 구글 설문지, 통합되지 않고 분리된 두 플랫폼 사이를 번갈아가며 이동함에 따른 피로감이 존재했습니다.

### 해결책

이렇게 Biseo는 SPARCS의 원활한 총회 진행을 돕기 위해 시작된 서비스입니다.

Biseo의 주요 기능은 총 3가지입니다. 첫째, 투표 이전에는 SPARCS에 최적화된 투표 양식을 통한 **_안건 간편 생성 기능_**을 통해 적은 입력으로도 모든 투표 안건을 빠르게 생성할 수 있도록 돕습니다. 둘째, 투표 도중 다른 서비스로 이동하지 않아도 되어 구성원의 피로도를 낮춥니다. 이는 Biseo 내부에 의견 공유를 위한 **_실시간 채팅 기능_**과 의견 표출을 위한 **익명 투표 기능**이 모두 갖춰져 있기 때문입니다. 셋째, 투표 도중과 이후에는 관리자가 투표하지 않은 사람을 파악할 수 있습니다. 관리자는 필요 시 **_투표 독촉 기능_**을 통해 투표를 독촉하여 더 빠른 의견 수렴을 꾀할 수 있습니다.

Biseo는 주기적인 피드백을 기반으로 한 자유롭고 다양한 도전을 통해 꾸준히 성장하고 있습니다. 처음에는 단순한 채팅에서 시작했지만, 프로젝트 구성원의 자유로운 시도로 투표, 공유, 재적 인원 관리 기능 등이 추가되며 나날이 SPARCS에 적합한 형태로 탈바꿈하고 있습니다. 최근에는 기존 Biseo의 고질적인 문제를 해결하기 위해 새로운 디자인과 시스템을 기반으로 한 Biseo v2.0을 준비하고 있습니다.

![Biseo Main](/projects/biseo-main.png)

![Biseo Admin](/projects/biseo-admin.png)

## 협업

Biseo에서는 특정한 인원이 특정한 개발의 영역을 도맡는 방식을 사용하지 않습니다. 대신 모든 인원이 필요한 모든 곳에 자유롭게 기여할 수 있는 방식으로 개발을 이어나가고 있습니다. 따라서 모든 사람들이 Front-End를 개발하기도 하며, 동시에 Back-End를 개발하기도 합니다 이를 통해 Biseo는 유연하게 기능을 확장하고자 하며 동시에 폭넓게 개발 역량을 기르기 위한 유연한 형태의 서비스로 받아들여지고 있습니다.

### 사용하는 기술

- **Front-End**: React, TypeScript, JavaScript
- **Back-End**: TypeScript, JavaScript, Express
- **Database**: MongoDB, Redis
- **Database for v2.0** : MySQL, Redis

### Github 저장소

- **Front-End**: https://github.com/sparcs-kaist/biseo-frontend
- **Back-End**: https://github.com/sparcs-kaist/biseo-backend
- **Front-End & Back-End for v2.0**: https://github.com/sparcs-kaist/biseo
