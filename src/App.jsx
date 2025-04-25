import { Brain } from 'lucide-react';
import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Features from './pages/Features';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import ATS  from './pages/ATS';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <Brain className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">ResumeScorer</span>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link to="/" className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </Link>
                  <Link to="/scanner" className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">
                    Scanner
                  </Link>
                  <Link to="/features" className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">
                    Features
                  </Link>
                  <Link to="/ats" className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">
                    ATS
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <Link
                  to="/scanner"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Try Now
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/features" element={<Features />} />
            <Route path="/ats" element={<ATS />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;