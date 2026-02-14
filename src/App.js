import { useState, useRef } from "react"; // useRef needed for audio
import Confetti from "react-confetti";
import "./App.css";

const slides = [
  { img: "/pic1.jpg", text: "1st day of SHS ✨" },
  { img: "/pic2.jpg" },
  { img: "/pic3.jpeg" },
  { img: "/pic4.jpg" },
  { img: "/pic5.jpg" },
  { img: "/pic6.jpg", text: "When ulit 🥺" },
  { img: "/pic7.jpeg" },
  { img: "/pic8.jpeg" },
  { img: "/pic9.jpeg" },
  { img: "/pic10.jpeg" },
  { img: "/pic11.jpeg" },
  { img: "/pic12.jpeg" },
  { img: "/pic13.jpeg" },
];

export default function App() {
  const [stage, setStage] = useState("envelope");
  const [slide, setSlide] = useState(0); // current slide index
  const [confettiKey, setConfettiKey] = useState(0);

  const audioRef = useRef(null);

  const handleEnvelopeClick = () => {
    setStage("flower");
    if (audioRef.current) {
      audioRef.current.play(); // starts music after first click
    }
  };

  return (
    <div className="container">
      {/* audio element */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* CONFETTI */}
      {(stage === "flower" || stage === "final") && (
        <Confetti key={confettiKey} />
      )}

      {/* ENVELOPE */}
      {stage === "envelope" && (
        <div className="envelope" onClick={handleEnvelopeClick}>
          💌
          <p>Click to open</p>
        </div>
      )}

      {/* FLOWER */}
      {stage === "flower" && (
        <div
          className="flower-stage"
          onClick={() => {
            setConfettiKey(confettiKey + 1); // restart confetti
            setStage("message");
          }}
        >
          <img src="/flower.gif" className="flower-grow" alt="Growing flower"/>
          <p>Tap the flower 🌸</p>
        </div>
      )}

      {/* MESSAGE */}
      {stage === "message" && (
        <div className="message" onClick={() => setStage("slideshow")}>
          <h1>Happy Birthday 🎂</h1>
          <h2>& Happy Valentine’s Day 💖</h2>
          <p>Tap to continue →</p>
        </div>
      )}

      {/* SLIDESHOW */}
      {stage === "slideshow" && (
        <div className="slideshow">
          <img src={slides[slide].img} alt={`Slide ${slide + 1}`} />
          <p>{slides[slide].text}</p>
          <button
            onClick={() => {
              if (slide === slides.length - 1) {
                setStage("final");
              } else {
                setSlide(slide + 1);
              }
            }}
          >
            Next ➡️
          </button>
        </div>
      )}

      {/* FINAL JOKE / GIF */}
      {stage === "final" && (
        <div className="final">
          <h1>Happy Birthday & Happy Valentine’s Day Again 💛</h1>
          <img src="/funny.gif" width="250" alt="Funny GIF"  />
          <p>
            Enjoy your day—kung anong pace ang comfy para sa inyo. 
            <br />
            Always rooting for you ✨
            <br/>
            Sorry, wala akong masyadong pics n’yo
          </p>
          <button
            onClick={() => {
              setStage("envelope");
              setSlide(0);
            }}
          >
            Replay 🔁
          </button>
        </div>
      )}
    </div>
  );
}
