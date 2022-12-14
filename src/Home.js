import Header from "./components/Header";
import Weather from "./components/Weather";
import Todo from "./components/Todo";
import Nav from "./components/Nav";

const Home = () => {
  return (
    <>
      <Header title="홈" />
      <Weather />
      <Todo />
      <Nav />
    </>
  );
};

export default Home;
