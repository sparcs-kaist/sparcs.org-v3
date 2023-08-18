---
authors: happycastle
slug: flutterinappwebview-front-communication
---

# FlutterInAppWebView와 Front-end 간의 통신 방법

안녕하세요. Taxi팀 앱 개발 담당하고 있는 손성민(happycastle)입니다.

Flutter로 하이브리드 앱 개발을 진행하다보면, 웹에서 앱에 토큰을 전달하거나, 로그인 상태를 공유하는 등 Front-end 간 통신할 필요성이 생깁니다.

Flutter에서 주로 사용되는 WebView 라이브러리는 FlutterInAppWebView, FlutterWebView가 있지만, FlutterInAppWebView에서 사용되는 방식에 대해 다루고자 합니다.

## Javascript Handler

### Javascript -> Flutter

InAppWebViewController에 JavascriptHandler를 등록하고, Front-end에서 해당 Javascript Handler를 호출하여 Flutter 코드를 실행시킬 수 있습니다.

```
controller.addJavaScriptHandler(handlerName: 'myHandlerName', callback: (args) {
    return {
      'bar': 'bar_value', 'baz': 'baz_value'
    };
  });
```

다음과 같이 Javascript Handler를 Controller에 등록할 수 있습니다.

매개변수를 받을 수 있으며, 매개변수의 형식은 List 형태로 전달됩니다. 매개변수가 들어간 순서대로 List에 추가되게 됩니다.
딕셔너리 형식으로 매개변수를 전달한 경우에도, Dart의 Map과 같은 방식으로 값을 가져올 수 있습니다. dart:convert 라이브러리의 jsonEncode를 사용하여 자동으로 변환합니다.

전달할 인자도 return을 사용해서 javascript handler의 반환값으로 사용할 수 있습니다.

비동기를 지원하여 async, await를 사용하여 함수를 구현할수도 있습니다.

다음과 같이 Front-end에서 Flutter에 등록된 Javascript Handler를 호출할 수 있습니다.

```
window.flutter_inappwebview.callHandler(handlerName, ...args)
```

다만, flutterInAppWebViewPlatformReady Event가 발생하고 난 이후부터 Event Handler 호출을 할 수 있습니다.

그래서 다음과 같이 Flutter Webview에서 호출을 받을 준비가 되었는지 여부를 체크해야합니다.

```
var isFlutterInAppWebViewReady = false;
window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
 isFlutterInAppWebViewReady = true;
});
```

### Flutter -> Javascript

반대로 Javascript 함수를 Flutter에서 호출하는 것도 가능합니다. 간단하게 ***InAppWebViewController.evaluateJavascript*** 를 사용하면 됩니다.

다음은 공식 문서에 있는 예시 코드입니다.

```
controller.evaluateJavascript(source: "new XMLSerializer().serializeToString(document);");
```

비동기함수를 실행하기 위해서는 ***InAppWebViewController.callAsyncJavaScript*** 를 사용할 수 있습니다.

다음은 공식 문서에 존재하는 예시 코드 입니다.

```
onLoadStop: (controller, url) async {
  final String functionBody = """
var p = new Promise(function (resolve, reject) {
   window.setTimeout(function() {
     if (x >= 0) {
       resolve(x);
     } else {
       reject(y);
     }
   }, 1000);
});
await p;
return p;
""";

  var result = await controller.callAsyncJavaScript(
    functionBody: functionBody,
    arguments: {'x': 49, 'y': 'my error message'});
  print(result?.value.runtimeType); // int
  print(result?.error.runtimeType); // Null
  print(result); // {value: 49, error: null}

  result = await controller.callAsyncJavaScript(
    functionBody: functionBody,
    arguments: {'x': -49, 'y': 'my error message'});
  print(result?.value.runtimeType); // Null
  print(result?.error.runtimeType); // String
  print(result); // {value: null, error: my error message}
},
```

## 참고 및 인용자료

[FlutterInAppWebView v6.0.0 공식문서] : https://inappwebview.dev/docs/webview/javascript/injection
