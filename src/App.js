import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import beaver_footer from "./images/home-beaver.svg";
function App() {
  return (
    <div>
      <Home />
      <img src={beaver_footer} />
    </div>
  );
}

export default App;
