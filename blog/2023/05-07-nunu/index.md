---
authors: nunu
slug: chatgpt-and-prompt-engineering-tutorial
---

# ChatGPT와 Prompt Engineering

혹시 ChatGPT... 사용해보신 적 있으신가요? 😲

ChatGPT(챗지피티)란 OpenAI가 개발한 대화형 🤖인공지능🤖 으로, 최근 엄청난 성능으로 많은 화제가 되고 있습니다. 이에 따라 챗지피티를 활용한 플러그인이나 서비스도 많이 출시가 되고 있는데요, ChatGPT는 [웹사이트](https://chat.openai.com/chat)를 방문하는 거 외에도, API를 발급받아 사용해 볼 수 있습니다.

> [중요] ChatGPT는 웹사이트에서 사용하는 경우 무료이지만, API 사용의 경우 1,000 토큰 당 0.002$이 부과됩니다. 보통 한 단어가 1-2개의 토큰이라고 보시면 됩니다.


### OpenAI API 발급 방법
- OpenAI [웹사이트](https://platform.openai.com/) 방문 후 회원가입을 한다.
- 프로필 클릭 후, Biiling - Payment methods에서 결제수단을 등록한다.
- 이후, User - API keys 클릭 - Create new secret key 클릭
- 화면에 출력되는 key를 다른 어딘가에 잘 저장해두자!

### 코드에서 사용하는 방법 (Python)
먼저 shell을 열고 `openai` package를 설치해줍니다.
```
pip install openai
```

이후 python 파일을 만들어볼까요? 저는 call_chatgpt.py라고 이름을 지어보겠습니다.

```
import openai # openai package를 사용합니다.

openai.api_key="" # 여기 아까 발급받은 key를 넣어줍니다.

messages = [
    {"role": "user", "content": "스팍스로 삼행시 지어줘."
]

response = openai.ChatCompletion.create(
    model= "gpt-3.5-turbo", # ChatGPT의 또 다른 이름입니다. 
    messages = messages,
    temperature = 0,
    max_tokens= 128,
    top_p= 1,
    stop= ["\n\n"]
    )

result = response['choices'][0]['message']['content']
print("ChatGPT Output:", result)
```

그럼 결과가 어떻게 나오는지 봅시다! 
파일을 저장한 뒤, shell에서 call_chatgpt.py를 실행해봅시다.
```
python call_gpt.py
```

저는 다음과 같이 나왔습니다.
> ChatGPT Output: 스팍스는 빛나는 별,
끝없이 펼쳐진 우주의 대장,
데이터 분석의 대명사


앗! 아직 챗지피티가 삼행시는 잘 못하나 보네요.. 하하.

### 코드 설명
##### 1. messages
그럼 좀 더 자세히 코드 설명을 해보겠습니다.

```
messages = [
    {"role": "user", "content": "스팍스로 삼행시 지어줘."
]
```

messages의 타입은 list[Dict]이여야 합니다. 각 Dictionary는 "role"과 "content"의 key를 가지는데, role은 "system", "user", "assistant" 셋 중 하나가 들어갈 수 있습니다.

######  a) role이 "system"일 때, 
content에 보통 "You are an (something) that ... " 의 형태를 넣어줍니다. 채팅을 시작하기 전 첫번째 element로 많이 넣어주는데요, ChatGPT의 역할이 무엇인지 specify 해주기 위해 쓰입니다.

###### b) role이 "user"일 때, 
content에 user가 ChatGPT에게 말하고 싶은 것을 넣어주면 됩니다.

###### c) role이 "assistant"일 때,
content에 ChatGPT가 대답한 것을 넣어주면 됩니다.

즉, 먼저 message에 이렇게 넣어 API를 호출했다고 가정해봅시다.

```
messages = [
    {"role": "system", "content": "You are a CAT that always adds 'meow' at the end."}, 
    {"role": "user", "content": "Hello! What's your name and how are you today?"},
]
```

그럼 이런 대답을 얻게 됩니다.
> Hello! My name is CAT and I'm doing well, meow. How about you?

대화를 이어 나가고 싶으면 어떡하면 될까요? `messages`를 다음과 같이 수정할 수 있습니다.
```
messages = [
    {"role": "system", "content": "You are a CAT that always adds 'meow' at the end."}, 
    {"role": "user", "content": "Hello! What's your name and how are you today?"},
    {"role": "assistant", "content": "Hello! My name is CAT and I'm doing well, meow. How about you?"}, # 방금 생성된 대답 추가해주기.
    {"role": "user", "content": "What? I thought you were an AI model."} # 대화 이어나가기
]
```

자, 이제 다시 호출해봅시다.
>  I am an AI language model, but I am programmed to respond as if I were a cat. So, meow! How can I assist you today?.

대화를 이어서 잘 생성하는 것을 볼 수 있습니다!

---

##### 2. Hyperparameters
API를 호출하는 코드를 보면 함수 파라미터들이 굉장히 많은 걸 볼 수 있습니다. 
각각의 의미를 한번 알아봅시다.

- **model**: 호출하고자 하는 모델의 이름입니다. ChatGPT의 다른 이름인 "gpt-3.5-turbo"외에도, "davinci", "text-davinci-003", "gpt4"(단, GPT4는 현재 API 신청 Waitlist가 있음)등의 다양한 모델들이 있습니다.
- **messages**: 위에서 말한 List[Dict] 형태의 대화기록입니다. 
- **temperature**: 생성된 text의 다양성을 조절하는 수치입니다. 동일한 text input에 대해서, temperature가 0에 가까울수록 일관된 생성 결과가 나오고, 숫자가 커질수록 다양한 텍스트가 생성됩니다. 보통은 0.5 ~ 1.0 사이의 값을 사용합니다.
- **max_tokens**: 생성할 텍스트의 최대 길이(토큰 개수)를 지정합니다.
- **top_p**: top_p의 값이 p일 때 모든 단어들에 대한 확률분포를 생성한 뒤, 가장 확률이 높은 단어들의 확률 합이 p보다 작을 때까지 고른 뒤, 각 단어의 확률을 고려해 그 중 하나 random sampling을 진행합니다.
- **stop**: '\n\n', 즉 newline character가 두 개 연속으로 나올 시에, 생성을 멈추도록 해두었습니다.
---

##### 3. response
API가 반환하는 결과는 dictionary. 어떻게 생겼는지 한번 볼까요?
```
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "I am an AI language model, but I am programmed to respond as if I were a cat. So, meow! How can I assist you today?",
        "role": "assistant"
      }
    }
  ],
  "created": 1683468678,
  "id": "chatcmpl-7DZOYOe97FuYCbqj9LLfGWU1RZ6OB",
  "model": "gpt-3.5-turbo-0301",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 32,
    "prompt_tokens": 79,
    "total_tokens": 111
  }
}
```

다양한 정보들이 들어있지만, 생성된 텍스트만 확인하고 싶을 경우, 반환한 dictionary *D*의
```
D['choices'][0]['message']['content']
 ```
를 통해 이를 추출할 수 있습니다.

## Prompt Engineering

챗지피티와 같은 거대 언어모델의 개발과 함께 어떤 Input을 넣어줘야 AI가 대답을 잘 할 수 있는지에 대한 연구도 활발하게 이루어지고 있는데요, 이를 Prompt Engineering이라고 합니다. 대표적으로, "질문을 어떻게 잘 하는지"가 그 중 하나입니다. 이에 대한 가이드를 [여기서](https://github.com/dair-ai/Prompt-Engineering-Guide) 찾아볼 수 있습니다. 이 외에도, 유명한 기법 2가지에 대해 소개드리려고 합니다.

#### Few-Shot Learning
첫번째는 Few-Shot 러닝입니다. 퓨샷이란 동일한 Task의 예제를 n개 보여준 뒤, 그 후 타겟 문제를 풀 게 하는 방식입니다. 예를 들어, 주어진 문장이 긍정적인지 부정적인지 판단하는 Task가 있다고 가정해봅시다. 일반적인 제로샷(Zero-Shot)의 경우, 모델에 들어가는 input은 다음과 같습니다.

```
다음 문장을 읽고 문장이 긍정적인지 부정적인지 판단하시오.

문장: 사과를 먹자마자 쓴 맛이 입안에 퍼지는 것 같았다.
답:
```
 
 반대로 Few-Shot(n=3)의 경우, input은 다음과 같습니다.
 

```
다음 문장들을 읽고 문장이 긍정적인지 부정적인지 판단하시오.

문장: 오늘 공원에 갔는데 정말 재밌었어.
답: 긍정적

문장: 정말 최악의 영화군요. 다시는 안 볼 것 같습니다.
답: 부정적

문장: 개발을 하느라 밤을 새웠더니 정말 보람찬걸?
답: 긍정적

문장: 사과를 먹자마자 쓴 맛이 입안에 퍼지는 것 같았다.
답:
```

실제로 많은 Task들에서 Few-Shot을 사용할 시 비약적으로 성능이 올라가는 경우가 많습니다. 

#### Chain-of-Thoughts

Chain of Thoughts은 사고 사슬이란 뜻을 가지고 있습니다. 쉽게 말해 step-by-step 사고를 통해 복잡한 reasoning을 필요로하는 문제를 풀어나갈 때 많이 사용되는 Prompting 기법입니다. 실제로 MultiArith라는 문장제 사칙연산 데이터셋에서 GPT3에 이 기법을 사용할 경우 Accuracy가 17.7%에서 78.7%까지 증가한다고 합니다. 사용하는 방법은 간단합니다. 묻고자 하는 질문 뒤에 "Let's think step by step"을 붙여주면 됩니다.. [(Kojima, 2022)](https://arxiv.org/pdf/2205.11916.pdf)

 ChatGPT에 Chain of Thoughts를 적용해봅시다. 다음의 논문을 참고했습니다.  
[When do you need Chain-of-Thought Prompting for ChatGPT?](https://arxiv.org/pdf/2304.03262.pdf)

```
Q: Alice, Bob, and Claire are playing a game. At the start of the game, they are each holding a ball: Alice
has a brown ball, Bob has a red ball, and Claire has a purple ball. As the game progresses, pairs of
players trade balls. First, Bob and Claire swap balls. Then, Alice and Claire swap balls. Finally, Alice and
Bob swap balls. At the end of the game, Bob has the
Which choice is true ? Answer Choices: (A) brown ball. (B) red ball. (C) purple ball. 

A:
```


기존의 언어 모델들은 A, B, 또는 C중에 하나를 답으로 바로 출력하게 됩니다. 그러다보니, 왜 이렇게 나왔는지에 대한 이유도 알 수 없을 뿐더러, 정확도가 떨어지는 경우가 많습니다. Chain of Thoughts를 통해 모델이 어떻게 이 답을 유추했는지도 볼 수 있고, 정확도도 올라간다면, 일석이조라고 할 수 있죠! 물론, ChatGPT는 Chain of Thoguhts를 굳이 안 쓰더라도 답이 왜 이렇게 나왔는지까지 잘 설명해줍니다!


```
At the end of the game, Bob has the purple ball. To see why, let's trace the swaps that occurred during the game. After the first swap, Bob has the purple ball and Claire has the red ball. After the second swap, Alice has the red ball and Claire has the brown ball. Finally, after the third swap, Bob has the purple ball and Alice has the brown ball. Therefore, Bob ended up with the purple ball at the end of the game.

So the correct choice is (C) purple ball.
```

엇 그러면, Chain of Thoughts 기법을 굳이 쓸 필요가 없는 거 아닌가 싶을 수도 있습니다. 다만, 자세히보면 ChatGPT의 답이 틀렸습니다. 정답은 (B) red ball이거든요! 자 이제, Chain of Thoughts를 Prompting 기법을 적용해볼까요?

```
Let's track the movement of each ball throughout the game to determine the final holder of the red ball:

Bob and Claire swap balls:
Bob gives his red ball to Claire and takes her purple ball. Now, Bob has the purple ball and Claire has the red ball.

Alice and Claire swap balls:
Alice gives her brown ball to Claire and takes Claire's red ball. Now, Alice has the red ball and Claire has the brown ball.

Alice and Bob swap balls:
Alice gives her red ball to Bob and takes his purple ball. Now, Bob has the red ball and Alice has the purple ball.

Therefore, at the end of the game, Bob has the red ball. So, the correct choice is (B) red ball.
```

단순히 `A:` 뒤에 `Let's think step by step`을 더해줬을 뿐인데, 답이 정확하게 나오는 것을 볼 수 있습니다!

### 마무리
최근 [AutoGPT](https://github.com/Significant-Gravitas/Auto-GPT)가 Github에서 굉장한 인기를 얻고 있더라구요! AI 분야가 정말 빠르게 변하고 있는 만큼 사람들의 관심도 정말 높아지고 있는 것 같습니다 ㅎㅎㅎ 저도 개발할 때 ChatGPT의 도움을 많이 받는 사람으로써, 앞으로 AI 분야가 더 다양한 방면으로 성장했으면 좋겠습니다🤗