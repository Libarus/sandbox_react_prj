import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Roster from './components/roster';
import Schedule from './components/Schedule';

function App() {
    return (
        <>
            <nav>
                <div>
                    <Link to="/">Home</Link> |
                    <Link to="/roster">Roster</Link> |
                    <Link to="/schedule">Schedule</Link>
                </div>
            </nav>
            <hr />

            <Routes>

                <Route path='/' element={<Home />} />

                {/* Оба /roster и /roster/:number начинаются с /roster */}
                <Route path='/roster' element={<Roster />} />
                <Route path='/schedule' element={<Schedule />} />

            </Routes>

        </>
    )
}

export default App
