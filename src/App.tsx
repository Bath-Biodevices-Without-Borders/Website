import './App.css';
import NavBar from './components/nav_bar/nav_bar';
import Footer from './components/footer/footer';

import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
