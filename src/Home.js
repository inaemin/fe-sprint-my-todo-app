import Header from "./components/Header";
import Weather from "./components/Weather";
import Todo from "./components/Todo";
import Nav from "./components/Nav";

const Home = () => {
  return (
    <>
      <Header title="홈" />
      <main>
        <Weather />
        <Todo />
      </main>
      <Nav />
    </>
  );
};

export default Home;
