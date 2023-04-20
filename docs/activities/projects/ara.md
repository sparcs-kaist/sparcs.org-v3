# Ara

<a href="https://newara.sparcs.org/">
  <img src="/projects/ara/logo.svg" width="400" />
</a>

Ara, KAIST's official community service

## History

Ara는 SPARCS가 창립된 해인 1991년부터 **_SPARCS BBS_** 라는 이름으로 사용된 서비스입니다. 당시 Ara는 Eagle
BBS(Bulletin Board System) 기반으로 개발되었으며 대한민국에서 두 번째로 인터넷에 연결된 BBS 서비스입니다. 현존하는
BBS 서비스 중 가장 오래되었습니다.

1998년, newsgroup을 연동하고자 한 NNTP(Network News Transfer Protocol) 기반의 **_NeoAra_**
가 론칭되었습니다. KAIST 구성원뿐만 아니라 KAIST 주변의 국내 인터넷 사용자 모두를 위한 newsgroup의 역할을 하고자 하였습니다.

2006년에 론칭된 **_NeoAra & WebAra_** 부터 웹과의 연동이 가능해졌습니다. 덕분에 Telnet과 NNTP에 더해 Web으로도
Ara를 이용할 수 있게 되었습니다. 또한 파일 첨부 기능이 추가되었습니다.

NeoAra & WebAra의 유지 보수가 어려워짐에 따라 이종 언어가 자유로이 쓰일 수 있는 확장 구조의 **_Arara 1세대_** 가
개발되었습니다. Python을 기반으로 백엔드는 SQLAlchemy, 미들웨어는 Thrift RPC, 프론트엔드는 Django Template
Engine을 사용하였습니다.

Arara 1세대를 리뉴얼한 **_Arara 2세대_** 는 2010년부터 2020년 10월까지 가장 오래 이용된 Ara입니다. 리뉴얼 당시
동시 접속자 수 200명, 하루 평균 접속자 수 7,000명으로 KAIST 공식 커뮤니티로서의 위상을 확인할 수 있었습니다. 기존 엔진의
디자인을 새롭게 하고 XpressEngine 기반의 Ara를 개발하려는 노력이 있었습니다. RSS(Really Simple Syndication)
등 사용자의 편의를 위한 기능이 구현되었습니다.

Ara를 모바일로 이용하는 사용자가 증가함에 따라 디자인과 엔진 성능을 개선하고자 한 **_Mobile Ara_** 가 개발되었습니다.

SPARCS 내 Git 사용 정착에 기여한 **_Arari_**, 서울에서 소규모로 진행된 Ara 리뉴얼 프로젝트인 **_Ara2_** 개발이
진행되었지만 론칭되지는 못하였습니다.

**_Ara Plus_** 는 Ara 활성화를 위해 커뮤니티 활동을 즐길 수 있는 풍부한 기능들을 새로운 디자인으로 제공하고자 한 프로젝트입니다.
특정 주제에 대해 채팅을 할 수 있는 "불판", 동아리나 자치단체, 소모임을 위한 "그룹 게시판", 익명 게시물, 포인트 제도 등의 기능들이
개발되었으나 론칭되지 못하였습니다.

2020년 11월에 론칭된 **_NewAra_** 는 10년간 이용되어 온 Arara를 리뉴얼한 프로젝트입니다. "가장 정확한 정보를 가장
신속하게"라는 슬로건을 걸고 KAIST 포탈 공지를 모아 볼 수 있는 게시판 추가 및 elasticsearch 도입을 통한 발전된 검색 기능을
제공하였습니다. Ara의 아이덴티티가 잘 드러나도록 디자인을 개선하였습니다.

## Development

### Collaboration

- 매주 1회 정기 모임과 1회 공동 코딩을 진행하고 있습니다.
- Notion을 이용하여 개발 과정을 기록하고 정기 모임의 회의록을 작성합니다. 칸반을 이용하여 태스크를 분배합니다.
- Slack을 통해 소통합니다. GitHub과 연동하여 commit이나 PR 등에 대한 알람을 받습니다.

### GitHub Repository

Ara는 다음 세 개의 GitHub public repository에서 개발을 진행하고 있습니다.

- **Web**: <https://github.com/sparcs-kaist/new-ara-web>
- **API**: <https://github.com/sparcs-kaist/new-ara-api>
- **App**: <https://github.com/sparcs-kaist/new-ara-app>

## Contact

<new-ara@sparcs.org>
