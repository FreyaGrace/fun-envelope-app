import { useState, useRef, useEffect } from "react";// useRef needed for audio
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
  const [imgLoading, setImgLoading] = useState(false);

  const audioRef = useRef(null);

useEffect(() => {
  if (slide < slides.length - 1) {
    const img = new Image();
    img.src = slides[slide + 1].img;
  }
}, [slide]);

  const handleEnvelopeClick = () => {
    setStage("flower");
    if (audioRef.current) audioRef.current.play();
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
        <div className="stage">
          <div className="envelope" onClick={handleEnvelopeClick}>
            💌
            <p>Click to open</p>
          </div>
        </div>
      )}

      {/* FLOWER */}
      {stage === "flower" && (
        <div className="stage" onClick={() => { setConfettiKey(confettiKey + 1); setStage("message"); }}>
          <video autoPlay loop muted width="250">
            <source src="/flower.mp4" type="video/mp4" />
          </video>
          <p>Tap the flower 🌸</p>
        </div>
      )}

      {/* MESSAGE */}
      {stage === "message" && (
        <div className="stage" onClick={() => setStage("slideshow")}>
          <h1>Happy Birthday 🎂</h1>
          <h2>& Happy Valentine’s Day 💖</h2>
          <p>Tap to continue →</p>
        </div>
      )}

      {/* SLIDESHOW */}
      {stage === "slideshow" && (
        <div className="stage slideshow">
          {imgLoading && <div className="spinner" />}
          <img
            key={slide}
            src={slides[slide].img}
            alt={`Slide ${slide + 1}`}
            loading="lazy"
            onLoad={() => setImgLoading(false)}
            style={{ display: imgLoading ? "none" : "block" }}
          />
          {slides[slide].text && <p>{slides[slide].text}</p>}
          <button
            onClick={() => {
              if (slide === slides.length - 1) setStage("final");
              else setSlide(slide + 1);
            }}
          >
            Next ➡️
          </button>
        </div>
      )}

      {/* FINAL JOKE / GIF */}
      {stage === "final" && (
        <div className="stage final">
          <h1>Happy Birthday & Happy Valentine’s Day Again 💛</h1>
          <video autoPlay loop muted width="250">
            <source src="/funny.mp4" type="video/mp4" />
          </video>
          <p>
            Enjoy your day—kung anong pace ang comfy para sa inyo. <br />
            Always rooting for you ✨
          </p>
          <button onClick={() => { setStage("envelope"); setSlide(0); }}>
            Replay 🔁
          </button>
        </div>
      )}
    </div>
  );
}
