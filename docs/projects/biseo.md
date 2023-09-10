import ProjectLogo from '@site/src/components/ProjectLogo';

# Biseo

<ProjectLogo
    name="Biseo"
    url="https://biseo.sparcs.org"
    catchphrase="쉽고 빠른 의사결정은, Biseo"
/>

## 역사

### 필요성

SPARCS 총회 대부분의 시간은 투표 과정에서 할애됩니다. 사전에 만든 구글 설문지의 링크를 공유하여 진행한 투표 과정에는 여러 불편함이 있었습니다.

우선 20개에서 30개에 달하는 설문지를 임원진이 손수 직접 만들어야 한다는 번거로움이 존재합니다. 또한 투표를 한 사람이 아닌 하지 않은 사람을 보여주는 기능의 부재로 인해 미투표자에 대한 독촉이 늦어져 투표가 지연되는 경우가 많았습니다. 마지막으로 채팅을 전담하는 카카오톡과 투표를 전담하는 구글 설문지, 통합되지 않고 분리된 두 플랫폼 사이를 번갈아가며 이동함에 따른 피로감이 존재했습니다.

이런 불편함을 해결하려는 시도로 SPARCS 내부의 서비스로 Biseo v1.0이 탄생했습니다. 하지만 Biseo v1.0의 유지 및 보수 과정에서 해당 서비스의 결함이 발견되기 시작했습니다. 정돈되지 않은 코드, DB 무결성과 확장성의 문제 등의 다양한 코드 및 디자인 이슈로 인해 많은 문제가 생겼고, 이를 해결하기 위한 방법으로 스택과 코드 스타일을 바꾼 새로운 Biseo v2.0 개발이 시작되었습니다.

### Biseo

이렇게 Biseo는 SPARCS의 원활한 총회 진행을 돕기 위해 시작된 서비스입니다.

Biseo의 주요 기능은 총 3가지입니다. 첫째, 투표 이전에는 SPARCS에 최적화된 투표 양식을 통한 **_안건 간편 생성 기능_**을 통해 적은 입력으로도 모든 투표 안건을 빠르게 생성할 수 있도록 돕습니다. 둘째, 투표 도중 다른 서비스로 이동하지 않아도 되어 구성원의 피로도를 낮춥니다. 이는 Biseo 내부에 의견 공유를 위한 **_실시간 채팅 기능_**과 의견 표출을 위한 **익명 투표 기능**이 모두 갖춰져 있기 때문입니다. 셋째, 투표 도중과 이후에는 관리자가 투표하지 않은 사람을 파악할 수 있습니다. 관리자는 필요 시 **_투표 독촉 기능_**을 통해 투표를 독촉하여 더 빠른 의견 수렴을 꾀할 수 있습니다.

![Biseo Main](/projects/biseo-main.png)

![Biseo Admin](/projects/biseo-admin.png)

Biseo v2.0에서는 Biseo v1.0을 사용하며 받은 다양한 피드백을 기반으로 새로운 기능들이 추가되었습니다. 주요 기능은 동일하지만 세부적인 UX를 개선하였고, SPARCS 내부 서비스에 국한되지 않고 **_다른 단체에서도 사용될 수 있는 가능성_**을 가진 비서로 디자인되었습니다.

![Biseo v2.0 Main](/projects/biseo2-main.png)

![Biseo v2.0 Admin](/projects/biseo2-admin.png)

Biseo는 주기적인 피드백을 기반으로 한 자유롭고 다양한 도전을 통해 꾸준히 성장하고 있습니다. 처음에는 단순한 채팅에서 시작했지만, 프로젝트 구성원의 자유로운 시도로 투표, 공유, 재적 인원 관리 기능 등이 추가되며 나날이 Biseo의 가능성을 실현하기 위한 방향으로 탈바꿈하고 있습니다. 최근에는 23년도 여름학기까지 개발된 Biseo v2.0를 안정화 시키고, 비서의 수많은 가능성을 실현시킬 수 있도록 다양한 기능을 추가하는 작업을 진행하고 있습니다.



## 협업

Biseo에서는 특정한 인원이 특정한 개발의 영역을 도맡는 방식을 사용하지 않습니다. 대신 모든 인원이 필요한 모든 곳에 자유롭게 기여할 수 있는 방식으로 개발을 이어나가고 있습니다. 따라서 모든 사람들이 Front-End를 개발하기도 하며, 동시에 Back-End를 개발하기도 합니다. 이를 통해 Biseo는 유연하게 기능을 확장하고자 하며 동시에 폭넓게 개발 역량을 기르기 위한 유연한 형태의 서비스로 받아들여지고 있습니다.

### 사용하는 기술
**Biseo v1.0**
- **Front-End**: React, TypeScript, JavaScript
- **Back-End**: TypeScript, JavaScript, Node Express, Socket.IO
- **Database**: MongoDB, Redis

**Biseo v2.0**
- **Front-End**: React, TypeScript
- **Back-End**:  TypeScript, Node Express, Socket.IO
- **Database** : MySQL, Prisma, Redis

### Github 저장소

**Biseo v1.0**
- **Front-End**: https://github.com/sparcs-kaist/biseo-frontend
- **Back-End**: https://github.com/sparcs-kaist/biseo-backend

**Biseo v2.0**
- **Front-End & Back-End**: https://github.com/sparcs-kaist/biseo
