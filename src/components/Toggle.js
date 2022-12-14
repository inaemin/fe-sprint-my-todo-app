import styled from "styled-components";

const ToggleComponent = styled.div`
  width: 34px;
  height: 17px;
  border-radius: 36px;
  margin-right: 13px;
  border: none;
  background-color: ${(props) => (props.isOn ? "#3897F1" : "#808080")};
  position: relative;
  > div {
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: white;
    position: absolute;
    left: ${(props) => (props.isOn ? "18.35px" : "1.65px")};
    top: 1.65px;
    transition: 0.2s ease-in-out;
  }
`;

const Toggle = ({ isOn, handleToggle }) => {
  return (
    <ToggleComponent isOn={isOn} onClick={handleToggle}>
      <div />
    </ToggleComponent>
  );
};

export default Toggle;
