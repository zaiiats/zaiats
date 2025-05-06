import FullScreen from '../components/containers/Screen';
import Hero from '../components/sectors/Hero';

function Home() {
  return (
    <div>
      <FullScreen id='home'>
        <Hero />
      </FullScreen>
      <FullScreen id='projects'>
        <>Hi</>
      </FullScreen>
      <FullScreen id='about'>
        <>Hi</>
      </FullScreen>
    </div>
  );
}

export default Home;
