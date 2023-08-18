import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

type FeatureItem = {
  title: string
  description: JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: '프로젝트',
    description: (
      <>
        컴퓨터에 관심이 있는 사람들이 모인 개발 자치단체이자, KAIST 학부
        총학생회 산하 특별기구로서 학우들에게 도움이 되는 서비스를 제작 및
        운영하고 있습니다. 이를 위해 매학기 50여명의 개발자와 디자이너들이
        활동하고 있습니다.
      </>
    ),
  },
  {
    title: '세미나/스터디',
    description: (
      <>
        구성원의 성장을 위해 각종 세미나를 열고 있습니다. 정기 세미나는 기초부터
        알려주는 신입생 세미나와 전반적인 개발 인프라를 관리하는 법에 대해
        배우는 휠 세미나가 있습니다. 관심사가 비슷한 회원끼리 모여 여러 세미나와
        스터디를 운영하고 있습니다.
      </>
    ),
  },
  {
    title: '정기모임/총회',
    description: (
      <>
        매주 월요일 오후 9시에 KAIST 교양분관(N11) 1층에 위치한 동아리방에 모여
        프로젝트 진행상황에 대한 이야기를 나눕니다. 또한 한 학기에 두 번 이상
        모여 신입회원 승급 심사를 진행하고 단체의 중요한 일에 대해 논의합니다.
      </>
    ),
  },
  {
    title: '대외협력',
    description: (
      <>
        여러 기업과 타대 개발 단체와의 협력을 통한 파트너쉽 구축, 그리고 대내외
        해커톤 주최 및 참여에도 힘쓰고 있습니다.
      </>
    ),
  },
  {
    title: '친목활동',
    description: (
      <>
        딸기파티, MT, 짝선짝후 활동뿐만 아니라 졸업하신 SPARCS 선배님들과 만나는
        홈커밍, 내부 해커톤을 운영하고 있습니다. 각 프로젝트 구성원들끼리 모여
        회식이나 워크샵을 가기도 합니다.
      </>
    ),
  },
  {
    title: '리크루팅',
    description: (
      <>
        학부 졸업 전까지 4학기 동안 활동할 수 있다면 학번에 무관하게 누구나
        지원할 수 있습니다. 매 봄학기, 가을학기에 개발자와 디자이너를 모집하고
        있습니다. 정회원으로 승급한 이후에는 동아리를 쉬는 것도 가능합니다.
      </>
    ),
  },
]

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
