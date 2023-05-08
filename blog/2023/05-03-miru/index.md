# **가볍고 유능한 DB, Redis**
안녕하세요, SPARCS에서 개발자로 활동 중인 Miru 입니다.  
<br/>

## **데이터베이스**
데이터 베이스, 이하 DB는 좋은 서비스를 구현하기 위해서 빠져서는 안될 필수 부가결 적인 존재입니다. 많은 정보를 효율적으로 관리하고, 안전하게 보호하며, 안정적으로 유지해주는 DB는 수많은 개발자들에게 사랑을 받아왔습니다.
개발자들의 모든 것이 그렇듯, DB에도 다양한 종류가 있습니다. Relation 개념을 사용하는 SQL과 그것을 사용하지 않고 정보를 단순히 적재하는 NoSQL, 그리고 전혀 다른 형태의 시스템을 가지는 DB도 다수 존재합니다.

단순히 정보를 저장하고 사용하는 개념을 넘어서서, 원하는 정보를 선택적으로 얻어내는 쿼리문, 가장 효율적으로 새로운 정보를 입력하고 추출하는 DBMS와 연계된 오늘날의 DB는 엄청난 사용성을 자랑하고 있습니다.
  

## **작지만 빠른 DB**
관계형 데이터베이스를 사용하는 MySQL 이나 비관계형 데이터베이스를 사용하는 MongoDB는 많은 정보를 오랫동안 저장하고 관리하는 것에 특화되어 있지만, 그 속도가 빠른 속도라고 판단하기에는 어려움이 있습니다. 때문에 잦은 입력과 출력, 그리고 삭제 명령어를 전송하여 실행하게 된다면, 소프트웨어의 병목이 되는 가능성이 생기게 됩니다.

때문에, 불필요하게 무거운 DB를 사용하지 않아도 될 때에는, 조금 더 가볍고 효율적인 DB를 사용하는게 도움이 될 때도 있습니다. 가령 예를 들어, 어떤 홈페이지의 로그인 유저 목록을 관리하고 싶다거나 말이죠. 그럴 때 사용할 수 있는 것이 바로 **Redis** 입니다. Redis 는 Remote Dictionary Server의 약자로써, 다른 데이터베이스들과는 달리 특이하게 Key - Value 형식으로 저장되어 있는 형태로 정보를 저장/제공하는 DBMS입니다. 관계형 데이터베이스에서 Primary Key를 사용하여 다른 Attribute를 제공하는 것과 같이, Redis에서는 Key를 Primary Key 처럼 사용하면서, Value 하나만을 돌려줄 수 있습니다.

이렇게 보면 Redis보다도 SQL이 상위호환처럼 보일 수도 있습니다. 하지만 Redis의 장점은 굉장히 빠른 속도에 있습니다. Redis의 속도 성능에 관해 조금 찾아보다보면 Memcached 의 속도와 비교하는 모습을 자주 볼 수 있습니다. Redis의 속도 성능은 정보를 캐싱하는 것과 크게 다르지 않지만, Sorting, 복제, 저장, 트랜잭션까지 DB의 특징까지 가지고 있다는 장점이 있습니다.
<br/>
![HTTP_Image](./redis_logo.png)
-redis-

물론 Redis가 단순히 2가지 값을 연결 짓는 Key-Value 형태만 지원하는 것은 아닙니다. list 나 hash, 그리고 그 이외에도 다양한 기능을 지원하는 만큼 마음만 먹으면 MongoDB 같은 비관계형 데이터베이스를 흉내내는 것도 무리는 아닐 것입니다. 하지만 여기서 알아야할 것은, Redis의 장점은 단순한 구조와 그에 상응하는 굉장한 속도에 있다는 것입니다.
<br/>
## **Redis의 사용분야**
앞서 설명했듯, Redis는 Key-Value Pair의 형태로 정보를 저장하면서, 빠른 속도로 입력하고 읽어들이는 것과, 또 삭제하고 업데이트하는 것을 도와주는 DBMS입니다. 이 때문에 특징적인 기능 때문에 Redis의 장단점이 확실하게 나타납니다. 또한, 이 때문에 활용될 수 있는 분야도 어느정도 제한되는 편입니다.

