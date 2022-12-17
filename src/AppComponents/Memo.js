import Header from '../components/Header';
import Nav from '../components/Nav';
import CartForm from '../components/CartForm';
import TodosForm from '../components/TodosForm';
import StudyForm from '../components/StudyForm';
import styled from 'styled-components';

const MidTitle = styled.h2`
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 13px;
`;

const Memo = () => {
  return (
    <>
      <Header title="오늘의 할일" />
      <main>
        <MidTitle>오늘의 장바구니</MidTitle>
        <CartForm />
        <MidTitle>오늘의 일거리</MidTitle>
        <TodosForm />
        <MidTitle>오늘의 공부</MidTitle>
        <StudyForm />
      </main>
      <Nav />
    </>
  );
};

export default Memo;
