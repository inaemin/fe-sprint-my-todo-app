# 나만의 Todo앱 만들기
-----
주소] https://inaemin.github.io/fe-sprint-my-todo-app/  
아이폰13에 최적화되어있는 Todo 웹앱입니다. CRA를 바탕으로 만들었고 [openweather](https://openweathermap.org)에서 날씨정보를 가져오고 세 가지 종류의 메모가 가능합니다.
백엔드는 따로 구축하지 않아 json-server를 통한 임시서버를 이용합니다.  

```
cd data
json-server --watch data.json --port 3001
```  

![home1](https://user-images.githubusercontent.com/97337038/208557335-62fb1405-1847-448c-bdef-affb946b4729.gif) ![home2](https://user-images.githubusercontent.com/97337038/208557351-7924f6b9-9fc1-4aef-9cfc-89a6cfc140c8.gif)

## 1. 홈
- 날씨 컴포넌트  
custom hook으로 useCurrentLocation을 만들어서 현재 위치의 위도와 경도를 파악해 날씨정보를 받아옵니다. 만약 위치정보에 접근을 허용하지 않는다면 기본값으로 Cupertino의 위도와 경도를 리턴합니다. 현재 위치, 현재 날씨, 현재 기온, 체감온도, 최고/최저온도, PM10, PM2.5정보를 나타냅니다. PM10과 PM2.5는 공기오염정도에 따라 배경색을 달리합니다.  
날씨 컴포넌트 위에 있는 소제목은 시간에 따라 달라집니다  
(0-6시 : 고요한 새벽입니다/6-12시 : 즐거운 아침입니다/12-18시 : 즐거운 오후입니다/18-24시 : 즐거운 저녁입니다)  

- 오늘의 할일 요약 컴포넌트  
/cart, /todos, /study로부터 get해온 데이터를 나타냅니다. 단순히 읽기만 구현하였고 완료여부에 따라 icon을 달리 표현하였습니다.  
장바구니부분은 한 줄로 표현하여 스크롤이 가능하게 하였고, 나머지 부분은 2열이되 행의 길이는 목록의 개수에 따라 자동으로 늘어납니다.  

## 2. 오늘의 할일
- 오늘의 장바구니 | 일거리 | 공부  
서버에서 get한 데이터를 읽고 input 컴포넌트를 통해 데이터를 추가하고, 목록을 한 번 클릭하면 완료됨으로 변경되고, 더블클릭하면 삭제됩니다.  

## 3. 오늘의 운동
- 기능 준비 중
