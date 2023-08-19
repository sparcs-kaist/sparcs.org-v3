---
authors: tom
slug: try-prisma
---
# Prisma를 사용해보세요

SPARCS 서비스 중 하나인 OTL plus 팀에 백엔드 신입으로 참여하여 Nest.js를 이용한 여러 기능 구현 과제를 수행하게 되었습니다. 이 과정에서 MySQL과 Prisma ORM을 사용하게 되었고, 공식 문서에 잘 나와 있긴 하지만 직접 사용해 본 경험을 바탕으로 Prisma에 대한 간단한 소개를 해보겠습니다.(초보자의 경험을 바탕으로 적은 글이므로 더 쉬운 방법이나 오류가 있을 수 있습니다.. 양해 부탁드립니다😭)

### Prisma가 뭐죠?

간단하게 설명하자면 Prisma ORM은 TypeScript와 JavaScript를 위한 데이터베이스 ORM입니다. Prisma를 사용하면 개발자가 SQL 쿼리를 직접 작성할 필요 없이, 모델과 필드를 정의하고, Prisma CLI를 사용하여 데이터베이스 스키마를 자동으로 생성할 수 있습니다. 이를 통해 데이터베이스 스키마 변경 시, TypeScript/JavaScript 코드가 자동으로 업데이트되기 때문에 개발 생산성을 높일 수 있습니다.

### 스키마 파일 작성

Prisma를 사용하기 위해서 진행해야 하는 가장 첫 단계라 할 수 있는 prsma schema 파일 작성입니다. 연결하는 DB에 대한 정보와 생성할 Model들에 대해 작성해줍니다. prisma schema파일은 Data sources, Generator, Data model definition의 세 부분으로 나눌 수 있습니다.

```jsx
datasource db {
  provider = "mysql"
  url = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @default(autoincrement()) @id
  email String @unique
  name String?
  anonymous Boolean @default(true)
	auth Auth @default(USER)
}

enum Auth{
	USER
	ADMIN
}
```

Data sources는 prisma가 어떤 데이터 베이스에 어떻게 연결할지에 대한 정보를 적는 부분입니다. 연결하고자 하는 데이터 베이스의 종류(mysql, postgresql 등)와 데이터베이스 URL을 적어주면 됩니다. 여기서 URL의 경우 dotenv를 이용하여 `env(DB URL입력)`의 방식으로 환경파일을 사용함으로써 개발 데이터베이스와 프로덕션 데이터베이스를 분리할 수 있습니다. Generators는 prisma generate명렁어를 사용할 때 어떤 클라이언트를 생성할 것인지에 대해 설정해주는 부분입니다. Data model definition 테이블간의 관계, 각 field의 타입등 application model(Prisma model)들을 정의하는 부분입니다. TypeScript를 사용할 경우 index.ts파일에 prisma schema파일에서 지정해준 type에 맞게 다음과 같이 prisma client code를 자동생성해줍니다.

```jsx
export type User = {
  id: number @default(autoincrement()) @id
  email: string @unique()
  name: string | null
  anonymous: boolean
	auth: Auth
}

export const Auth: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Auth = (typeof Auth)[keyof typeof Auth]
```

enum, type 을 사용해 새로운 타입을 지정할 수도 있고, `@id`, `@unique`, `@default`같은 attribute, `autoincrement()`, `now()`같은 function을 사용할수도 있습니다. 각 model은 record를 식별하기 위해서 `@id`, `@@id`, `@unique`, `@@unique` 중 최소한 하나를 지정해야 합니다. 여기서 @@는 두 field를 하나로 묶는다는 의미입니다. 다음과 같은 방식으로 지정하여 뒤에 설명할 `update`나 `findunique`에서 unique input으로 사용할 수 있습니다.

```jsx
@@unique(fields: [id, isDeleted], name:"validChat")
```

schema파일에서 @relation을 이용하여 data model사이의 1:1, 1:N, N:M, 자기 참조 관계들을 생성할 수 있습니다.

```jsx
model User {
  id      Int      @id @default(autoincrement())
	email String @unique
	name String
  test Test?
}

model  Test{
  id     Int  @id @default(autoincrement())
	content String?
  user   User @relation(fields: [userId], references: [id])
  userId Int  @unique
}
```

```jsx
model User {
  id      Int      @id @default(autoincrement())
	email String @unique
	name String
  tests Test[]
}

model  Test{
  id     Int  @id @default(autoincrement())
	content String?
  user   User @relation(fields: [userId], references: [id])
  userId Int  @unique
}
```

```jsx
model User {
  id    Int     @default(autoincrement()) @id
  email String @unique
  name String?
  anonymous Boolean @default(true)
  spaces UsersInSpaces[]
}

model Space{
  id Int @default(autoincrement()) @id
  name String @unique
  users UsersInSpaces[]
}

model UsersInSpaces{
  user User @relation(fields: [userId], references:[id], onDelete: Cascade)
  userId Int
  space Space @relation(fields: [spaceId], references:[id], onDelete: Cascade)
  spaceId Int
  @@unique(fields: [userId, spaceId], name:"userspace")
  @@id([userId, spaceId,roleId])
}
```

```jsx
model Chat{
  id Int @default(autoincrement()) @id
  content String
  chat Chat[] @relation("chat")
  parent Chat? @relation("chat", fields: [parentId], references: [id])
  parentId Int? @map("chatid")
  level Int @default(0)
  order Int @default(0)
  @@unique(fields: [id, isDeleted], name:"validchat")
}
```

### CRUD 간단 설명

