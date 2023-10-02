import './App.css';
import noRecordsFound from '../src/assets/no-records.svg';

function App() {
  return (
    <div className="App">
    <header>
        <nav className="navbar">
            <div className="container">
                <p>Employee List</p>
            </div>
        </nav>
    </header>
    <main>
       <img className='no-records' src={noRecordsFound} alt="no-records-img" />
       <button className='plus-button'>+</button>
    </main>
    </div>
  );
}

export default App;
