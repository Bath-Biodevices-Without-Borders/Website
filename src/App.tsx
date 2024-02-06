import './App.css';
import NavBar from './components/nav_bar/nav_bar';
import Footer from './components/footer/footer';
import HomePage from './pages/home_page/home_page';
import AboutPage from './pages/about_page/about_page';
import OasisPage from './pages/oasis_page/oasis_page';
import ContactPage from './pages/contact_page/contact_page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <Router>
          <header>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/about" element={<AboutPage />}></Route>
              <Route path="/oasis" element={<OasisPage/>}></Route>
              <Route path="/contact" element={<ContactPage/>}></Route>
            </Routes>
          </header>
          <Footer />
        </Router>
    </div>
  );
}

export default App;