- create, createMany
  새로운 DB record를 만들어줍니다. 앞서 설명했듯이 이전에 생성한 index.ts에 생성된 data model의 type에 맞춰 데이터를 넣어 생성할 수 있습니다.
  ```jsx
  //this는 Nest.js에서 DI한 PrismaService를 가리킵니다.
  await this.prisma.user.create({
    data: { email: "foo@bar.com", name: "foo" },
  });

  await this.prisma.user.createMany({
    data: [
      { email: "first@foo.com", name: "first" },
      { email: "second@foo.com", name: "second" },
      { email: "third@foo.com", name: "third" },
    ],
    skipDuplicates: true, //생성되는 record중에서 unique field값이 중복되는 경우 생성하지 않습니다.
  });
  ```
- findUnique, findFirst, findMany
  findUnique의 경우 where에 unique한 값만 넣을 수 있습니다. soft delete처럼 만약 두 field의 값을 묶어서 사용해야 하는 경우가 필요하다면 앞선 `@@unique` 의 예시처럼 사용하는 모델에 있는 isDeleted field와 다른 unique 또는 id field를 묶어주면 됩니다.
  ```jsx
  @@unique(fields: [id, isDeleted], name:"validChat") //prisma.schema 파일 model 내부에 작성
  await this.prisma.order.fidnUnique({
  	where: { validChat:{id: Id, isDeleted: false} },
  });
  ```
  findFirst, findMany의 경우 orderBy와 take를 사용해서 column기준 최대값, 최솟값 혹은 정렬된 몇개의 record를 얻을 수 있습니다. where내부에 OR, AND를 추가하는 것도 가능합니다.
  ```jsx
  await this.prisma.order.findFirst({
    where: { id: Id, isDeleted: false },
    orderBy: { level: "desc" },
    take: 1,
  });
  await this.prisma.order.findMany({
    where: { name: "foo", isDeleted: false },
    orderBy: { level: "asc" },
    take: 5,
  });
  ```
- update, upsert, updateMany
  update, upsert는 where에 unique input을 넣어 원하는 record를 찾아 data에 넣어주는 값으로 업데이트 해줍니다. upsert의 경우 찾는 record가 없다면 새로운 record를 생성합니다. update 종류들은 increment, decrement, multiply, divide, set등을 통해서 number 종류의 값들을 변경할 수 있습니다.
  ```jsx
  await this.prisma.user.update({
    where: { id: id },
    data: { name: "bar" },
  });
  await this.prisma.user.upsert({
    where: { email: "first@bar.com" },
    update: { email: "second@bar.com" },
    create: { name: "foo", email: "second@bar.cpm" },
  });
  await this.prisma.post.updateMany({
    where: { name: "foo" },
    data: { likes: { increment: 1 } },
  });
  ```
- delete, deletemany
  - record를 삭제하기 위해서는 delete혹은 deleteMMany를 사용하면 됩니다. delete, deleteMany 내부 where에는 unique input을 넣어줍니다.
  ```jsx
  await this.prisma.user.delete({
    where: { email: "foo@bar.com" },
  });
  await this.prisma.user.deleteMany({
    where: { name: "foo" },
  });
  ```
- select, include
  앞서 설명한 CRUD에 넣어주고 데이터를 가져오기를 원하는 field에 true설정만 해주면 됩니다.
  ```jsx
  await this.prisma.user.create({
    data: { email: "foo@bar.com", name: "foo" },
    select: { name: true, email: true },
  });

  await this.prisma.user.create({
    data: { email: "foo@bar.com", name: "foo" },
    include: { post: true },
  }); //user model에 post model이 @relation으로 묶여있는 경우
  ```
  select는 scalar field, include는 relation으로 연결되어 있는 다른 data model을 불어와 지정된 변수에 넣어줄 수 있습니다. 하지만 select를 통해서도 relation으로 연결되어 있는 data model을 불러올 수 있고, include와 select를 같이 사용하지 못하기 때문에 특별한 경우가 아니라면 select를 통해서 원하는 field와 연결된 data model을 불러오면 됩니다. Prisma에서는 select나 include에서 true로 설정한 field들로 변수를 구성하기 때문에 type검사에 있어 런타임 전에 문제가 되는 부분을 수정할 수 있습니다. 여기서 주의해야 할 점은 select를 통해 다른 model을 불러올 때 해당 모델은 빈 모델일 수 없다는 점입니다. 예를 들어 다음과 같은 상황에서 author model의 하위의 모든 field를 false로 둘 경우 런타임 전 type검사에서 문제가 없다 하더라도 런타임에서 ‘최소한 하나의 field는 불러와야 한다’는문제가 발생합니다.
  ```jsx
  select: {
  	author: {
  		select:{
  			email: false,
  			name: false,
  			img: false
  		},
  	},
  .....
  ```
- Transaction
  Prisma에서는 pessimistic lock을 간단하게 설정할 수 있습니다. 기본적인 사용법에 대해서 하나만 소개하자면 다음과 같습니다.(Interactive transactions)
  ```jsx
  await this.prisma.$transaction(async(tx) => {
  	await tx.user.update ....
  	await tx.author.create ....
  })
  ```

### 마무리

Prisma는 홈페이지에 있는 Documentation이 상당히 자세히 나와있고 저도 아직 사용해보지 못한 더 많은 기능들이 많습니다. 이 글에서 설명한 기능들 중에서도 설명하지 못한 더 다양한 옵션들도 있습니다. 사용자 또한 많기 때문에 처음 ORM을 사용해보더라도 쉽게 접근할 수 있습니다. 그렇기에 만약 누군가 처음 ORM을 사용해야 하는 상황이라면 저는 Prisma를 추천해주고 싶습니다. 이상 부족한점이 많은 Prisma간단 소개를 마치겠습니다. 읽어주셔서 감사합니다.

출처: [https://www.prisma.io/docs](https://www.prisma.io/docs)
