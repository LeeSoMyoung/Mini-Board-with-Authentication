# Mini-Board-with-Authentication
MySQL, node js, Vanilla JS를 사용한 미니 게시판

## 기능
1. 회원가입 기능
2. 로그인 기능 (with JWT)
3. 회원가입 후 로그인 페이지로 리다이렉트
4. 로그인 후 메인페이지에서 작성한 글 목록 : 해당 유저가 작성한 글 확인 가능
5. 메인페지이에서는 다른 유저가 작성한 글들 역시 조회할 수 있다. 

# Tech Stack
|파트|기술 스택|
|---|---|
|Front-end|Vanilla js HTML CSS|
|Back-end| MySQL, Node.js|

# ERD
![image](https://user-images.githubusercontent.com/47571973/153625981-794e8a72-2851-4cab-b0e9-fbd7f3f23beb.png)

회원 가입을 위한 Users 테이블과 게시글 작성 포스트를 위한 Posts 테이블이 존재한다.

4번 기능(작성한 글 목록)을 위해 Posts 테이블의 uid 속성은 Users의 PK인 uid와 같다.

# API 명세서
![image](https://user-images.githubusercontent.com/47571973/153152788-0b953faf-746c-4bb3-a318-4a5c51de4233.png)

<a href="https://ordinary-bait-736.notion.site/Mini-Board-with-Authentication-API-3021f34860624022805be3498e567158">자세한 API 명세서</a>
