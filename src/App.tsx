import "./App.css";
import { BiSolidCoffee } from "react-icons/bi";
import { GiCupcake } from "react-icons/gi";
import { TbTrees } from "react-icons/tb";
import { useState, createContext, useContext, useEffect } from "react";
import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

// Create theme context
const ThemeContext = createContext({
  isColorful: false,
  toggleTheme: () => {},
});

function ThemeToggle() {
  const { isColorful, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <button
        onClick={() => toggleTheme()}
        className={`theme-icon ${!isColorful ? "active" : ""}`}
      >
        <BiSolidCoffee size={20} />
      </button>
      <button
        onClick={() => toggleTheme()}
        className={`theme-icon ${isColorful ? "active" : ""}`}
      >
        <GiCupcake size={20} />
      </button>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1>
          <span>emmaking</span>
          <span className="highlight">dev</span>
        </h1>
        <nav>
          <a
            href="https://github.com/emmakingdev"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/emmakingdev"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="farewell-text">
          <span className="greeting">Bye!</span> Thanks for visiting
        </p>
        <p className="farewell-text">emma@emmaking.dev</p>
        <p className="copyright">© {currentYear} Emma King</p>
      </div>
    </footer>
  );
}

function ProjectGrid() {
  const projects = [
    {
      id: 1,
      title: "Colorku",
      image: "/images/projects/2.png",
      shortDesc: "Sudoku but with colors",
      github: "https://github.com/EmmaKingDev/colorku",
      liveUrl: "https://colorku.web.app/",
    },
    {
      id: 2,
      title: "Poetry Generator",
      image: "/images/projects/1.png",
      shortDesc: "Simple poetry generator",
      github: "https://github.com/EmmaKingDev/mywebsite",
      liveUrl: "https://mywebsite-githubrepo.web.app/",
    },
    {
      id: 3,
      title: "Knitting Chart",
      image: "/images/projects/3.png",
      shortDesc: "Design knitting charts",
      github: "https://github.com/EmmaKingDev/knitting-chart",
      liveUrl: "https://knitting-charts.web.app/",
    },
  ];

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          <a
            href={project.liveUrl || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-image-link"
          >
            <img
              src={project.image}
              alt={project.title}
              onError={(e) => {
                console.error(`Failed to load image: ${project.image}`);
                e.currentTarget.style.display = "none";
              }}
            />
          </a>
          <div className="project-content">
            <h3>{project.title}</h3>
            <p>{project.shortDesc}</p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more-link"
            >
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

function About() {
  return (
    <section className="about-section">
      <div className="about-text">
        <p>
          <span className="greeting">Hi!</span> I'm a software engineer at a
          maintenance company. I mostly work with containers running on Linux
          servers, Kubernetes, CI/CD pipes, IaC, AWS Cloud, and a bunch of
          programming languages. I also do freelance work, building websites and
          handling tech & design for small businesses.
        </p>
        <p>
          I studied a lot of things! Educational psychology, chemistry, and
          computer science at the Uni of Helsinki and graphic design at Helsinki
          Design School. That mix helps me bring both analytical thinking and a
          human-centered approach to client work. As they say in Finnish - I can
          see the forest for the trees. <TbTrees size={20} />
        </p>
      </div>
    </section>
  );
}

function App() {
  const [isColorful, setIsColorful] = useState(true);

  const toggleTheme = () => {
    setIsColorful((prev) => !prev);
  };

  useEffect(() => {
    // Log page view when the app loads
    logEvent(analytics, "page_view");
  }, []);

  return (
    <ThemeContext.Provider value={{ isColorful, toggleTheme }}>
      <div
        className={`app-container ${isColorful ? "colorful" : "monochrome"}`}
      >
        <Header />
        <main className="main-content">
          <About />
          <h2 className="section-title">few of my recent creations</h2>
          <ProjectGrid />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
