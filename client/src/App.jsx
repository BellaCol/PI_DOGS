import './App.css';
import Pagination from './components/pagination/Pagination.jsx';
import Nav from './components/nav/Nav.jsx';
import Landing from './components/landing/Landing.jsx';
import Detail from './components/detail/Detail.jsx';
import Form from './components/form/Form.jsx';
import {Routes, Route, useNavigate } from 'react-router-dom';
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {addAll, getTemperaments} from './redux/actions.js'


function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const characters = useSelector(state=>state.characters)
  const temperaments = useSelector(state=>state.temperaments)

  useEffect(() => {
    const fetchData = async () => {
      navigate('/')
      try {
        dispatch(addAll())
        dispatch(getTemperaments())
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  
  }, []);
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Nav />
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/home' element={<Pagination temperaments={temperaments} characters={characters}/>}/>
          <Route path='/detail/:id' element={<Detail/>}/>
          <Route path='/form' element={<Form temperaments={temperaments}/>}/>
        </Routes>
    </div>
  );
}

export default App;
