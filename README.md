# **2021 경북대학교 SW 해커톤**

# 작품명

### KNUniverse

![youtube_profile_image](https://user-images.githubusercontent.com/24482602/126735239-0ae1d147-2bb4-4a46-9bb7-563b4aaec0dd.png)

# 주제 및 목적

**COVID-19**로 **변화된 대학 생활을 개선**할 수 있는 **창의적**이고 **혁신적**인 **소프트웨어 자유개발**

첨성인, 캠퍼스, 스마트한 학교생활이라는 키워드에 맞게 현재 COVID-19 바이러스로 인해 떠오르는 주제인 **메타버스에 대해 직접 구현**해보고 **조금 더 안전하고 재미있게 사람과 커뮤니케이션이 가능한 학습 및 개발 환경을 제공**하는 서비스를 개발하기로 하였다.

# 팀원
- [이상민](https://github.com/Sangmeeeee/)

- [김기현](https://github.com/Girin7716/)

# 용도

- 비대면 환경에 맞추어 캠퍼스 생활을 간접적으로 체험할수있게 직접 캐릭터를 조작해가며 비대면 환경에서 벗어나 능동적으로 비대면 환경을 조작할수있는 서비스를 제공한다.
- 오프라인에서 만나는 것과 같이 같은 공간에 있다는 기분을 느낄 수 있다.
- 비대면 채팅 및 회의를 진행할 수 있다.



# 기대효과 및 영향

- 비대면으로 자주 만날 수 있으며, 마치 같은 공간에 있다는 느낌을 받아 코로나 블루를 극복할 수 있다.
- 메타버스라는 가상세계의 특성상 현실보다 더 수월한 확장과 많은 가능성을 가지고있기 때문에 개발 속도에 맞추어 더 많은 기능을 추가할 수 있다.



# 이미지

### 배경

![image](https://user-images.githubusercontent.com/52579096/126692421-7220e295-f8ac-4973-a367-99411e95688c.png)

- 출처 : https://blog.jinbo.net/taiji0920/3163?commentId=13354 에서 변경함.



### 캐릭터

![male_walk_down1](https://user-images.githubusercontent.com/52579096/126692732-a0b4917f-0dc6-4b85-8dcc-3069385dc040.png)

- 출처 : https://itch.io/



# 시연 영상

[유튜브](https://youtu.be/zdsbHRJo0xY)



# 구현 사항

- 회원 가입, 로그인 기능
- 로그인한 유저는 메타버스에 각자의 방 생성 기능.
- 만들어진 각각의 방들의 리스트를 통해 방에 입장 기능.
- 방에 입장한 사람에게 캐릭터 부여 및 실시간으로 움직이기.
- 같은 방 안의 사람끼리 실시간 채팅 기능.
- 같은 방 안 사람과 화상 회의 기능.




# 사용 Stack

![image](https://user-images.githubusercontent.com/52579096/126692183-8acbd259-3705-4a10-ad85-68f61fed4263.png)

# heroku commit

<img width="1440" alt="스크린샷 2021-07-23 오후 12 39 49" src="https://user-images.githubusercontent.com/24482602/126734957-c110d4fb-61a7-457b-b33f-c8500db01386.png">


# 추후 구현 사항

- WebRTC
- 움직임

# 실행방법

- frontend : HTTPS=true npm start로 실행하여 configs폴더내의 api_server를 원하는 api server의 주소(spring boot)로 지정한다.
- backend : nodejs서버는 배포 완료하였으며 springboot server는 https통신이 필요하기 때문에 인증서를 발급받아 환경설정에 넣어준다음 실행한다. 만약 front와 back 둘다 같은 local에서 실행할경우 cors에 ip주소를 넣어준다. 또한 spring boot는 h2 database를 사용하였기 때문에 h2를 실행하여 테스트 진행한다.

실행의 어려움이나 에러사항이 있을경우 연락부탁드립니다.

