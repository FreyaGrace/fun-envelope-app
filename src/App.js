import { useState, useRef, useEffect } from "react"; // useRef for audio, useEffect for image loading
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
  const [imgLoading, setImgLoading] = useState(false); // start with false for first slide

  const audioRef = useRef(null);

  // Whenever slide changes, show spinner until image loads
  useEffect(() => {
    setImgLoading(true);
  }, [slide]);

  const handleEnvelopeClick = () => {
    setStage("flower");
    if (audioRef.current) {
      audioRef.current.play(); // start music after first click
    }
  };

  return (
    <div className="container">
      {/* audio */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* Confetti */}
      {(stage === "flower" || stage === "final") && (
        <Confetti key={confettiKey} />
      )}

      {/* Envelope */}
      {stage === "envelope" && (
        <div className="envelope" onClick={handleEnvelopeClick}>
          💌
          <p>Click to open</p>
        </div>
      )}

      {/* Flower */}
      {stage === "flower" && (
        <div
          className="flower-stage"
          onClick={() => {
            setConfettiKey(confettiKey + 1);
            setStage("message");
          }}
        >
          <video autoPlay loop muted width="250">
            <source src="/flower.mp4" type="video/mp4" />
          </video>
          <p>Tap the flower 🌸</p>
        </div>
      )}

      {/* Message */}
      {stage === "message" && (
        <div className="message" onClick={() => setStage("slideshow")}>
          <h1>Happy Birthday 🎂</h1>
          <h2>& Happy Valentine’s Day 💖</h2>
          <p>Tap to continue →</p>
        </div>
      )}

      {/* Slideshow */}
      {stage === "slideshow" && (
        <div className="slideshow">
          {imgLoading && <div className="spinner" />} {/* spinner shows while loading */}

          <img
            key={slide} // force re-render when slide changes
            src={slides[slide].img}
            alt={`Slide ${slide + 1}`}
            onLoad={() => setImgLoading(false)} // hide spinner once loaded
            style={{ display: imgLoading ? "none" : "block" }}
          />

          {slides[slide].text && <p>{slides[slide].text}</p>}

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

      {/* Final GIF / Video */}
      {stage === "final" && (
        <div className="final">
          <h1>Happy Birthday & Happy Valentine’s Day Again 💛</h1>
          <video autoPlay loop muted width="250">
            <source src="/funny.mp4" type="video/mp4" />
          </video>
          <p>
            Enjoy your day—kung anong pace ang comfy para sa inyo.
            <br />
            Always rooting for you ✨
            <br />
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
