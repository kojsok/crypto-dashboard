import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import MenuBar from './components/MenuBar/menubar'
import { Dashboard } from './Dashboard';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './components/Api/api';

function App() {
  

  return (
    <>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
    </>
  )
}

export default App
