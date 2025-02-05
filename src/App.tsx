import "./App.css";
import Hero from "./sections/Hero/Hero";
import Projects from "./sections/Projects/Projects";
import Education from "./sections/Education/Education";
import Contact from "./sections/Contact/Contact";
import About from "./sections/About/About";
import Navbar from "./sections/Navbar";
import Comments from "./sections/Comments/Comments";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Education />
      <Contact />
      <Comments />
    </>
  );
}

export default App;
