import styled from "styled-components";
import { useLocation } from "react-router-dom";

const MainTitle = styled.a`
  font-weight: 700;
  font-size: 45px;
  text-decoration: none;
  color: black;
`;

const Setting = styled.i`
  font-size: 35px;
  color: grey;
  text-decoration: none;
  visibility: ${(props) => (props.hidden ? "hidden" : "")};
  &:hover {
    animation: rotate 2s linear infinite;
    cursor: pointer;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Header = ({ title }) => {
  const { pathname: path } = useLocation();

  return (
    <header>
      <MainTitle href={path}>{title}</MainTitle>
      <Setting
        className="fa-solid fa-gear"
        hidden={path === "/" ? false : true}
        as="a"
        href="#/setting"
      ></Setting>
    </header>
  );
};

export default Header;
