import FullScreen from '../components/containers/Screen';
import Hero from '../components/sectors/Hero';
import About from '../components/sectors/About';
import Projects from '../components/sectors/Projects';

function Home() {
  return (
    <div>
      <FullScreen id='home'>
        <Hero />
      </FullScreen>
      <FullScreen id='projects'>
        <Projects />
      </FullScreen>
      <FullScreen id='about'>
        <About />
      </FullScreen>
    </div>
  );
}

export default Home;
