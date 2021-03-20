import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderItem from './components/Header';
import Slice from './components/Slice';
import Container from './components/Container';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <section>
        <header>
          <HeaderItem />
        </header>
      </section>
      <section>
        <Slice />
        <div className="container" style={{ maxWidth: '100%' }}>
          <h3>New arrival</h3>
          <Container />
          <h3>New arrival</h3>
          <Container />
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
}

export default App;
