# Pattern Matching With TypeScript

## If, Else, Switch문의 한계

하지만 `if-else` 문이나 `switch-case` 문도 존재하는데 왜 패턴매칭을 사용하는 것일까요?

이러한 문법들은 특정 조건이 누락된다면 아무런 대처를 하지 않는다는 단점이 있습니다. 이를 해결하기 위해 중첩된 if문을 많이 활용하지만, 이는 코드의 가독성이 떨어지는 단점이 있죠. 또한 Typescript의 중요한 사용처 중 하나인 TSX 속에서 `if`, `else`, `switch`를 사용하는 유일한 방법은 즉시실행함수를 사용하는 것입니다. 다음 코드 예시를 보시죠.

```tsx
declare let sparcsMember:
  | { status: "sleeping";}
  | { status: "awake"; doing: "cs320 lab" }
  | { status: "error" };

<div>
  {
    (() => {
      switch (sparcsMember.status) {
        case "sleeping":
          return <p>Sleeping, don't wake</p>;
        case "awake":
          return <p>Doing {sparcsMember.data}</p>;
        case "error":
          return <p>Not a SPARCS member</p>;
      }
    })()
  }
</div>;
```

이 방법은 boilerplate도 너무 길고 코드의 가독성도 너무 떨어집니다. 이에 대한 해결방법으로 React는 `ternaries`를 사용하고 있죠. 

## Ternaries의 한계

다음은 nested ternaries를 사용한 예시 React 코드입니다.

```tsx
const MemberComponent = ({ sparcsMember }: Props) => (
  <div>
    {sparcsMember.status === "loading" ? (
      <p>Sleeping, don't wake.</p>
    ) : sparcsMember.status === "awake" ? (
      <p>doing {sparcsMember.doing}</p>
    ) : sparcsMember.status === "error" ? (
      <p>Not a SPARCS member</p>
    ) : null}
  </div>
);
```

읽기는 조금 힘들지만, 잘 작동하고 이러한 로직을 간단하게 표현할 수 있는 유일한 방법이죠. 이러한 이유들로 React에서는 다음을 code branch를 다루는 best practice로 여기고 있습니다.

하지만 여기에도 문제가 있습니다. 바로 exhaustiveness checking을 할 방법이 없다는 것이죠. 다시 말해 default 값을 사용하는 것이 아니라 모든 가능성이 만족 되었는지 체크하고 싶을 때, 체크할 수 있는 방법이 없습니다.

## 패턴 매칭을 사용하는 이유는?

### 패턴 매칭이란?

프로그래밍 언어에서 패턴 매칭(pattern matching)이란 데이터가 특정 패턴(값, 자료구조, 타입, 심지어 함수까지)에 일치하는지 따져 대상을 특정하는 기술입니다.

### TypeScript 내에서의 패턴매칭

사실 이전에도 TypeScript에 패턴 매칭이 필요하다는 의견이 오고 갔습니다. 심지어 2017년에 ECMAScript에 `match`를 추가하자는 의견이 나오기도 했었죠. 당시 `syntax`는 다음과 같습니다.

```tsx
match (sparcsMember) {
  when ({ status: "sleeping" }): <p>Sleeping, don't wake</p>
  when ({ status: "awake", doing }): <p>{doing}</p>
  when ({ status: "error" }): <p>Not a SPARCS member</p>
}
```

### TS-Pattern

TypeScript에 패턴매칭이 필요하다고 생각한 사람들은 사용성과 type safety를 모두 만족시키는 라이브러리를 만들기 시작했고, ts-pattern이라는 라이브러리가 완성되었습니다.

이를 이용해 작성한 코드를 살펴보죠.

```tsx
declare let sparcsMember:
  | { status: "sleeping" }
  | { status: "awake"; doing: string }
  | { status: "error" };

<div>
  {match(sparcsMember)
    .with({ status: "sleeping" }, () => <p>Sleeping, don't wake</p>)
    .with({ status: "awake" }, ({ doing }) => <p>{doing}</p>)
    .with({ status: "error" }, () => <p>Not a SPARCS member</p>)
    .exhaustive()}
</div>;
```

ts-pattern 내에서 패턴은 object, array, 등등 어떠한 자료구조로든지 정의될 수 있으며, `P`를 사용해서 정의합니다.

```tsx
const output = match(x)
  // Intergers
  .with(1, (x) => ...)
  // Many patterns:
  .with(null, undefined, (x) => ...)
  // Objects
  .with({ x: 10, y: 10 }, (x) => ...)
  // Arrays
  .with(P.array({ firstName: P.string }), (x) => ...)
  // Tuples
  .with([1, 2, 3], (x) => ...)
  // Maps
  .with(new Map([["key", "value"]]), (x) => ...)
  // Set
  .with(new Set(["a"]), (x) => ...)
	// Wildcard
	.with(P._, () => ...)
	// Specific type
	.with({ name: P.string, age: P.number }, (user) => ...)
  // Mixed & nested
  .with(
    [
      { type: "user", firstName: "Gabriel" },
      { type: "post", name: "Hello World", tags: ["typescript"] }
    ],
    (x) => ...)
  .otherwise(() => ...)
```

### 단점

타입 추론과 `exhaustiveness checking`이 제대로 작동하기 위해 ts-pattern은 `type level computation`에 의존하기에 `typechecking` 의 속도를 늦출 수 있습니다. 하지만 컴파일 타임이 느린 대가로 유지보수가 편한 코드와 `type safety`를 줍니다. 따라서 각자가 자신의 프로젝트에 알맞다고 생각되는 경우에 사용하시면 될 것 같습니다.