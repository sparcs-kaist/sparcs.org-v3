---
authors: jeuk
slug: asynchronous-programming-for-those-tired-of-waiting
---

# 기다림에 지친 그대에게: 비동기 프로그래밍

## 삶은 기다림의 연속이다

오늘도 점심을 먹으러 식당에 갔습니다. 주문하고 자리에 털썩 앉았지만, 볶음밥에 들어갈 당근이 아직도 밭에 묻혀 있는 건지 준비될 기미도 보이지 않습니다. 심심해서 주변을 둘러보다 은근슬쩍 휴대전화를 꺼내 봅니다.

## 비동기 프로그래밍

기다림은 불가피하지만, 사람은 기다리는 걸 싫어합니다. 그래서 느린 프로그램도 사랑받기 어렵습니다. 오래 걸리는 일이 마무리되길 기다리는 동안 다른 일을 하려는 시도는 더 빠른 프로그램을 만들기 위한 시도입니다. 물리적으로 멀리 떨어진 서버와 통신하기 위해, 사용자에게서 권한을 부여받거나 입력받기 위해서는 오랜 시간을 기다려야 할 수 있습니다. 비동기 프로그래밍은 이렇게 잠재적으로 오래 실행된 작업을 시작한 후 작업이 끝나기 전에 다른 이벤트를 처리할 수 있도록 도와주는 기술입니다. 이 글이 크게 영감을 받은 [비동기적 JavaScript에 대한 MDN 문서](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)도 참고하시면 큰 도움이 되리라고 생각합니다.

## Callback

비동기적 프로그래밍을 사용하는 때에는 작업의 완료 순서가 달라질 수 있기에 작업 A를 비동기적으로 처리하게 되면 작업 A의 결과에 기반한 작업 B는 A의 실행이 완료된 뒤에 실행할 수 있음을 명시적으로 알려주어야 됩니다. 그렇지 않으면 작업 B를 하던 도중에 완료되지 않은 작업 A로 인해 잘못된 정보가 사용될 수 있습니다. JavaScript는 이러한 의존성을 callback의 형태로 표현해 왔습니다. 다시 말해, 비동기적으로 처리할 함수의 인자로 그다음에 실행할 작업을 대개 함수의 형태로 넘겨주는데 이때 넘겨주는 실행 가능한 코드를 callback이라고 부릅니다. 현재 실행되는 작업이 끝나면 다음에 어떤 작업을 할 것인지에 관한 내용이 담겨있는 겁니다.

```js
function makeHotdog(sausage, bread, ketchup) {
  grillSausage(
    sausage,
    (grilledSausage) => {
      combine(
        grilledSausage,
        bread,
        (breadWithSausage) => {
          pourSauce(breadWithSausage, ketchup);
        },
        failureCallback()
      );
    },
    failureCallback()
  );
}
```

callback을 이용한 코드는 작업 간의 순서는 잘 드러내지만, 위와 같이 callback이 연달아 사용되는 경우 지나친 들여쓰기와 함수의 중첩으로 인해 가독성이 떨어지고 잘못된 코드를 작성하기 쉬워집니다. 이러한 callback의 문제점은 개발자들 사이에서 callback 지옥이라고도 불립니다. 또한 단계마다 실패하는 경우를 대비하기 위한 callback을 작성해야만 합니다.

## Promise

앞서 설명한 callback 기반 코드의 문제점을 해결하기 위해 보다 최근에 생겨난 JavaScript의 기능이 Promise입니다. 지금은 아니지만, 언젠가 제대로 된 값을 반환하리라고 약속한다는 개념입니다. 이를 이용하면 들여쓰기와 함수가 중첩되지 않아 callback에 비해 더 가독성이 좋은 코드를 작성할 수 있습니다. 전체 작업이 실패할 때에 대해서만 오류를 처리하여도 충분해서 코드가 더 간결해질 수 있습니다.

```js
function makeHotdog(sausage, bread, ketchup) {
  grillSausage(sausage)
    .then((grilledSausage) => combine(grilledSausage, bread))
    .then((breadWithSausage) => pourSauce(breadWithSausage, ketchup))
    .catch(failureCallback);
}
```

또한 Promise에는 부가적인 기능들도 있어 더 복잡한 논리 구조도 이해하기 쉽게 표현할 수 있습니다. 이를 위해 이전의 예제를 더 복잡하게 만들어보겠습니다.

```js
function makeHotdog(sausage, bread, ketchup) {
  grillSausage(
    sausage,
    (grilledSausage) => {
      sliceBread(
        bread,
        (slicedBread) => {
          reheatBread(
            slicedBread,
            (warmBread) => {
              combine(
                grilledSausage,
                warmBread,
                (breadWithSausage) => {
                  pourSauce(breadWithSausage, ketchup);
                },
                failureCallback()
              );
            },
            failureCallback()
          );
        },
        failureCallback()
      );
    },
    failureCallback()
  );
}
```

위 예제를 자세히 들여다보면 소시지 굽기와 빵 데우기는 서로 의존성이 없는 별개의 과정임을 알 수 있습니다. 이를 고려하며 Promise를 이용해 예제를 다시 작성해보겠습니다.

