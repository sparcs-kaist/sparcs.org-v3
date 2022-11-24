---
authors: retro
slug: living-with-typeorm
---

# TypeORM과 함께 살아가기

### Disclaimer

본문에 앞서, 필자가 사용한 TypeORM은 v0.2x라는 점을 미리 말씀드린다. TypeORM v0.3x의 경우 문법이 크게 달라진 것으로 알고 있고 실제로 사용해보지 않아 이 글의 내용과 다를 수 있다.

다만 본문에서 언급한 버그들은 현재의 이슈 보드에도 Open되어 있다.

---

### Into.

 TypeORM은 NodeJS 플랫폼에서 가장 많이 사용되는 [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) 중 하나이지만, 프로덕션 환경에서 사용하기에는 조금 불편한 면이 있다.

![2022년 10월 31일 현재, [GitHub 이슈 보드](https://github.com/typeorm/typeorm/issues?q=is%3Aopen+is%3Aissue+sort%3Areactions-%2B1-desc+label%3Abug+)에 bug 라벨이 달린 이슈만 1천개가 넘는다.](./issue.png)

2022년 10월 31일 현재, [GitHub 이슈 보드](https://github.com/typeorm/typeorm/issues?q=is%3Aopen+is%3Aissue+sort%3Areactions-%2B1-desc+label%3Abug+)에 bug 라벨이 달린 이슈만 1천개가 넘는다.

 9개월 동안 현업에서 TypeORM을 사용하며 느꼈던 불편함, 그럼에도 TypeORM과 함께 살아가기 위한 팁들을 소개한다.

### TypeORM의 문제점

**황당한 버그**

 상식적으로 이해가 안되는 치명적인 버그가 여럿 존재한다.

 마이그레이션 스크립트 자동 생성 기능은 엔티티(모델)의 변경사항을 실제 테이블에 적용하는 스크립트를 만들어주는 기능이다. 그런데 컬럼의 타입을 변경하는 등 일부 ALTER 문에 대해 TypeORM은 해당 컬럼을 DROP(!)하고 다시 CREATE해버리는 스크립트를 만든다.

 이 이슈는 1천개가 넘는 TypeORM의 버그 중 가장 좋아요👍를 많이 받았고, 2019년 1월에 제보되었지만 아직 고쳐지지 않았다.

 성능 버그도 여럿 존재한다. 성능 버그는 개발 환경에서는 잘 동작하다가, 실 서비스 환경에 배포해서 스케일이 커지면 대참사가 발생한다는 점에서 치명적이다. 서비스 규모가 작을 때에는 괜찮을지 몰라도, 서비스가 성장하면서 대대적인 리팩토링이 필요해질 것이다.

 이외에 find operation에서 id에 해당하는 첫 번째 인자를 undefined로 넣으면 아무 relation도 찾아오지 못하는 대신 첫 번째 relation을 받아오는 버그도 굉장히 인상적이었다.

**불완전한 타입 검사**

 완벽한 타입 안전성을 기대했다면 실망할 수 있다. 특정 컬럼만 가져오거나 연결된 relation이 존재하는 상황에서, 가져온 객체의 타입이 본래 객체의 타입과 같다고 간주해버린다. `post.chat.author.profile` 과 여러 join하여 모든 정보를 객체로 가져오는 상황이 많다면 런타임에서 타입 에러로 고충을 겪을 가능성이 높다.

 자세한 내용은 또다른 ORM인 Prisma의 [공식 블로그](https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-typeorm#type-safety)를 참고 바란다.

### Typeorm과 함께 살아가기 위한 팁

**TypeORM이 버그의 원인일 수 있다는 사실을 기억하자**

 내가 작성한 React 웹 앱이 제대로 작동하지 않는다면 React의 문제일 가능성보다는 내 코드의 문제일 가능성이 훨씬 높다. 그러나 TypeORM을 사용한 서버가 제대로 작동하지 않는다면 TypeORM의 문제일 가능성이 꽤나 있다.

 익숙하지 않은 문법을 사용할 때는 사후에 디버깅하는 대신 코드 작성 전부터 TypeORM에 대한 멘탈 모델을 검증해봐야한다. 또한 GitHub 이슈 보드에서 해당 feature가 문제가 없는지, 문제가 있다면 대안은 무엇인지 꼭 확인하자.

**때로는 Raw Query로만 해결할 수 있는 문제도 있다**

“이것도 안 된다고?” 싶은 순간이 있을 수 있다. 침착하게 Raw Query를 쓰도록 하자. 0.x 버전의 프로젝트이므로 부족한 기능이 있을 수 있다는 것을 받아들이자.. 

**어디에서도 답을 찾을 수 없는 문제가 있다면 [Slack](https://typeorm.slack.com/join/shared_invite/zt-uu12ljeb-OH_0086I379fUDApYJHNuw#/shared-invite/email)에서 질문하자**

 TypeORM를 사용하는 개발자들이 충분히 많기 때문에, 보통은 GitHub 이슈 보드, SOF, 블로그 등에서 답을 찾을 수 있을 것이다. 그러나 설계 상의 특수한 제약으로 인해 검색되지 않는 문제를 해결해야 한다면, **[질문용 Slack](https://typeorm.slack.com/join/shared_invite/zt-uu12ljeb-OH_0086I379fUDApYJHNuw#/shared-invite/email)**에 도움을 구해보자. 메인 컨트리뷰터 pleerock이 거의 하루 만에 답변을 달아주고 계신다.

### Conclusion

 만약 토이 프로젝트에서 TypeORM을 만족스럽게 사용하다가 좀 더 본격적인 서비스에 도입하려 하는 독자라면, TypeORM의 이슈 보드를 찬찬히 읽어보고 이 버그를 견딜 수 있는지 다시 생각해보면 좋겠다.

 이미 TypeORM을 사용하고 계시다면, 행운을 빈다. 불편함을 견딜 수 없다면 TypeORM을 fork해서 자체적으로 개선하거나, 아예 다른 ORM을 사용하는 방법도 있겠으나 그러기 어려운 상황도 분명 있을 것이다. 이 글의 작은 팁들—아마 이미 알고 계시겠지만—이 도움이 되었기를 바란다.
 