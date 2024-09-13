import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './components/Home';
import JobDetail from './components/JobDetails';
import Jobs from './components/Jobs';
import BookMark from './components/BookMark';

import './App.css';

const App = ()  => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/jobs" element={<Jobs/>}/>
        <Route exact path="/job/:id" element={<JobDetail />} />
        <Route path="/bookmark" element={<BookMark />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
