
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage'
import Home from './components/Home/Home';
import About from './components/About/About';
import Create from './components/Create/Create';
import Navbar from './components/Navbar/Navbar'
import Detail from './components/Detail/Detail';
import Search from './components/Search/Search';

function App() {
  return (

<div className="App">
<Routes>
  <Route path='/' element={<LandingPage />}/>
  <Route path='/home/*' element={
      <>
        <Navbar />
        <Home />
      </>
    }
  />
  <Route path='/about/*' element={
      <>
        <Navbar />
        <About />
      </>
    }
  />
  <Route path='/create/*' element={
      <>
        <Navbar />
        <Create />
      </>
    }
    
  />
  <Route path='/detail' element={
      <>
        <Navbar />
        <Detail/>
      </>
    }
  />
  <Route path='/search' element={
      <>
        <Navbar />
        <Search/>
      </>
    }
  />
</Routes>
</div>
);
}



export default App;


