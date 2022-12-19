import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { LoadingDotFlashing } from './Loading';

export const CartContainer = styled.div`
  background-color: #fdeeb4;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.isLoading ? 'center' : 'space-between')};
  align-items: center;
  padding: 10px;
`;

export const CartList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
`;

export const CartItem = styled.li`
  white-space: nowrap;
  list-style: none;
  font-size: 15px;
  color: ${(props) => (props.isCompleted ? '#B1B1B1' : 'black')};
  text-decoration: ${(props) => (props.isCompleted ? 'line-through' : '')};
  font-weight: ${(props) => (props.isCompleted ? 'normal' : 'bold')};
  transition: 0.1s ease-in;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

export const CartInput = styled.form`
  margin-top: 20px;
  border: 2px solid #ffc107;
  border-radius: 5px;
  padding: 5px;
  font-size: 15px;
  input {
    background-color: rgba(1, 1, 1, 0);
    border: none;
    margin-left: 5px;
    padding: 0;
    &:focus {
      outline: none;
    }
  }
  button {
    background-color: rgba(1, 1, 1, 0);
    border: none;
    border-radius: 3px;
    padding: 5px;
    &:hover {
      cursor: pointer;
      background-color: #ffc107;
      transition: 0.2s ease-in-out;
    }
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
    <CartContainer isLoading={isLoading}>
      {!isLoading ? (
        <>
          <CartList>
            {data.map((data) => (
              <CartItem
                key={data.id}
                id={data.id}
                isCompleted={data.isCompleted}
                onClick={updateItem}
                onDoubleClick={deleteItem}
              >
                {data.title}
              </CartItem>
            ))}
          </CartList>
          <CartInput onSubmit={createItem}>
            <input
              placeholder="여기에 입력하세요"
              value={input}
              onChange={handleInput}
              maxLength="19"
              required
            />
            <button type="submit">Add</button>
          </CartInput>
        </>
      ) : (
        <LoadingDotFlashing />
      )}
    </CartContainer>
  );
};

export default CartForm;