```js
function makeHotdog(sausage, bread, ketchup) {
  const preparedSausage = grillSausage(sausage);
  const preparedBread = sliceBread(bread).then((slicedBread) =>
    reheatBread(slicedBread)
  );
  Promise.all([preparedSausage, preparedBread])
    .then(([grilledSausage, warmBread]) => combine(grilledSausage, warmBread))
    .then((breadWithSausage) => pourSauce(breadWithSausage, ketchup))
    .catch(failureCallback);
}
```

Promise.all는 주어진 모든 Promise의 작업이 완료될 때까지 기다리는 Promise를 반환하는 함수로 사이트 로딩 전 필요한 글꼴이나 사진이 준비되었는지를 확인하기 위해 사용할 수 있습니다. 동시에 Promise가 하나라도 실패하는 경우 실패에 관한 내용을 담은 Promise를 반환하기 때문에 빠르게 실패하여 부작용을 줄이는 코드를 작성하기 위한 도움을 줄 수 있습니다. Promise는 Promise.all과 같은 여러 부가적인 기능을 제공하고 있습니다. 갈수록 더 많은 코드에 callback 대신 Promise에 기반하여 작성되고 있으므로 Promise를 이해하는 것은 중요합니다. Promise에 대해서 알고 싶으신 분들은 [Promise에 대한 MDN 문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)를 참고해보세요.

여담으로 JavaScript는 단일 스레드로 구성되어 있어 이 예제의 경우에는 사실 Promise.all을 하여도 두 Promise를 빠르게 번갈아 가면서 처리할 뿐 Promise.all을 사용하지 않아도 속도에 있어서 유의미한 차이가 없으리라고 예상합니다. 하지만 서로 다른 서버에 독립적인 정보를 요청하면 각 요청이 끝난 뒤에 다음 요청을 보내는 것을 반복하기보다는 모든 요청을 보내고 기다리는 편이 더 효율적인 방법이 될 것입니다. 두 방법을 비교한 간략한 예시를 준비해 보았습니다.

```js
function fasterFetch() {
  fetchData1().then(fetchData2()).then(fetchData3()).catch(failureCallback);
}

function slowerFetch() {
  Promise.all([fetchData1(), fetchData2(), fetchData3()]).catch(
    failureCallback
  );
}
```

