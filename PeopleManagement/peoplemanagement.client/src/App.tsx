import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PersonList from './components/person/PersonList';
import GoRestList from './components/goRestUser/GoRestList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/persons" element={<PersonList />} />
                <Route path="/gorest" element={<GoRestList />} />
            </Routes>            
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Router>
    );
}

export default App;
