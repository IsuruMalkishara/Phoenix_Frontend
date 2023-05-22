import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
       <Router>
        <div>
        <Routes>
              
              <Route path="/" exact element={<HomePage/>}></Route>

        </Routes>
        </div>
       </Router>
    </div>
  );
}

export default App;
