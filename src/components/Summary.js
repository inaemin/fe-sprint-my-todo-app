import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { LoadingDotFlashing } from './Loading';

const MidTitle = styled.h2`
  font-weight: 700;
  font-size: 25px;
  margin-top: 27px;
  margin-bottom: 18px;
`;

const SummaryCartContainer = styled.ul`
  width: auto;
  height: auto;
  padding: 10px;
  list-style: none;
  background-color: #fdeeb4;
  border-radius: 20px;
  display: flex;
  box-sizing: border-box;
  overflow: scroll;
  li {
    white-space: nowrap;
    margin: 10px;
    font-size: 15px;
    &:hover {
      cursor: grab;
    }
  }
`;

const SummaryTodoContainer = styled.ul`
  width: 100%;
  height: auto;
  padding: 10px;
  list-style: none;
  background-color: #f0f4c3;
  border-radius: 20px;
  display: ${(props) => (props.isLoading ? 'flex' : 'grid')};
  justify-content: center;
  align-items: center;
  grid-template-rows: repeat(auto-fill, auto);
  grid-template-columns: repeat(2, 1fr);
  box-sizing: border-box;
  overflow: scroll;
  li {
    margin: 10px;
    font-size: 15px;
    display: flex;
    align-items: center;
    i {
      padding-right: 10px;
      font-size: 20px;
    }
  }
  &:hover {
    cursor: default;
  }

  .fa-circle-check {
    color: #56c372;
  }
`;

const SummaryStudyContainer = styled(SummaryTodoContainer)`
  background-color: #e9defc;
`;

const Summary = () => {
  const [cart, setCart] = useState(null);
  const [todos, setTodos] = useState(null);
  const [study, setStudy] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/cart').then((res) => {
      setCart(res.data);
      axios.get('http://localhost:3001/todos').then((res) => {
        setTodos(res.data);
        axios.get('http://localhost:3001/study').then((res) => {
          setStudy(res.data);
          setLoading(false);
        });
      });
    });
  }, []);

  return (
    <>
      <MidTitle>오늘의 할일 요약</MidTitle>
      <SummaryCartContainer>
        {!isLoading ? (
          cart && cart.map((data) => <li key={data.id}>{data.title}</li>)
        ) : (
          <LoadingDotFlashing />
        )}
      </SummaryCartContainer>
      <SummaryTodoContainer isLoading={isLoading}>
        {!isLoading ? (
          todos.map((data) => (
            <li key={data.id}>
              {data.isCompleted ? (
                <i className="fa-solid fa-circle-check"></i>
              ) : (
                <i className="fa-solid fa-flag-checkered"></i>
              )}
              {data.title}
            </li>
          ))
        ) : (
          <LoadingDotFlashing />
        )}
      </SummaryTodoContainer>
      <SummaryStudyContainer isLoading={isLoading}>
        {!isLoading ? (
          study.map((data) => (
            <li key={data.id}>
              {data.isCompleted ? (
                <i className="fa-solid fa-circle-check"></i>
              ) : (
                <i className="fa-solid fa-flag-checkered"></i>
              )}
              {data.title}
            </li>
          ))
        ) : (
          <LoadingDotFlashing />
        )}
      </SummaryStudyContainer>
    </>
  );
};

export default Summary;
