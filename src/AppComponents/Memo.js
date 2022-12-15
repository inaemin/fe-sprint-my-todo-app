import Header from "../components/Header";
import Nav from "../components/Nav";
import Form from "../components/Form";

const Memo = () => {
  return (
    <>
      <Header title="오늘의 할일" />
      <main>
        <Form />
      </main>
      <Nav />
    </>
  );
};

export default Memo;
