---
authors: suwon
slug: ci-cd
---

# 제목

안녕하세요. SPARCS에서 2021년에는 Taxi팀의 front 개발자로, 2022년에는 PM으로 활동하고 있는 김건(suwon)입니다.

## CI (Continuous Integration)

**CI**는 [Continuous Integration, 지속적 통합](https://en.wikipedia.org/wiki/Continuous_integration)이라는 뜻을 가지고 있습니다. 여기서 지속적 통합이란 여러 명이 하나의 코드에 대해서 수정을 진행해도 코드의 품질을 관리하면서 지속적으로 통합할 수 있음을 의미합니다.

프로젝트 그룹에서 여러 개발자들이 코드 수정 작업을 진행을 하고 main 브랜치에 통합을 할 때, 작업이 끝나면 통합된 코드가 잘 빌드가 되는지, 올바르게 동작을 하는지, 버그는 없는지 테스트하는 과정을 거쳐야합니다. 하지만 매번 개발자가 직접 코드를 병합할 때 마다 테스트를 진행하면서 코드를 검증하는 것은 프로젝트의 크기가 커질 수록 더욱더 많은 시간이 소요됩니다. 최악의 경우에는 작업 시간보다 통합 및 테스트 과정이 더 많은 시간이 필요하게 될 수 있습니다. 이러한 상황을 [통합의 지옥](https://wiki.c2.com/?IntegrationHell)이라고 합니다.

하지만 테스트를 자동화를 한다면 개발자가 빌드와 테스트를 직접 하지 않아도 코드를 검증할 수 있습니다. CI는 테스트를 자동화하여 통합의 지옥을 피하게 도와주며, 개발자들의 기존 코드와의 Conflict 해결 및 버그 수정을 더 빠르게 할 수 있도록 도와줍니다.

## CD (Continuous Delivery, Continuous Deployment)

**CD**는 Continuous Delivery 지속적 제공이라는 뜻과 Continuous Deployment, 지속적 배포라는 두 가지의 뜻이 혼용되어 사용됩니다. 



 지속적 제공이란 소프트웨어가 항상 신뢰가능한 수준에서 배포될 수 있음을 의미합니다.

참고 : [](https://en.wikipedia.org/wiki/Continuous_delivery)

## Taxi의 CI/CD

SPARCS의 [Taxi Project](/docs/projects/taxi) 역시 CI/CD 파이프라인을 가지고 있습니다. (2022-12-04 작성 당시의) 이 구조에 대해 간단히 설명드리고자 합니다.

![image-20221204221254055](./taxi_deploy.png)

- main으로 머지되는 PR이 열리면 Front(react)의 코드에 대해서는 자동으로 Cypress를 사용한 E2E Test를 진행하며, Back(node express)의 코드에 대해서는 Mocha를 사용하여 Unit Test를 진행합니다. 만약 이 단계에서 빌드나 테스트가 실패한다면 main 브랜치로 merge 할 수 없습니다. (참고: [test_ci.yml](https://github.com/sparcs-kaist/taxi-back/blob/f76afb1c0967e79315bb4e7b6bb05d7ccde8ecb5/.github/workflows/test_ci.yml))

- main으로 코드가 merge가 되면 main 브랜치에 대해서 자동으로 [Github release](https://github.com/sparcs-kaist/taxi-back/releases)를 만들며 이 때 사용하는 tag를 이전 버전보다 높게 만들어 사용합니다. (참고: [create_release_tag.yml](https://github.com/sparcs-kaist/taxi-back/blob/f76afb1c0967e79315bb4e7b6bb05d7ccde8ecb5/.github/workflows/create_release_tag.yml))

- main의 코드를 서비스에 사용할 수 있는 Docker 이미지로 자동으로 빌드합니다. 빌드된 Docker 이미지에는 위에서 release에 사용한 tag와 latest tag가 붙여집니다. 그리고 빌드된 이미지를 자동으로 Taxi의 AWS ECR repository에 push합니다. (참고: [push_image_ecr.yml](https://github.com/sparcs-kaist/taxi-back/blob/f76afb1c0967e79315bb4e7b6bb05d7ccde8ecb5/.github/workflows/push_image_ecr.yml))

- 채널톡 서버에서 실행 중인 도커 컨테이너인 [taxi-watchtower](https://containrrr.dev/watchtower/)는 이미지의 업데이트를 자동으로 감지합니다. 업데이트된 이미지를 pull 받아오며 이 이미지를 사용하여 taxi-front와 taxi-back 컨테이너를 업데이트 합니다.

아직까지는 무중단 배포가 아니기에 taxi 서비스는 새벽 4시에만 업데이트가 진행되도록 설정되어 있습니다. 보안점을 조언해주시거나 궁금한 점이 있으시다면 SPARCS 슬랙 DM으로 편하게 연락주세요.

긴 글 읽어주셔서 감사합니다.!!
