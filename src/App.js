import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import Add from './Pages/Add';
import Error from './Pages/Error';

// datepicker config
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

function App() {
  return (
    <div className="App">
      
<Router>
        <Routes>
          <Route path='/'element={<Login></Login>}>login</Route>
          <Route path='/Home' element={<Home></Home>} > </Route>
          {/* <Route path='/Edit' element={<Edit></Edit>}></Route> */}
          <Route path='/Add' element={<Add></Add>} ></Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
