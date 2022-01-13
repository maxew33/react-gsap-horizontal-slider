import './App.css';
import SlideContact from './components/SlideContact';
import SlideHome from './components/SlideHome';
import SlideSkills from './components/SlideSkills';
import SlideWork from './components/SlideWork';

function App() {
  return (
    <div className="App">
      <h1 className='banner'>banner</h1>
      <SlideHome/>
      <SlideWork/>
      <SlideSkills/>
      <SlideContact/>
    </div>
  )
}

export default App;
