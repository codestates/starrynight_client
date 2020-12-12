import React from "react";
import classNames from "classnames";
import "../css/Button.scss";

function Button({ children, size, outline, fullWidth, onClick }) {
  return (
    <button
      className={classNames("Button", size, { fullWidth })}
      onClick={onClick}
    >
      {children}
    </button>
    // .join(" ") --> className에 CSS 클래스 이름을 동적으로 넣어주고 싶으면 위처럼 설정.
    // 이걸 쓰기 번거로우면 classnames라는 라이브러리를 사용하는 것이 훨씬 편리하다고 함.
    // Button 컴포넌트의 버튼기능에 props를 제외한 모든 것들을 {...rest} 에 모으고, 이 안에 클릭이벤트도 있으니 이걸로 클릭이벤트 활성화
    // 지금은 classNames 라이브러리를 사용하겠음.
  )
}

Button.defaultProps = {  // 기본적으로 medium이 props로 내려감. 하지만 각 버튼마다 props로 size를 변경하여 default를 변경할 수 있음
  size: "medium"
};
// props로 받은 props값이 button 태그의 className으로 전달이 될 것.
// 이제 이에 따라 Button.scss에서 다른 크기를 지정할 수 있음.

export default Button;