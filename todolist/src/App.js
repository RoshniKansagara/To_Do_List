import './App.css';
import Todo from './Container/Todo';
import {Routes, Route} from 'react-router-dom';
import View from './Container/View';

function App() {
    return(
        <Routes>
            <Route path='/' element={<Todo/>}>Todo</Route>
            <Route path='/view' element={<View/>}>View</Route>
        </Routes>
    )
}

export default App;
