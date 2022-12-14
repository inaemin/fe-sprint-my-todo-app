import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { LoadingDotFlashing } from "./Loading";

const ToDoContainer = styled.div`
  width: auto;
  height: 520px;
  background-color: rgba(236, 236, 236, 0.35);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const ToDoList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 0;
`;

const ToDoItem = styled.li`
  list-style: none;
  font-size: 20px;
  line-height: 200%;
  color: ${(props) => (props.isCompleted ? "#B1B1B1" : "black")};
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "")};
  transition: 0.2s ease-in-out;

  i {
    margin-right: 15px;
    font-size: 25px;
  }

  .fa-square-check {
    color: ${(props) => (props.isCompleted ? "#B1B1B1" : "#56C372")};
  }

  .fa-trash-can {
    color: #ff8b3b;
  }
`;

const ToDoInput = styled.form``;

const Form = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [input, setInput] = useState();

  useEffect(() => {
    axios.get("http://localhost:3001/todos").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const createItem = () => {
    axios
      .post(`http://localhost:3001/todos`, {
        title: input,
        isCompleted: false,
      })
      .then((res) => {
        setData([...data, res.data]);
      })
      .catch((err) => console.log(err));
  };

  const updateItem = (e) => {
    const { id } = e.target.parentElement;
    const { title, isCompleted } = data.find((el) => el.id === Number(id));
    axios
      .put(`http://localhost:3001/todos/${id}`, {
        id,
        title,
        isCompleted: !isCompleted,
      })
      .then((res) => {
        setData([
          ...data.map((el) => {
            if (el.id === Number(id)) return res.data;
            else return el;
          }),
        ]);
      })
      .catch((err) => console.log(err));
  };

  const deleteItem = (e) => {
    const { id } = e.target.parentElement;
    axios
      .delete(`http://localhost:3001/todos/${id}`)
      .then((res) => {
        setData([...data.filter((el) => el.id !== Number(id))]);
      })
      .catch((err) => console.log(err));
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <ToDoContainer>
      <ToDoList>
        {!isLoading ? (
          data.map((data) => (
            <ToDoItem key={data.id} id={data.id} isCompleted={data.isCompleted}>
              <i className="fa-solid fa-square-check" onClick={updateItem}></i>
              <i className="fa-solid fa-trash-can" onClick={deleteItem}></i>
              {data.title}
            </ToDoItem>
          ))
        ) : (
          <LoadingDotFlashing />
        )}
      </ToDoList>
      <ToDoInput>
        <input placeholder="여기에 입력하세요" onChange={handleInput} required />
        <button onClick={createItem}>Enter</button>
      </ToDoInput>
    </ToDoContainer>
  );
};

export default Form;
