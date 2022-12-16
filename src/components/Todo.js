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

const TodoContainer = styled.ul`
  width: 100%;
  min-height: 140px;
  padding: 20px 0px 20px 0px;
  list-style: none;
  background: rgba(236, 236, 236, 0.35);
  border-radius: 20px;
  display: ${(props) => (props.isLoading ? 'flex' : 'grid')};
  justify-content: center;
  align-items: center;
  grid-template-rows: repeat(auto-fill, auto);
  grid-template-columns: repeat(2, 1fr);
  row-gap: 10px;
  column-gap: 15px;

  li:nth-child(odd) {
    padding-left: 20px;
  }

  li:nth-child(even) {
    padding-right: 20px;
  }
`;

const TodoList = styled.li`
  font-size: 14px;
  display: flex;
  align-items: center;
  i {
    color: ${(props) => (props.isCompleted ? '#56C372' : 'black')};
    padding-right: 10px;
    font-size: 15px;
  }
`;

const Todo = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/todos').then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <MidTitle>오늘의 할일</MidTitle>
      <TodoContainer isLoading={isLoading}>
        {!isLoading ? (
          data.map((data) => (
            <TodoList key={data.id} isCompleted={data.isCompleted}>
              {data.isCompleted ? (
                <i className="fa-solid fa-circle-check"></i>
              ) : (
                <i className="fa-solid fa-flag-checkered"></i>
              )}
              {data.title}
            </TodoList>
          ))
        ) : (
          <LoadingDotFlashing />
        )}
      </TodoContainer>
    </>
  );
};

export default Todo;
