import Header from '../components/Header';
import Nav from '../components/Nav';
import Toggle from '../components/Toggle';
import styled from 'styled-components';
import { useState } from 'react';

const SettingContainer = styled.table`
  margin-top: 31px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.09);

  tr {
    border-collapse: collapse;
    width: 100%;
    height: auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      cursor: pointer;
    }
  }

  i {
    margin: 11px 13px 11px 20px;
    color: gray;
  }
`;

const Setting = () => {
  const [checked, setChecked] = useState(false);
  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <>
      <Header title="설정" />
      <main>
        <SettingContainer>
          <tbody>
            <tr>
              <td>
                <i className="fa-solid fa-moon"></i>
                <span>다크모드</span>
              </td>
              <td>
                <Toggle isOn={checked} handleToggle={handleToggle} />
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa-solid fa-user"></i>
                <span>사용자 정보</span>
              </td>
              <td>
                <i className="fa-solid fa-chevron-right"></i>
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa-solid fa-apple-whole"></i>
                <span>제조사</span>
              </td>
              <td>
                <i className="fa-solid fa-chevron-right"></i>
              </td>
            </tr>
          </tbody>
        </SettingContainer>
      </main>
      <Nav />
    </>
  );
};

export default Setting;
