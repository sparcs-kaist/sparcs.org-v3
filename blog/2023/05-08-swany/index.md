---
authors: swany
slug: airflow
---

# Apache Airflow
안녕하세요. Taxi팀에서 백앤드를 담당하고 있는 이서완(swany)입니다. 이전에 BagelCode에서 데이터엔지니어로 근무한 경험이 있는데, 그 때 사용했던 여러 기술들에 대해 소개하고자 합니다. 오늘 기술 블로그에서는 데이터 워크플로우를 관리하는 플랫폼인 Apache Airflow에 대해 소개합니다.

Aiflow는 Airbnb에서 복잡해지는 워크플로우를 관리하기 위해 만든 오픈 소스 입니다. Airflow를 한 줄로 정의하면 
**DAG 형태의 워크플로우를 작성해 이를 스케줄링하고 모니터링 하는 플랫폼** 입니다. Airflow는 오픈 소스인 만큼 많은 사용자들이 사용하고 있고, AWS와 GCP에서도 Airflow managed serivce를 제공하고 있습니다. 그리고 아래와 같은 장점들이 있습니다.
1. python에 대한 간단한 지식만 있다면 사용할 수 있을 정도로 쉽습니다.
2. DAG형태의 워크플로우 작성이 가능하다.
3. 워크플로우 및 테스트 진행상황 여부는 User Interface를 통해 모니터링할수 있다.

그리고 가장 큰 Airflow의 특징은 Workflows as code 라는 것입니다. 아래와 같은 특징이 있습니다.
- Dynamic: Aiflow 파이프라인이 Python 코드로 작성되어 동적 파이프라인 생성이 가능합니다.
- Extensible: Aiflow 프레임워크에는 수많은 기술과 연결할 수 있는 Operator가 있습니다. 모든 Aiflow 구성 요소는 확장 가능하며 여러 환경에 쉽게 적용 가능합니다.
- Flexible: Jinja 템플릿 엔진을 활용한 워크플로 매개변수화가 내장되어 있습니다. 

# Apache Airflow 컴포넌트
<img src = "https://airflow.apache.org/docs/apache-airflow/stable/_images/arch-diag-basic.png" width="450" height="300">

Airflow의 컴포넌트들에 대해 간단히 알아보도록 하겠습니다.
1. DAG: Directed Acyclic Graph의 줄임말으로, 사용자가 실행하고 싶은 Task의 모음이다. 개별 Task간의 관계가 정의되어 있습니다.
2. WebServer: Flask로 만들어진 User Interface로 DAG의 status를 모니터링 하거나 trigger할 수 있습니다.
3. Database: Task들의 모든 status를 저장하는 곳으로, 워크플로우에서 데이터베이스를 읽고 쓰는 작업을 수행합니다.
4. Scheduler: DAG의 Execution을 스케줄링 하는 컴포넌트입니다.
5. Worker: 실제 Task를 실행하는 컴포넌트입니다.

즉 사용자가 python을 이용해 DAG를 작성하면 이를 Scheduler가 읽고 스케줄링 작업을 완료합니다. 그 후에 Worker들이 Task들을 실행하고 사용자들은 Web Server을 이용해 Task의 status를 모니터링 할 수 있습니다. 

# 간단한 Airflow 예제

```python
from datetime import datetime

from airflow import DAG
from airflow.decorators import task
from airflow.operators.bash import BashOperator

# A DAG represents a workflow, a collection of tasks
with DAG(dag_id="demo", start_date=datetime(2022, 1, 1), schedule="0 0 * * *") as dag:

    # Tasks are represented as operators
    hello = BashOperator(task_id="hello", bash_command="echo hello")

    @task()
    def airflow():
        print("airflow")

    # Set dependencies between tasks
    hello >> airflow()
```

위 코드에서 알 수 있는 정보들을 살펴보면 다음과 같습니다.
- DAG의 이름은 "demo"이고 2022년 1월 1일에 시작해 하루에 한번 실행됩니다. (DAG는 airflow의 워크플로우를 나타냅니다.)
- 두개의 Task가 정의되어 있습니다. 하나는 Bash Script를 실행하는 BashOperator 작업인 hello, 나머지는 @task 데코레이터를 사용하여 정의된 Python function인 airflow()입니다.
- Task 사이의 종속성은 ">>"을 이용해 지정하고, 이를 통해 작업이 실행되는 순서를 제어합니다.

DAG "demo"의 상태는 아래 사진과 같이 웹 인터페이스에서 확인 할 수 있습니다.
<img src="https://airflow.apache.org/docs/apache-airflow/stable/_images/demo_graph_view.png">
<img src="https://airflow.apache.org/docs/apache-airflow/stable/_images/demo_grid_view.png">
각 열은 한번의 DAG 실행을 의미합니다. 또한 각 Task의 상태, 시작시간 종료시간 등 여러 정보를 User Inteface에서 확인 가능합니다.


# 마무리 하며
예제는 간단한 작업이었지만, 실제 기업에서는 많은 Task들이 여러 종속관계로 얽혀있기 때문에 이를 관리하는 것이 중요한 일 중 하나입니다. 그렇기 때문에 이번 글에서 알아본 이점을 가진 Aiflow를 많이 사용하고 있습니다. Airflow에 대해 더 알아보고 싶으시다면 [좀 더 자세한 Airflow 사용방법](https://airflow.apache.org/docs/apache-airflow/stable/tutorial/fundamentals.html) 혹은 Data Pipelines with Apache Airflow 책을 읽어보시기를  추천드리며 마무리 하도록 하겠습니다. 읽어주셔서 감사합니다!




