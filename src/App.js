import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import List from './components/List';

function App() {
  return (
    <div className="App container-fluid">
      <h1 className='mt-3' style={{color:'crimson'}}>Hello All!!</h1>
      <List />
    </div>
  );
}

export default App;