JavaScript의 비동기 프로그래밍의 원리에 대해서 보다 깊게 알고 싶으신 분께는 [Philip Roberts의 강연](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)과 [비동기 프로그래밍과 병렬 프로그래밍의 차이에 대한 Martin Thoma의 글](https://medium.com/plain-and-simple/synchronous-vs-asynchronous-vs-concurrent-vs-parallel-4342bfb8b9f2)을 추천합니다.

## async/await

async와 await는 구문적 설탕으로 새로운 기능을 추가하지 않는 눈속임에 불과하지만, Promise를 더 쉽게 사용하도록 도와줍니다. 앞선 예제를 async와 await를 이용해 다시 한번 작성해보도록 하겠습니다.

```js
async function makeHotdog(sausage, bread, ketchup) {
  try {
    const unpreparedGrilledSausage = grillSausage(sausage);
    const warmBread = await reheatBread(bread);
    const unpreparedSlicedBread = sliceBread(warmBread);
    const [grilledSausage, slicedBread] = await Promise.all([
      unpreparedGrilledSausage,
      unpreparedSlicedBread,
    ]);
    const breadWithSausage = await combine(grilledSausage, slicedBread);
    const hotdog = await pourSauce(breadWithSausage, ketchup);
  } catch (err) {
    handleError(err);
  }
}
```

async/await를 이용하면 기존에 많이 작성해 본 동기적인 코드와 비슷한 형태로 코드를 작성할 수 있다는 장점이 있습니다. 비동기적으로 진행하고 싶은 작업에 await를 붙이고 await가 쓰인 모든 함수에 async를 붙이면 됩니다. 그러나 async가 붙은 함수는 항상 Promise를 반환하기 때문에 자칫 잘못하면 callback 지옥처럼 async와 await가 끊임없이 증가하는 모습을 볼 수도 있습니다. [Aditya Agarwal의 글](https://www.freecodecamp.org/news/avoiding-the-async-await-hell-c77a0fb71c4c/)에 따르면, 이때는 코드 간의 관계를 분석하여 async와 await를 남용하지 않아야 하며 Promise.all을 통해 여러 Promise를 한 번에 처리하면 된다고 합니다.

## Promise의 활용

Promise에 익숙해지면 다양한 일을 할 수 있습니다. 간단하게는 특정 시간 동안 작동을 멈추는 함수를 다음과 같이 작성할 수 있습니다.

```js
async function waitFor(timeInMS) {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, timeInMS);
  });
}
```

callback 형태를 지원하는 API를 Promise로 바꾸면 Promise의 여러 기능과 async/await 문법을 사용할 수 있습니다. NodeJS에서 지원하는 callback 기반 함수인 fs.readfile를 Promise를 반환하는 함수로 바꾸는 예시를 [Zellwk의 글 Converting callbacks to promises](https://zellwk.com/blog/converting-callbacks-to-promises/)에서 인용하겠습니다.

```js
function readFilePromise(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
```

window.onload와 같은 웹 API도 대표적인 callback의 사례입니다.

```js
function waitLoad() {
  return new Promise((resolve, reject) => {
    window.onload = resolve;
  });
}
```

자주 사용되는 웹 API인 document.addEventListener와 같은 이벤트 처리기 또한 callback 기반 코드이기 때문에 Promise로 바꾸고 싶을 수 있습니다. 이벤트 처리기를 Promise로 바꾸면 특정 키보드 키가 눌릴 때까지 기다리는 함수를 만들어 사용할 수 있어서 매우 폭넓은 활용이 가능해집니다. 일반적인 접근은 아니기에 협업하는 경우보다는 프로토타입을 만들거나 게임과 같은 특정 분야에서만 사용하길 권장해 드립니다.

callback 기반 API를 Promise 기반 API로 쉽게 바꾸기 위해서 저는 다음과 같은 속임수를 이용하곤 합니다.

```js
function makeRemotePromise() {
  let resolver = () => undefined;
  let rejector = () => undefined;
  const promise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejector = reject;
  });
  return { promise, resolver, rejector };
}
```

Promise의 생성하는 코드와 Promise를 제어하는 코드가 별개로 존재할 수 있으므로 저는 이를 remotePromise라고 부르곤 합니다.
remotePromise를 이용하여 웹 API와 socket.io에 있는 이벤트 처리기를 Promise 형태로 바꾸어 보겠습니다.

```js
// Web
function waitDOMEvent(type, options) {
  const { promise, resolver } = makeRemotePromise();
  window.addEventListener(type, (e) => resolver(e), options || { once: true });
  return promise;
}

// socket.io
function sendAndWaitResponse(socket, eventName, ...data) {
  const { promise, resolver } = makeRemotePromise();
  socket.once(eventName, (args) => {
    resolver(args);
  });
  socket.emit(eventName, ...data);
  return promise;
}
```

remotePromise를 적절히 사용하면 반대로 외부 라이브러리 등에 의존하지 않고 Promise 기반 이벤트 처리기를 만들 수도 있습니다. 그러나 아래에 소개된 Waiter는 코드의 흐름을 전역에서 바꾸어 동작을 이해하기 어렵게 만들기 때문에 되도록 사용하지 않길 권장합니다.

```js
class Waiter {
  constructor() {
    this.waitMap = new Map();
  }
  getEvent(eventName, args) {
    const { promise } = this.accessEvent(eventName);
    if (args && args.once) {
      this.deleteEvent(eventName);
    }
    if (args && args.timeLimit) {
      const timeLimit = Waiter.waitTime(
        args.timeLimit.timeInMS,
        args.timeLimit.value
      );
      return Promise.race([promise, timeLimit]);
    }
    return promise;
  }
  setEvent(eventName, data) {
    this.accessEvent(eventName).resolver(data);
  }
  deleteEvent(eventName) {
    this.waitMap.delete(eventName);
  }
  accessEvent(eventName) {
    if (!this.waitMap.has(eventName)) {
      this.waitMap.set(eventName, Waiter.makeRemotePromise());
    }
    return this.waitMap.get(eventName);
  }
  static waitTime(timeInMS, value) {
    const { promise, resolver } = Waiter.makeRemotePromise();
    setTimeout(resolver.bind(null, value), timeInMS);
    return promise;
  }
  static makeRemotePromise() {
    let resolver = () => undefined;
    const promise = new Promise((resolve) => {
      resolver = resolve;
    });
    return { promise, resolver };
  }
}
```

## 마무리

지금까지 비동기 프로그래밍의 의미부터 이를 실제로 사용하는 방법인 async/await에 대해서까지 알아보았습니다. 제 글이 조금이나마 도움이 되길 바라며 이만 마칩니다. 읽어주셔서 감사합니다.

## 참고 자료 및 추천 자료

모든 자료는 2022년 11월 4일에 접속되었습니다.

- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
- https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html
- https://medium.com/plain-and-simple/synchronous-vs-asynchronous-vs-concurrent-vs-parallel-4342bfb8b9f2
- https://zellwk.com/blog/converting-callbacks-to-promises/
- https://www.freecodecamp.org/news/avoiding-the-async-await-hell-c77a0fb71c4c/

## 작가의 말

빵을 데우고 잘라야 할지 빵을 자르고 데워야 할지 고민하던 중 써브웨이에서 답을 찾았습니다.
소시지랑 빵도 한 번에 데우려다가 예제가 성립하지 않아 포기했습니다. :P

작동하지 않는 예제나 잘못된 내용에 대한 소중한 의견은 [익명 설문지](https://forms.gle/ZzKzU1qAmoL8m5c79)나 댓글 혹은 jeukhwang.dev@gmail.com으로 남겨주시면 수정하도록 하겠습니다
