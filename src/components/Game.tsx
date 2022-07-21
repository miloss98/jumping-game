import { useEffect, useRef, useState } from "react";
import "./../styles/game.css";
import Modal from "react-modal";
Modal.setAppElement("#root");
const Game = () => {
  const charRef = useRef<HTMLDivElement>(null!);
  const obsRef = useRef<HTMLDivElement>(null!);
  //const [points, setPoints] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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
      if (obstacleLeft < 40 && obstacleLeft > 0 && characterTop >= 266) {
        obsRef.current.style.animation = "none";
        openModal();
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
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      backgroundColor: "yellow",
      transform: "translate(-50%, -50%)",
      boxShadow: "1px 1px 1px black",
    },
  };
  return (
    <>
      <div onClick={jump} className="game-container">
        <div ref={charRef} className="character"></div>
        <div ref={obsRef} className="obstacle"></div>
      </div>
      {modalIsOpen && (
        <section className="modal-container">
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <h2 className="game-over">Game over!</h2>
            <button className="play-again" onClick={closeModal}>
              Play Again
            </button>
          </Modal>
        </section>
      )}
    </>
  );
};

export default Game;
