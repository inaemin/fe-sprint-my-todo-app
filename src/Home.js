import Header from './components/Header';
import Weather from './components/Weather';
import Summary from './components/Summary';
import Nav from './components/Nav';

const Home = () => {
  return (
    <>
      <Header title="홈" />
      <main>
        <Weather />
        <Summary />
      </main>
      <Nav />
    </>
  );
};

export default Home;
