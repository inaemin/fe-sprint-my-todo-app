import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { LoadingDotFlashing } from './Loading';

const ToDoContainer = styled.div`
  background-color: #fdeeb4;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.isLoading ? 'center' : 'space-between')};
  align-items: center;
  padding: 10px;
`;

const ToDoList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
`;

const ToDoItem = styled.li`
  white-space: nowrap;
  list-style: none;
  font-size: 15px;
  color: ${(props) => (props.isCompleted ? '#B1B1B1' : 'black')};
  text-decoration: ${(props) => (props.isCompleted ? 'line-through' : '')};
  font-weight: ${(props) => (props.isCompleted ? 'normal' : 'bold')};
  transition: 0.1s ease-in;
  margin: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const ToDoInput = styled.form`
  margin-top: 13px;
  input {
  }
  button {
  }
`;

const CartForm = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/cart').then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const createItem = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/cart`, {
        title: input,
        isCompleted: false,
      })
      .then((res) => {
        setData([...data, res.data]);
        setInput('');
      })
      .catch((err) => console.log(err));
  };

  const updateItem = (e) => {
    const { id } = e.target;
    const { isCompleted } = data.find((el) => el.id === Number(id));
    axios
      .patch(`http://localhost:3001/cart/${id}`, {
        isCompleted: !isCompleted,
      })
      .then((res) => {
        setData([...data.map((el) => (el.id === Number(id) ? res.data : el))]);
      })
      .catch((err) => console.log(err));
  };

  const deleteItem = (e) => {
    const { id } = e.target;
    axios
      .delete(`http://localhost:3001/cart/${id}`)
      .then(() => {
        setData([...data.filter((el) => el.id !== Number(id))]);
      })
      .catch((err) => console.log(err));
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <ToDoContainer isLoading={isLoading}>
      {!isLoading ? (
        <>
          <ToDoList>
            {data.map((data) => (
              <ToDoItem
                key={data.id}
                id={data.id}
                isCompleted={data.isCompleted}
                onClick={updateItem}
                onDoubleClick={deleteItem}
              >
                {data.title}
              </ToDoItem>
            ))}
          </ToDoList>
          <ToDoInput onSubmit={createItem}>
            <input
              placeholder="여기에 입력하세요"
              value={input}
              onChange={handleInput}
              maxLength="15"
              required
            />
            <button type="submit">Enter</button>
          </ToDoInput>
        </>
      ) : (
        <LoadingDotFlashing />
      )}
    </ToDoContainer>
  );
};

export default CartForm;
