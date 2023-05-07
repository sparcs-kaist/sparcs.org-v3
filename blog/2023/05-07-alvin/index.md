# Flutter에서의 State management

안녕하세요! 현재 뉴아라 앱 개발을 담당하고 있는 김상오(alvin)입니다. 앱을 개발하면서 고려해야할 사항들은 매우 다양하지만 그 중에서도 중요하게 다루어져야 하는 부분 중 하나가 바로 상태 관리(State management)라고 생각합니다. Flutter에서는 다양한 state 관리 방법을 지원하고 있으며 현재 뉴아라 및 다른 스팍스 앱에서는 상태 관리에 Provider라는 디자인패턴을 활용하고 있습니다. 저는 이번 기술블로그를 통해 Provider 및 Flutter에서 제공하는 다른 state 관리 방법에는 무엇이 있는 지에 대해 알아보고자 할 것입니다. 각각의 state 관리 방법에 대한 설명 및 간단한 Counter 애플리케이션 코드를 통해 예시를 제공할 것입니다.

## setState() 함수 이용하기

아래 소개될 다른 방법보다 비교적 low-level한 상태 관리 방법입니다. setState() 함수를 이용하면 단일 위젯에서 state를 간단하고 편리하게 관리할 수 있습니다. 아래 예시는 setState() 함수를 이용한 Counter 앱 예시 코드입니다. _counter 변수의 값을 setState() 함수를 이용하여 업데이트하는 것을 확인할 수 있습니다.

```dart
import 'package:flutter/material.dart';

class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;  // setState()를 이용하는 부분
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      ...
    );
  }
}
```

위 코드에서 알 수 있듯이 setState() 함수는 다른 state 관리 방법보다 간편합니다. 따라서 단일 위젯에서 state를 관리하는 경우에 setState() 함수가 가장 좋은 방법이 될 수 있습니다. 그러나 이 방법은 앱의 규모가 커짐에 따라 state 관리가 복잡해지면 사용에 부적합해집니다. 특정 위젯이 다른 위젯들과 state를 공유해야 하는 경우에 setState() 함수로만 구현하기에는 어렵습니다. 그리고 setState()를 호출하는 경우 해당 위젯과 그 하위에 있는 위젯들이 다시 빌드되는데 위젯트리가 깊을 경우 비효율적일 수 있습니다.

## Provider

Provider는 BuildContext를 이용한 의존성 주입(Dependency Injection) 패턴을 기반으로 합니다. 의존성 주입이란 위젯에서 필요한 객체, state를 외부에서 주입하여 의존성을 해결하는 디자인 패턴입니다. 이를 통해 코드의 결합도를 낮출 수 있게 됩니다. Provider에서는 의존성 주입을 통해 상위 위젯에서 생성된 객체 및 state를 하위 위젯으로 전달할 수 있고 이를 통해 하위 위젯에서 필요로 하는 데이터를 쉽게 사용할 수 있습니다. Provider에서는 의존성 주입을 위해 Provider.of, Consumer 등의 위젯을 제공합니다.

Provider를 이용한 Counter 앱 구현은 아래와 같습니다.

```dart
class Counter with ChagneNotifier {
    int _counter = 0;
    int get counter => _counter;
    void increment() {
        _counter++;
        notifyListeners();  // state가 변경되었음을 구독자들에게 알려주는 역할
    }
}
```

```dart
import ...

void main() {
    runApp(
        ChangeNotifierProvider(
            create: (context) => Counter(),
            child: MyApp();
        ),
    );
}

class MyApp extends StatelessWidget {
    ...
    return MaterialApp(
        home: Home(),
    );
}

...
class _HomeState extends State<Home> {
    @override
    Widget build(BuildContext context) {
        return Scaffold(
             ...
             Text(
                 Provider.of<Counter>(context, listen: true).counter,
             ),
        );
    }
}
```

## GetX

GetX는 단순하고 직관적인 API를 제공하여 효율적으로 state 관리를 할 수 있도록 도와줍니다. 

GetX를 통한 state 관리 방식은 크게 두 가지로

1. 단순 상태 관리
2. 반응형 상태 관리

가 있습니다. 위 두가지 방식의 차이점은 단순 상태관리의 경우 설정한 값이 변하지 않아도 무조건 호출이 됩니다. 그러나 반응형 상태관리의 경우에는 값이 변해야 호출이 이루어 집니다.

첫 번째 단순 상태 관리와 같은 경우 아래의 예시와 같은 방식입니다.

```dart
import 'package:get/get.dart';

// 단순 상태 관리를 위한 controller를 생성해줍니다
class SimpleController extends GetxController {
  int counter = 0;

  void increment() {
    counter++;
    update();  // update는 SimpleController가 등록된 모든 코드에 업데이트를 알리는 역할을 담당합니다
  }
}
```

```dart
class Home extends StatelessWidget {
    ...
    Widget build(BuildContext context) {
        Get.put(SimpleController());  // controller 등록
        return Scaffold(
            ...
            body: Center(
                child: GetBuilder<SimpleController>(  // GetBuilder 아래의 모든 위젯은 controller의 데이터를 읽을 수 있습니다
                    builder: (controller) {
                        return ElevatedButton(
                            child: Text(controller.counter),
                            onPressed: () => controller.increment(),
                        ),
                    },
                ),
            ),
        );
    }
}
```

GetBuilder()를 사용하지 않을 경우 Get.find를 사용할 수도 있습니다

다음으로 반응형 상태 관리에 대한 예시 코드입니다.

```dart
import 'package:get/get.dart';

class ReactiveController extends GetxController {
  RxInt counter = 0.obs;  // 변수의 타입은 Rx[TypeName] 입니다. 또한 변수의 값에 .obs를 붙입니다
  // update()를 부르지 않아도 됩니다

  void increase() {
    counter++;
  }
}
```

단순 상태 관리에서는 GetBuilder를 사용했다면 반응형 상태 관리에서는 Obx, GetX로 두 가지의 방법이 있습니다. 

Obx를 이용한 counter 값 출력은

```dart
Obx(() => Text(
    '${Get.find<ReactiveController().counter.value>}',  // .value를 붙여야 합니다
),),
```

GetX를 이용하면

```dart
GetX(
    builder: (_) {
        return Text(
            '${Get.find<ReactiveController().count.value>}',
        );
    },
),
```

GetX의 경우 위젯의 원하는 부분만 업데이트하는 것 및 사용법을 배우는 것도 쉽다는 장점이 있습니다. 그러나 BuildContext를 이용한 의존성 주입이 사용되지 않고 BuildContext가 글로벌하게 사용되므로 위험성이 있습니다. 

## 마무리하며

이번에 flutter state 관리 방법에 대해서 조사하며 다양한 state 관리 방법을 비교한 글을 볼 수 있었고 현재 뉴아라 및 다른 스팍스 앱에서 사용하고 있는 Provider가 가장 적합한 방법일 것 같다는 생각이 들게 되었습니다. 상태 관리 방법은 위에서 언급한 것들 외에도 InheritedWidget, BLoC 등 더 있고 다음 기술블로그 때 다뤄보도록 하겠습니다!
