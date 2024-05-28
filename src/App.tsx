import { useLayoutEffect, useState } from 'react';
import './App.css';

import Nav from './components/nav/nav';
import Footer from './components/footer/footer';

import { Outlet, useLocation } from 'react-router-dom';

import { HeroContext } from './context/hero_context';

function App() {

  const [heroRef, setHeroRef] = useState<React.RefObject<HTMLDivElement>|undefined>(undefined);

  const location = useLocation();
  useLayoutEffect(() => {
    console.log('scrolling to top')
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname])


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
