import { useState } from 'react';
import './App.css';

import Nav from './components/nav/nav';
import Footer from './components/footer/footer';

import { Outlet } from 'react-router-dom';

import { HeroContext } from './context/hero_context';

function App() {

  const [heroRef, setHeroRef] = useState<React.RefObject<HTMLDivElement>|undefined>(undefined);

  return (
    <div className="App">
      <HeroContext.Provider value={{heroRef, setHeroRef}}>
        <header>
          <Nav />
        </header>
        <main>
          <Outlet />
        </main>
        <Footer />
      </HeroContext.Provider>
    </div>
  );
}

export default App;
