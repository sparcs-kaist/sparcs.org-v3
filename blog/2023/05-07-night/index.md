---
authors: night

slug: reactive-programming
---
# 반응형 프로그래밍이란?

> **주의 사항**
> 
> 본 문서는 웹 프로그래밍 - 특히 프론트엔드 - 역사의 관점에서 작성한 문서로, 다른 도메인에서 이용하는 반응형 프로그래밍과는 다소 차이가 있을 수 있습니다.
> 
> 만약 다른 도메인에 대한 정보를 추가하고 싶거나, 보다 전체적인 프로그래밍 역사의 관점에서의 내용을 추가하고 싶으시다면 PR로 내용 추가를 부탁드립니다.
> 
> (특히 게임 개발 쪽과 어떤 관련이 있을지에 대해서 알고 싶어지네요)

<br/>

## 1. 반응형 프로그래밍의 정의

[Reactive Programming - Wikipedia](https://www.wikiwand.com/en/Reactive_programming)
반응형 프로그래밍 (Reactive Programming) 은 프로그래밍 패러다임 중 하나로, **데이터 스트림과 변경 사항의 전파** 를 기준으로 로직을 작성하는 기법입니다.

CPU 및 저수준 언어는 일반적으로 명령형 (Imperative) 방식으로 동작합니다. 기계어로 처리되는 명령들이 모두 명령형이기 때문입니다 (ex. LDA, MOV, ADD ... 등 모두 A에서 B로 이동하여라, 특정 값에 연산을 진행하여라 와 같이 명령형으로 프로그램을 작성하게 됩니다.)

명령형 프로그래밍 (Imperative Programming) 에서는 예를 들어 다음과 같이 코드를 작성할 수 있습니다.
```c
int b = 1, c = 2;
int a = b + c;
printf("%d", a); // 3을 출력
b = 3;
printf("%d", a); // 3을 출력
```
첫 printf 문이 실행되었을 때의 변수 a의 값은 변수 b, c에 들어 있는 값들을 더한 값이 저장되며, 이후 b, c의 값을 변경하여도 변수 a에 저장되어 있는 값을 명시적으로 변경해 주지 않았으므로 계속 같은 값이 출력되게 됩니다.

만약 업데이트 된 b + c의 값을 출력해 주고 싶다면 "두 값을 더한 결과를 변수 a에 다시 저장해 주어라" 라는 명령을 내려 주어야 합니다.

```c
...
printf("%d", a); // 3을 출력
b = 3;
a = b + c; // 관계를 다시 평가
printf("%d", a); // 3 + 2 = 5 를 출력
```

반면, 관계형 프로그래밍에서는 **여러 데이터 사이의 관계** 에 초점을 두고 있습니다.

예를 들어 두 변수 사이의 관계를 지정해 줄 수 있는 특별한 연산자 `$=` 를 정의한다고 해 봅시다.

그러면 위 코드를 다음과 같이 작성할 수 있게 됩니다.

```c
int b = 1, c = 2;
a $= b + c; // a를 b와 c사이의 덧셈 "관계" 로 선언
printf("%d", a); // 1 + 2 = 3을 출력
b = 3;
printf("%d", a); // 3 + 2 = 5를 출력
```

마지막 printf 문에서 놀랍게도 a의 값 또한 변경되었음을 확인할 수 있습니다. (신기하지 않나요?)


---

반응형 프로그래밍의 가장 오래된 예시는 바로 엑셀과 같은 스프레드시트 프로그램 입니다. 
엑셀을 열어 셀에 다음과 같은 값을 입력하고, A1, B1 셀에 각각 1, 2를 입력하고 C1 셀에 아래 수식을 입력해 봅시다.
```
= A1 + B1
```
이때 A1 셀에 있는 값을 변경하게 되면, C1 셀의 값이 자동으로 업데이트 되는 것을 확인할 수 있습니다.

이처럼 엑셀 수식은 반응형 프로그래밍 언어입니다.


<br/>

## 2. 반응형 프로그래밍은 어디에서 이용하나요?
참고: [요즘 IT : 프로그래밍 패러다임과 반응형 프로그래밍 그리고 Rx](https://yozm.wishket.com/magazine/detail/1334/#:~:text=%EB%B0%98%EC%9D%91%ED%98%95%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%80%20%EC%8A%A4%ED%94%84%EB%A0%88%EB%93%9C,%EC%9E%88%EB%8A%94%20%EA%B4%80%EC%A0%90%EC%9D%84%20%EC%A0%9C%EA%B3%B5%ED%95%B4%EC%A4%8D%EB%8B%88%EB%8B%A4.)

반응형 프로그래밍은 많은 곳에서 이용 하였지만, 최근 가장 많이 관심을 받고 있는 분야는 바로 **웹 프론트엔드 개발** 입니다. 

HTML 5 의 도입과, Fetch/XHR 을 도입하므로서 웹 프론트엔드는 기존의 서버에서 한 번에 모든 콘텐츠를 다운 받아 화면에 표시하고, 사용자의 인터랙션에 대한 업데이트를 페이지 로드 기준으로 하는 방식에서 점점 JS를 이용하여 동적으로 사용자의 인터랙션에 "반응" 하는 방식으로 발전해 왔습니다.

문제는 이런 API 요청이나, 클라이언트의 이벤트에 반응하는 것은 모두 비동기적 event-driven 방식으로 동작한다는 것입니다. (웹에서 비동기가 선택된 여러 이유가 있지만, blocking IO가 많은 특성상 리소스를 절약할 수 있고 event에 즉각적으로 대응할 수 있는 장점이 있습니다.)

이러한 패턴은 최신 웹 프레임워크의 Core Philosophy 에서 찾아볼 수 있습니다. (예를 들어서 React의 이름이 React인 이유는, 상태에 View가 "React" 하기 때문입니다 (물론 React는 순수 Reactive가 아니기는 합니다...))


요즘 가장 많이 사용되는 프레임워크인 React에서는, 다음과 같이 상태 업데이트를 진행할 수 있습니다.

```tsx
const Component: React.FC = () => {
  const [count, setCount] = React.useState<number>(0)
  return (
    <div>
      <p>I Have clicked the counter { count } times!</p>
      <button onClick={() => setCount((prev) => prev + 1)}/>
    </div>
    )
}

```

버튼을 누르면 "count" 변수의 상태 업데이트를 React에 요청하게 되며 (setCount), React에 의해 해당 변수에 구독되어 있는 UI가 자동으로 업데이트 되게 됩니다.

개발자인 저희는 명시적으로 UI 업데이트를 명령해 주지 않아도, 단순히 데이터와 UI 사이의 관계를 정의해 주는 것 만으로 해당 변수 업데이트 -> 해당 변수에 구독하는 UI 업데이트를 구현할 수 있습니다. (이런 패턴은 선언형 프로그래밍 (Declarative Programming), MVVM (Model-View-viewmodel)이라고도 합니다)

두 데이터 사이에 연관성이 있는 경우에도 다음과 같이 쉽게 구현할 수 있습니다.
```tsx
const Component: React.FC = () => {
  // 이렇게 useEffect로 연결된 상태 업데이트를 진행하는 것은 상태 업데이트에 의해 render가 여러 번 돌게 되고, 두 상태가 unsync 될 수 있으므로 anti-pattern 입니다. 
  // 실제로 연결된 데이터는 pure function으로 그 관계를 표현해 주어야 합니다.
  const [postList, setPostList] = React.useState<string[]>([])
  const [postCount, setPostCount] = React.useState<number>(0)

  // postList와 postCount 사이의 관계를 정의 -> postList 값이 업데이트 되면, postCount 값이 업데이트
  React.useEffect(() => {
    setPostCount(postList.length)
  }, [postList])
  
  return (
    <div>
      <p>포스트 개수 { postCount }</p>
      { postList.map((el, i) => <p key={i}>{el}</p>) }
    </div>
  )
}
```

반응형 프로그래밍 패러다임의 장점은, 다양한 event source가 있고, 연결되어 있는 View, Data 가 복잡해도 단순히 변수의 값을 업데이트 하는 event를 보내면 자동으로 UI 업데이트가 진행이 된다는 점입니다.

만약 명령형으로 구현하게 된다면, 해당 count 상태를 업데이트 하는 모든 곳에서 count 변수를 이용하는 모든 곳을 업데이트 하는 로직을 짜 주어야 하겠죠.

React 뿐만 아니라 VueX, Svelte, SolidJS 모두 프레임워크의 근간으로 반응형 프로그래밍을 채택하고 있습니다. (최신 프레임워크들은 모두 JSX와 같은 Templating 기능을 통한 선언형 UI와, state / signal을 이용한 반응형 프로그래밍을 제공하는 것을 주 기능으로 하고 있습니다)

예를 들어 Svelte는 반응형 프로그래밍을 Virtual Dom 없이 Compilation 방식으로 구현하고 있습니다. 
[보다 자세한 내용은 여기에서 소개하고 있습니다ㅌ](https://frontside.com/podcast/svelte-and-reactivity-with-rich-harris/)


```svelte
<script>
	let name = 'world';
	let count = 0;
</script>

<h1>Hello {name}!</h1>
<input bind:value={name}>

<button on:click={() => count += 1}>
	Clicks: {count}
</button>
```

svelte는 컴파일러를 통해 `count + 1` 연산문을 `$$invalidate()` 이벤트로 변환되게 되고, 이렇게 변수를 업데이트 하게 되면 자동으로 UI에 업데이트 되어 표시되게 됩니다.

최근에 나온 SolidJS 또한 `Signal` 이라는 개념을 통해 반응형 프로그래밍을 제공하고 있습니다. 

```tsx
import { render } from "solid-js/web";
import { onCleanup, createSignal } from "solid-js";

const CountingComponent = () => {
  const [count, setCount] = createSignal(0);
  const interval = setInterval(
    () => setCount(count => count + 1),
    1000
  );
  onCleanup(() => clearInterval(interval));
  return <div>Count value is {count()}</div>;
};

render(() => <CountingComponent />, document.getElementById("app"));
```

`signal`을 통해 데이터 사이의 관계를 정의하는 기능을 지원하고 있고, React와 같이 JSX를 이용하여 선언형 프로그래밍 또한 지원하고 있습니다.

그 외에도 RxJS, Event Stream 등등 반응형 프로그래밍 패러다임을 이용하는 수많은 라이브러리 들이 있습니다.


## 3. 반응형 프로그래밍의 구현
반응형 프로그래밍은 런타임에서 종속성 사이의 그래프로 정의되게 됩니다. 값 업데이트가 발생하면 값 업데이트를 전파하는 방식으로는 다음이 있습니다.

**Pull 방식**

값을 구독하는 Consumer에서 주기적으로 업데이트된 값을 가져오는 방식으로, 주기적으로 Provider의 값을 Polling 하여 구현하게 됩니다. 

**Push 방식**

Provider의 값 업데이트가 있을 때 Consumer에 값을 Push 하여 가져오는 방식입니다. 일반적인 Control 주체가 역전되었다는 점에서 Inversion of Control의 한 에시이기도 합니다.

**Push-Pull 방식**

상태를 그래프 전체에 Push 하는 것이 어려운 경우, 단순히 상태 업데이트가 발생하였다는 사실만을 Push 하여 필요할 때 Consumer에서 Pull 하는 방식으로도 반응형 프로그래밍을 구현할 수 있습니다.

---

반응형 프로그래밍을 실제 코드에 도입하는 과정에서 다음과 같은 문제가 있을 수 있습니다. React에서 해당 이유로 발생하는 문제와 같이 확인해 보도록 하겠습니다.

**Glitches**

Glitch는 업데이트 순서의 차이로 인해 evaluation에 오류가 발생하는 경우입니다.

예를 들어 

```javascript
t = seconds + 1
g = (t > seconds)
```
로 정의하게 되면, t의 값이 늦게 업데이트 되는 경우, g는 `g = (seconds + 1 > seconds)` 로 항상 참이여야 하지만 거짓으로 평가되는 경우가 생길 수 있습니다.

React에서 Glitch 는 useEffect로 연결된 상태를 업데이트 할 때 발생할 수 있습니다.

예를 들어 위 예시를 다음과 같이 작성한다면,

```tsx
const [t, setT] = React.useState<number>(0)
const [seconds, setSeconds] = React.useState<number>(0)
React.useEffect(() => {
  setT(seconds + 1)
}, [seconds])

...
<div>항상 참: { t > seconds }</div>
```

seconds 의 값이 업데이트 될 경우, useEffect 내부의 setT는 한 render 뒤에 실행되게 되므로 `t > seconds` 가 거짓으로 평가되는 렌더가 발생하게 됩니다.

이러한 문제를 해결하기 위해서는, 다음과 같이 코드를 작성할 수 있습니다.

```tsx
const [seconds, setSeconds] = React.useState<number>(0)
const t = seconds + 1; // 관계 명시

...
<div>항상 참: { t > seconds }</div>
```

몇 몇 반응형 프로그래밍 언어에서는, Topological Sorting을 이용하여 업데이트 순서를 항상 동일하게 유지하여 Glitch를 제거하고 있습니다.

**Cyclic Dependencies**

위에서 반응형 프로그래밍은 종속성 사이의 그래프로 표현된다고 하였습니다. 
상태 업데이트가 그래프로 진행 된다면, 그래프 내 회로 (Cycle)가 존재하는 경우 무한 루프에 빠지는 경우가 발생하게 됩니다. (따라서 상태 Tree라고도 이야기 합니다.)

대표적으로 React에서는 다음과 같이 무한 루프를 만들 수 있습니다.

```tsx
const [t, setT] = React.useState<number>(0)
React.useEffect(() => {
  setT(t => t + 1)
}, [t])
```

이런 Cyclic Dependency 들은 "Back Edge" 혹은 delay를 도입하여 사이클에서 벗어나는 방식으로 해결할 수 있습니다. 

React에서는 useEffect의 memoization을 활용하는 것으로 cyclic dependency 를 벗어날 수 있습니다.

**Interaction with mutable state**

반응형 프로그래밍에서 데이터 사이의 관계는 순수 함수로 구현되어 있음을 가정합니다. 이는 업데이트 순서를 언어나 프레임워크에서 최적화를 위해 결정할 수 있게 함입니다.

React에서는 이를 render의 idempotency (멱등성)를 보장하는 것으로 표현하고 있습니다. 예를 들어 다음 코드는 mutable state를 상태 업데이트와 함께 이용하고 있습니다.

```tsx
let m = 0
const Component: React.FC = () => {
  const [t, setT] = React.useState<number>(0)
  m ++ // Mutable한 값을 변경!
  
  return (
    <div>
      { t + m }
    </div>
  )
}
```

위 코드는 컴포넌트의 render가 몇 번 도는지에 따라 m의 값이 변경되게 되고, t+m 과 t 사이의 관계는 예측할 수 없게 됩니다.

따라서 데이터 사이의 관계를 표현할 때는, mutable 한 state를 이용하지 말아야 합니다.

## 4. 결론
위에서 소개한 여러 예시와 같이 반응형 프로그래밍은 현대 웹 프로그래밍에서 많이 이용되고 있으며, 사용자 및 외부 상태에 빠르게 반응하는 프로그램과 인터페이스를 설계하는데 있어 필수적인 개념입니다.

React와 같이 널리 사용되는 프레임워크에서도 반응형 프로그래밍의 개념을 많이 활용하고 있는 만큼, 반응형 프로그래밍의 사고방식과 잠재적인 오류 상황들을 알고 있다면 보다 빠르고 안전하게 코드를 작성할 수 있습니다.

혹시 본문에 오류가 있거나, 예시를 추가할 수 있다면 PR 코멘트 남겨 주세요! 😀