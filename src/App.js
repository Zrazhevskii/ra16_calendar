// import logo from './logo.svg';
// import './App.css';
import { Calendar } from './components/Calendar/Calendar';
import './components/Calendar/Calendar.css'

const now = new Date();

function App() {
  return (
    <Calendar date={now} />
  );
}

export default App;
