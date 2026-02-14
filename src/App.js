import { useState } from "react";
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
  const [slide, setSlide] = useState(0);
  const [confettiKey, setConfettiKey] = useState(0);

  return (
    <div className="container">
      <audio src="/music.mp3" autoPlay loop />

      {/* CONFETTI */}
      {(stage === "flower" || stage === "final") && (
        <Confetti key={confettiKey} />
      )}

      {/* ENVELOPE */}
      {stage === "envelope" && (
        <div className="envelope" onClick={() => setStage("flower")}>
          💌
          <p>Click to open</p>
        </div>
      )}

      {/* FLOWER */}
      {stage === "flower" && (
        <div
          className="flower-stage"
          onClick={() => {
            setConfettiKey(confettiKey + 1); // 🔥 restart confetti
            setStage("message");
          }}
        >
          <img src="/flower.gif" className="flower-grow" />
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
          <img src={slides[slide].img} />
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
          <h1>Happy Birthday & Happy Valentine’s Day Again💛</h1>
          <img src="/funny.gif" width="250" />
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