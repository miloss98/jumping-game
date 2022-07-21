import Game from "./components/Game";
import "./styles/app.css";
function App() {
  return (
    <div className="wrapper">
      <section className="header">
        <p> </p>
        <h1 className="game-title"> Jumping game </h1>
        <p className="score">
          Score: <span className="points"> 0 </span>
        </p>
      </section>
      <Game />
    </div>
  );
}

export default App;
