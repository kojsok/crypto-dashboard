import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import MenuBar from './components/MenuBar/menubar'
import { Dashboard } from './Dashboard';

function App() {
  

  return (
    <>
      <Router>
            <div>
                {/* Определяем маршруты для каждой страницы */}
                <Routes>
                    <Route path="/" element={<MenuBar /> }/>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/news" element={<MenuBar />} />
                    <Route path="/contact" element={<MenuBar />} />
                </Routes>
            </div>
        </Router>
    </>
  )
}

export default App
