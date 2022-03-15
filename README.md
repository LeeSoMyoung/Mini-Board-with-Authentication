# Mini-Board-with-Authentication
MySQL, node js, Vanilla JS를 사용한 미니 게시판

## 기능
1. 회원가입 기능
2. 로그인 기능 (with JWT)
3. 회원가입 후 로그인 페이지로 리다이렉트
4. 로그인 후 메인페이지에서 작성한 글 목록 : 해당 유저가 작성한 글 확인 가능
5. 메인페이지에서는 다른 유저가 작성한 글들 역시 조회할 수 있다. 
6. 자신이 작성한 글들은 수정/삭제가 가능하다.

# Tech Stack
|파트|기술 스택|
|---|---|
|Front-end|Vanilla js, HTML, CSS|
|Back-end|MySQL, Node.js|
|테스트 코드|Mocha, supertest|

# ERD
![image](https://user-images.githubusercontent.com/47571973/158368711-78af7d6d-253a-4efb-9d78-c770bf6dfbcd.png)

회원 가입을 위한 Users 테이블과 게시글 작성 포스트를 위한 Posts 테이블이 존재한다.

4번 기능(작성한 글 목록)을 위해 Posts 테이블의 uid 속성은 Users의 PK인 uid와 같다.

# API 명세서
![image](https://user-images.githubusercontent.com/47571973/158375251-8f6f6063-1e3e-4e8d-821d-c37f2af9a524.png)

<a href="https://ordinary-bait-736.notion.site/Mini-Board-with-Authentication-API-3021f34860624022805be3498e567158">자세한 API 명세서</a>

# 시연 영상
## 회원가입
![첫화면~회원가입](https://user-images.githubusercontent.com/47571973/158374086-e213d13e-dc26-47fd-83f5-386f74e1a0e8.gif)

로그인이 되어있지 않다면 자동으로 /login으로 이동한다.

## 로그인

![로그인](https://user-images.githubusercontent.com/47571973/158374242-9e4b0294-ce96-436d-b3eb-d53d56eee75a.gif)

사용자가 올바른 회원정보를 입력하여 로그인에 성공했다면

JWT 토큰이 생성되어 쿠키로 저장된 후, 메인 화면으로 이동한다.

## 게시판 조회 및 글 작성
![게시판 글 작성](https://user-images.githubusercontent.com/47571973/158374393-c473417c-a9fa-4877-a33d-f2b72f5af01d.gif)

자신이 작성하지 않은 글은 삭제/수정이 불가능하다.

## 자신이 작성한 게시물 삭제/수정
![게시물 수정 및 삭제](https://user-images.githubusercontent.com/47571973/158374507-03b6f805-4dde-4b0e-b015-3d790e34eb16.gif)

## 로그아웃
![로그아웃](https://user-images.githubusercontent.com/47571973/158374590-aeb288ad-b79c-448a-a3ca-59ec482d5689.gif)

로그아웃하면 JWT 토큰이 삭제되고, 로그인 화면으로 이동한다.