import { useEffect, useRef, useState } from "react";
import "./../styles/game.css";
import Modal from "react-modal";
import tractor from "./../assets/images/tractor.png";
import grass from "./../assets/images/grass.png";

Modal.setAppElement("#root");
const Game = () => {
  const charRef = useRef<HTMLDivElement>(null!);
  const obsRef = useRef<HTMLDivElement>(null!);
  const [points, setPoints] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const jump = (): void => {
    charRef.current.classList.add("animate");
    setTimeout(() => {
      charRef.current.classList.remove("animate");
    }, 300);
  };

  const refreshWindow = (): void => {
    window.location.reload();
  };

  /* function for checking collision */
  const check = (): void => {
    setInterval(() => {
      var characterTop = parseInt(
        window.getComputedStyle(charRef.current).getPropertyValue("top")
      );
      let obstacleLeft = parseInt(
        window.getComputedStyle(obsRef.current).getPropertyValue("left")
      );
      if (obstacleLeft < 20 && obstacleLeft > 0 && characterTop >= 270) {
        obsRef.current.style.animation = "none";
        openModal();

        setPoints(0);
        setGameOver(true);
      }
    }, 10);
  };

  /* Modal */
  const openModal = (): void => {
    setModalIsOpen(true);
  };
  const closeModal = (): void => {
    setModalIsOpen(false);
    refreshWindow();
  };

  useEffect(() => {
    check();
  });
  useEffect(() => {
    if (!gameOver) {
      const pointsInterval = setInterval(() => {
        setPoints((points) => points + 10);
      }, 1000);

      return () => {
        clearInterval(pointsInterval);
        setScore(points);
      };
    }
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      backgroundColor: "yellow",
      transform: "translate(-50%, -50%)",
      boxShadow: "1px 1px 1px black",
      height: "150px",
      width: "200px",
    },
  };
  return (
    <>
      <section className="header">
        <p> </p>
        <h1 className="game-title"> Jumping game </h1>
        <p className="score">
          Score: <span className="points"> {points} </span>
        </p>
      </section>
      <div onClick={jump} className="game-container">
        <div ref={charRef} className="character">
          <img className="tractor" src={tractor} alt="tractor" />
        </div>
        <div ref={obsRef} className="obstacle">
          <img className="tractor" src={grass} alt="tractor" />
        </div>
      </div>
      {modalIsOpen && (
        <section className="modal-container">
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <h2 className="game-over">Game over!</h2>
            <p className="your-score">
              Your score: <span> {score} </span>
            </p>
            <div className="btn-container">
              <button className="play-again" onClick={closeModal}>
                Play Again
              </button>
            </div>
          </Modal>
        </section>
      )}
    </>
  );
};

export default Game;
