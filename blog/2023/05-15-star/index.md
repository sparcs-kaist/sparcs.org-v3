---
 authors: star
 slug: status-check-with-uptime
---

## UPTIME을 사용한 Github Actions로 서버 모니터링하기

저희 집에는 제가 운영하고있는 개인서버가 하나 있습니다. 
그런데 집이라는 환경이 종종 인터넷이 끊기기도 하고(공유기 업데이트 및 고장, 새벽에 하는 통신가 인터넷망 점검 등), 갑자기 전원 공급이 끊길 수도 있으며(스마트 콘센트라 버튼 하나 잘못 누르면 전원이 끊김..), 서버를 돌리고 있는 라즈베리파이가 고장나거나, 연결되어있는 HDD가 고장나는 등 서버가 멈추는 경우는 굉장히 많습니다.
이렇게 서버가 멈추는 경우는 굉장히 많고, 꽤 자주 발생하기 때문에 서버 및 제공하는 API가 정상적으로 작동하는지 체크하는 것은 굉장히 중요합니다.

하지만 Health Check를 같은 서버에서 할 경우 만약 서버에 물리적인 문제가 발생하면 Health Check또한 진행되지 않기 때문에 보통 reliable한 곳에 따로 서버를 두어 운영하는 서버에 주기적으로 요청을 보내 status를 확인하는 방법이 주로 사용됩니다.
그런데 다른 장소에 따로 서버를 하나 더 운영하기에는 힘들기 때문에 추가적인 서버 없이 간단하게 Status Monitoring을 할 수 있는 UPTIME에 대해 소개해보려고 합니다.
https://upptime.js.org/

### 1. Github Actions를 위한 Repository 생성
  https://github.com/upptime/upptime 에서 Use this templete를 클릭합니다. 그리고 가장 아래 Include all branches를 체크한 후 Create 버튼을 누릅니다.
  <br /><img width="764" alt="s1" src="https://github.com/sparcs-kaist/sparcs.org-v3/assets/93732046/a2275b0a-a2a8-4819-875e-109598e9ae98">

### 2. Personal Access token 발급
  Actions에서 자동으로 Repository에 커밋하고 푸시하기 위해서는 관련 권한이 있는 토큰이 있어야 합니다. 토큰은 깃허브 사용자 설정 > Developer settings > Personal access tokens > Tokens (classic)에서 Generate new token을 누른 후, "repo"와 "workflow"를 체크한 후 토큰을 만들어줍니다.
  <br /><img width="797" alt="s2" src="https://github.com/sparcs-kaist/sparcs.org-v3/assets/93732046/0284c0d7-23f4-4c4b-a7e0-5b96eed5520b">

### 3. Personal Access token을 Repository Secrets로 설정
  발급한 Token을 Actions에서 사용하기 위해 앞서 만든 Repository에 Token을 등록해주세요. Repository 설정 > Secrets and Variables에서 New Repository Secret을 눌러 Name은 GH_PAT, Secret는 2번에서 발급받는 Token을 붙여넣어줍니다.
  <br /><img width="782" alt="s3" src="https://github.com/sparcs-kaist/sparcs.org-v3/assets/93732046/428365b5-838c-4a7c-bc65-9e8d1400f303">

### 4. 모니터링 할 웹사이트 등록
  이제 마지막으로 어떤 웹사이트를 check할것인지 설정해줄 차례입니다. .upptimerc.yml파일을 열고 sites: 아래에 원하는 사이트 주소와 Request Method를 추가해주면 됩니다.
  <br /><img width="678" alt="s4" src="https://github.com/sparcs-kaist/sparcs.org-v3/assets/93732046/e621b5a4-a7d0-43e0-b5b4-dc217faa648f">

### 5. Status 결과 확인
이제 Github Actions가 실행될때까지 몇분 기다리면 README.md에 등록한 웹사이트가 추가되고, 기본적으로 매 5분마다 status info가 업데이트됩니다!
<br /><img width="642" alt="s5" src="https://github.com/sparcs-kaist/sparcs.org-v3/assets/93732046/81a3bd90-925c-4c70-b3fc-6ad2806edbc2">

Github Actions에 Discord나 Slack 메시지 보내기를 추가하면 실시간으로 서버에 문제가 발생했을 때 핸드폰으로 알람도 받아볼 수 있습니다.


