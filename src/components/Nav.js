import styled from "styled-components";
import { useLocation } from "react-router-dom";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 390px;
  height: 93px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 20px;
  box-shadow: 0px -7px 10px 1px rgba(0, 0, 0, 0.09);
  /* animation: comingup 0.8s ease-in-out;

  @keyframes comingup {
    from {
      transform: translateY(100px);
    }
    to {
      transform: translateY(0);
    }
  } */
`;

const NavBtn = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 60px;
  border: none;
  background-color: rgba(1, 1, 1, 0);
  font-size: 30px;
  text-decoration: none;
  margin-top: 8px;
  span {
    margin-top: 8px;
    font-size: 12px;
  }
  &:hover {
    cursor: pointer;
    color: black;
  }

  // 해당 페이지 메뉴바 버튼만 블랙으로.
  color: ${(props) => (props.href.slice(1) === props.path ? "black" : "grey")};
`;

const Nav = () => {
  const { pathname: path } = useLocation();

  return (
    <NavBar>
      <NavBtn href="#/" path={path}>
        <i className="fa-solid fa-house"></i>
        <span>홈</span>
      </NavBtn>
      <NavBtn href="#/memo" path={path}>
        <i className="fa-regular fa-calendar-check"></i>
        <span>오할</span>
      </NavBtn>
      <NavBtn href="#/workout" path={path}>
        <i className="fa-solid fa-person-walking"></i>
        <span>오운</span>
      </NavBtn>
    </NavBar>
  );
};

export default Nav;
