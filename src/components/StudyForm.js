import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { LoadingDotFlashing } from './Loading';
import { CartContainer, CartList, CartItem, CartInput } from './CartForm';

const StudyContainer = styled(CartContainer)`
  background-color: #e9defc;
`;

const StudyList = styled(CartList)``;

const StudyItem = styled(CartItem)``;

const StudyInput = styled(CartInput)`
  border: 2px solid #8a4af3;
  button:hover {
    background-color: #8a4af3;
    color: white;
  }
`;

const StudyForm = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/study').then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const createItem = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/study`, {
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
      .patch(`http://localhost:3001/study/${id}`, {
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
      .delete(`http://localhost:3001/study/${id}`)
      .then(() => {
        setData([...data.filter((el) => el.id !== Number(id))]);
      })
      .catch((err) => console.log(err));
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <StudyContainer isLoading={isLoading}>
      {!isLoading ? (
        <>
          <StudyList>
            {data.map((data) => (
              <StudyItem
                key={data.id}
                id={data.id}
                isCompleted={data.isCompleted}
                onClick={updateItem}
                onDoubleClick={deleteItem}
              >
                {data.title}
              </StudyItem>
            ))}
          </StudyList>
          <StudyInput onSubmit={createItem}>
            <input
              placeholder="????????? ???????????????"
              value={input}
              onChange={handleInput}
              maxLength="19"
              required
            />
            <button type="submit">Add</button>
          </StudyInput>
        </>
      ) : (
        <LoadingDotFlashing />
      )}
    </StudyContainer>
  );
};

export default StudyForm;