Redis 는 가장 흔하게 사용되는 곳으로는, 홈페이지의 로그인된 사람들의 목록을 찾고, 기록하기 위해 사용되는 것입니다. 각각의 클라이언트에서 특정한 UID를 저장하고 있거나 Cookie로 기록을 하고, 홈페이지에 진입을 할 때마다 Redis에 UID-사용자 이름(로그인 정보)로 이어진 Pair을 검색하면 홈페이지에서는 해당 UID를 보고 이 사용자의 정보에 빠르게 접근할 수 있으며, 또 홈페이지에서는 현재 로그인된 유저 수나 목록을 Redis로 직접 저장할 수 있습니다. 이 때문에 Redis는 다른 DB 종류들과 함께 사용되는 경우가 많습니다. 제가 PM을 맡고 있는 Biseo 에서도 Redis를 이런 방식으로 사용합니다.

다른 한가지의 또 다른 사용방법은 API limit을 가하는 경우에도 사용될 수 있습니다. 어느 특정 API를 유료로 제공하는 서비스에서, 어느 유저가 API를 얼마나 많이 사용했는지 기록할 필요가 있다면 Redis를 유용하게 사용할 수 있을 것입니다. API의 특성상 전세계의 사람들에게서 엄청난 숫자의 접근이 굉장히 짧은 시간 내에 이루어질 것이고, 이를 관리하는 것도 그만큼 빨라야 할 것입니다. 이 때문에 유저 아이디 - API 접근 횟수 Key-Value Pair을 만들면 빠른 속도로 이를 관리할 수 있을 것입니다.

Redis의 사용 방법은 정말 간단합니다. 그만큼 개발자의 역량이나 아이디어에 따라 갖추게 되는 모습은 정말 다양해지죠.

## **사용 방법**
이후부터는 간단하게 Redis의 사용 방법에 관해 알아보겠습니다. Redis 또한 다른 평범한 DBMS와 마찬가지로 Connection을 만든 이후, 원하는 명령을 실행하면 됩니다.

```cmd
npm install redis
```
npm을 통해 redis를 설치하면서 시작됩니다.

백 엔드 page.tsx
```javascript
const redis = require("redis");
const redis_client = redis.createClient(6379,"127.0.0.1");
client.on("error",(err) =>{
  console.error(err);
});

client.on("ready", ()=>{
  console.log("redis client created");
});
```
이를 통해 굉장히 간단하게 Redis의 클라이언트를 생성할 수 있습니다.
<br/>
이 이후로는, Redis의 기본적인 함수들을 사용해서 유용한 함수들을 사용하면서 원하는 Feature을 구현해나가면 되겠습니다.

```javascript
...
client.set('Key1','Value'); //Key-Value 로 String 을 저장합니다
client.get('Key1', function(err, reply) {
  console.log(reply);
})

client.hmset('Key2','Name1','Value1','Name2','Value2','Name3','Value3');//Hash 형태로 저장합니다.
client.hgetall('Key2', function(err, object) {
  console.log(object);//{ Name1 : 'Value1', Name2 : 'Value2', Name3 : 'Value3' }
});

client.rpush(['Key3', 'Value1', 'Value2'], function(err, reply) {
  console.log(reply); // 2
});
client.lrange('Key3', 0 ,-1, function(err, reply) {
  console.log(reply); // [ 'Value1', 'Value2' ];
})
...
```
이 이외에도 Redis에는 다양한 자료구조를 활용할 수 있는 함수를 제공합니다. 

## **마무리하며**
저는 개발을 하면서, 항상 좋은 기술 스택에는 어떤 것이 있는지, 또 어떤 새로운 기능을 접했을 때 가장 가슴이 뛰는지 생각해보았습니다. 제가 내렸던 결론은, 개발자에게 가장 많은 선택의 여지를 남겨주는 기술이 가장 유용하다는 것이었습니다.

개발의 세계에서는 정말 셀 수 없이 다양한 DB의 종류가 존재하고, 같은 DB의 종류일지라도 다른 DBMS를 사용하여 완전히 새로운 개발 환경을 제공하는 경우들도 많이 있습니다. https://db-engines.com/en/ranking 를 참고해보면 정말 많은 DB를 사용한다는 것을 찾을 수 있습니다. 많은 사람들은 DB를 굉장히 무겁고, 단단하며, 또 극한으로 저장의 성능을 끌어올린 기술이라고 생각하는 경우가 정말 많을 것이라고 생각합니다. Redis라는 DB는 기존의 고정관념을 깨고, DB라는 개념이 어떤 방향으로 발전해나갈 수 있는지, 또 어떻게 활용될 수 있을지 많은 개발자들에게 영감을 줄 수 있었으면 좋겠습니다. 
## 참고
https://db-engines.com/en/ranking
https://redis.io/docs/
https://luran.me/359
