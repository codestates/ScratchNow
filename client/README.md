<br>

# ScratchNow-client

<br>

## 프로젝트 실행

```
npm install
npm run start
```

## SASS 실행

터미널에 아래 명령어를 입력시 main.scss에 연결된 scss파일의 내용이 변경될 때마다 style.css 파일로 컴파일됩니다.

```
npm run sass
```

<br>

## 폴더 구조

[`RESET CSS`](https://cssdeck.com/blog/scripts/eric-meyer-reset-css/)

```
├─ 📂 public                => icon,font,image 등
└─ 📂 src
   ├─ 📂 components
   │     ├─ 📂 pages        => 페이지별 컴포넌트들
   │     └─ 📂 UI           => UI 컴포넌트들
   ├─ 📂 pages              => 페이지들
   ├─ 📂 store              => jotai state 모음
   ├─ 📂 styles
   │     ├─ 📂 components   => 컴포넌트별 스타일
   │     │     ├─ 📂 pages
   │     │     └─ 📂 UI
   │     ├─ 📂 constants    => 상수 모음
   │     ├─ 📂 pages        => 페이지별 스타일
   │     ├─ 📄 main.scss    => 스타일 모음 (style.css로 컴파일)
   │     └─ 📄 reset.scss   => RESET CSS
   ├─ 📂 types              => type 모음
   ├─ 📂 utils              => 자주 쓰는 util 함수 모음
   │
   ├─ 📄 App.tsx
   ├─ 📄 index.tsx
   └─ 📄 style.css
```

<br>

## 코딩 컨벤션

- 링크의 글을 참고하여 최대한 지키면서 코딩해봅시다. 안 지켜진 게 있다면 서로 즉각 피드백해줍시다. [`링크`](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION)

<br>

- id, className은 Snake Case를 사용합시다.

<br>

- SCSS는 유지보수가 쉽도록 아래의 규칙을 따릅시다.

- 순서대로 작성하기

  1. z-index
  2. position
  3. display
  4. flex 관련 속성
  5. width, height
  6. left, right, top, bottom
  7. margin, padding, transform: translate() 등 위치에 영향을 주는 요소
  8. 이하 자유

- 아래 예시와 같이 중첩 기능(Nesting)을 사용하고, 다른 요소끼리는 줄바꿈으로 구분해줍시다. 내용이 거의 비슷한 요소라면 `@extend`를 사용하여 중복되는 코드를 줄입시다.

```scss
.example_1 {
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 50%;
  top: 0;
  padding: {
    left: 10px;
    right: 10px;
  }
  font: {
    size: 10px;
    weight: 600;
  }
  background-color: $WHITE;

  img {
    width: 100%;
  }

  &:hover {
    background-color: $BLACK;
  }
}

.example_2 {
  @extend .example_1;
  background-color: $GREEN;
}
```

<br>

## 커밋 컨벤션

아래 두 링크를 참고하여 가독성이 좋고 의미가 명확한 커밋메시지를 작성해봅시다. Gitmoji를 설치하지 않더라도 커밋메시지에 바로 작성할 수 있습니다.

- [좋은 커밋 메시지 작성하기 위한 규칙들](https://beomseok95.tistory.com/328)

- [Gitmoji 사용법 정리](https://inpa.tistory.com/entry/GIT-%E2%9A%A1%EF%B8%8F-Gitmoji-%EC%82%AC%EC%9A%A9%EB%B2%95-Gitmoji-cli)

<br>

### 커밋 메시지 예시

```
:sparkles: feat: 로그인 기능 구현 완료
```
