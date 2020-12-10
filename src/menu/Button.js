import React from "react";
import "../css/Button.scss";

function Button({ children, size }) {
  return <button className={["Button", size].join(" ")}>{children}</button>
  // .join(" ") --> className에 CSS 클래스 이름을 동적으로 넣어주고 싶으면 위처럼 설정.
  // 이걸 쓰기 번거로우면 classnames라는 라이브러리를 사용하는 것이 훨씬 편리하다고 함.
}

Button.defaultProps = {
  size: "medium"
};
// props로 받은 props값이 button 태그의 className으로 전달이 될 것.
// 이제 이에 따라 Button.scss에서 다른 크기를 지정할 수 있음.

export default Button;