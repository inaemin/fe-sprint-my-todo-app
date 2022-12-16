import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';

const MainTitle = styled(Link)`
  font-weight: 700;
  font-size: 45px;
  color: black;
  text-decoration: none;
`;

const Setting = styled(Link)`
  font-size: 35px;
  color: grey;
  text-decoration: none;
  visibility: ${(props) => (props.hidden ? 'hidden' : '')};
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
      <MainTitle to={path}>{title}</MainTitle>
      <Setting
        to="/setting"
        className="fa-solid fa-gear"
        hidden={path === '/' ? false : true}
      ></Setting>
    </header>
  );
};

export default Header;
