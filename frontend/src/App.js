import './App.css';
import Navbar from './Components/Navbar/navbar';
import Main from './Components/Main/main';
import { followingDotCursor } from 'cursor-effects'
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Features from './Components/Features/features';
import Summarizer from './Components/ToolKit/Summarizer';
import Paraphraser from './Components/ToolKit/Paraphraser';
import SpellChecker from './Components/ToolKit/SpellChecker';
import GrammarChecker from './Components/ToolKit/GrammarChecker';
import WordMeaning from './Components/ToolKit/WordMeaning';
import Article from './Components/Creative Writing/Article';
import Essay from './Components/Creative Writing/Essay';
import Story from './Components/Creative Writing/Story';
import Poem from './Components/Creative Writing/Poem';
import Play from './Components/Creative Writing/Play';
import Debate from './Components/Creative Writing/Debate';

function App() {
  useEffect(() => {
    new followingDotCursor({ color: ["#CCC9E7"] });

  }, []);
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/features' element={<Features/>}/>
          <Route path='/summarizer' element={<Summarizer/>} />
          <Route path='/paraphraser' element={<Paraphraser/>} />
          <Route path='/spell-checker' element={<SpellChecker/>} />
          <Route path='/grammar-checker' element={<GrammarChecker/>} />
          <Route path='word-meaning' element={<WordMeaning/>} />
          <Route path='/article' element={<Article/>}/>
          <Route path='/essay' element={<Essay/>}/>
          <Route path='/story' element={<Story/>}/>
          <Route path='/poem' element={<Poem/>}/>
          <Route path='/play' element={<Play/>}/>
          <Route path='/debate' element={<Debate/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
