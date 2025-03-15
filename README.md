### 소개

해당 어플리케이션은 크게 아래 두가지 기능을 수행합니다.

1. 사용자로부터 음성 파일을 업로드 받고, 파일 정보를 저장합니다.
2. 업로드 받은 음성 파일을 AI 서버로 sts 변환을 요청합니다.

### 사용 기술

- node 18.17.1
- express
- mysql 8.4
- sequelize
- typescript
- husky
- pm2

### 프로젝트 구성 요소

- common
- controllers
- database
- errors
- external
- jobs
- logger
- middlewares
- models
- routes
- test
- types
- utils

### 큐 시스템

- bullmq
- 큐 상태, 수행 및 대기, 실패 등에 대한 비동기 작업들의 대한 생명주기 정보는 별도의 대시보드 페이지를 통해 확인이 가능합니다. ('/admin/queues')
-

### 실행 방법

어플리케이션 서버 실행을 위해서는 로컬 머신에 docker, docker-compose 설치가 선행되어야합니다.

1. docker compose up --build

### 테스트 환경

통합테스트를 위한 테스트용 DB가 세팅되어야합니다.<br />
테스트 편의성을 위해 개발환경, 테스트 환경 모두 하나의 `docker-compose.yml`로 관리하고 있습니다.

1. docker compose up --build
2. npm run test

### 데이터 모델

- user
- voice
- file
- jobHistory

데이터 다루는 방식은 active record 패턴을 사용

###
