import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { LoadingDotFlashing } from './Loading';
import { CartContainer, CartList, CartItem, CartInput } from './CartForm';

const TodoContainer = styled(CartContainer)`
  background-color: #f0f4c3;
`;

const TodoList = styled(CartList)``;

const TodoItem = styled(CartItem)``;

const TodoInput = styled(CartInput)`
  border: 2px solid #cddc39;
  button:hover {
    background-color: #cddc39;
  }
`;

const TodosForm = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/todos').then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const createItem = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/todos`, {
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
      .patch(`http://localhost:3001/todos/${id}`, {
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
      .delete(`http://localhost:3001/todos/${id}`)
      .then(() => {
        setData([...data.filter((el) => el.id !== Number(id))]);
      })
      .catch((err) => console.log(err));
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <TodoContainer isLoading={isLoading}>
      {!isLoading ? (
        <>
          <TodoList>
            {data.map((data) => (
              <TodoItem
                key={data.id}
                id={data.id}
                isCompleted={data.isCompleted}
                onClick={updateItem}
                onDoubleClick={deleteItem}
              >
                {data.title}
              </TodoItem>
            ))}
          </TodoList>
          <TodoInput onSubmit={createItem}>
            <input
              placeholder="여기에 입력하세요"
              value={input}
              onChange={handleInput}
              maxLength="19"
              required
            />
            <button type="submit">Add</button>
          </TodoInput>
        </>
      ) : (
        <LoadingDotFlashing />
      )}
    </TodoContainer>
  );
};

export default TodosForm;
