import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import bleepWords from "./bleepWords";

const App = () => {
  const [text, setText] = useState("");
  const [speechUrl, setSpeechUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);
  const apiKey = "ba5549217emsh62ddef385876822p1d17c9jsna7a7c65ed47e";

  useEffect(() => {
    audioRef.current = new Audio();

  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const parseSentences = (text) => {
    const sentences = text.split(/[.!?]/);
    return sentences.filter(sentence => sentence.trim() !== '');

  };

  const handleSpeak = async () => {
    setLoading(true);
    setError(null);

    try {
      const sentences = parseSentences(text);

      for (const sentence of sentences) {
        const url = 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize';
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
		        'X-RapidAPI-Key': apiKey,
		        'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com'
          },
          
          body: new URLSearchParams({
            voice_code:'en-US-1',
            text: bleepWords(sentence.trim()),
            speed: '1.00',
            pitch: '1.00',
            output_type: 'audio_url',
          }),
        };

        const response = await fetch(url, options);

        if(!response.ok) {
          throw new Error('API request Failed');
        }

        const result = await response.json();

        if (result.status === 'success' && result.result.audio_url) {
          const audioUrl = result.result.audio_url;

          if(!audioRef.current) {
            setError('Audio element not found, Ref is not attached properly');
            return;
          }

          if(!audioRef.current.canPlayType('audio/mpeg')) {
            setError('This browser cant support MP3 audio');
            return;
          }

          setSpeechUrl(audioUrl);
          
          await new Promise(resolve => {
            audioRef.current.addEventListener('ended', resolve);
            audioRef.current.src = audioUrl;
            audioRef.current.play();
          });
        
        } else {
          setError('Audio URL not found in API response');

        }
      }
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);

    } finally {
      setLoading(false);
    }
  };

  const handlePause = () => {
    if(audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="container">
      <h1>Text to Speech</h1>
      {error && <p> Error: {error}</p>}
      <textarea 
      placeholder="Enter the text"
      value={text}
      onChange={handleTextChange}
      />
      <button onClick= {handleSpeak} disabled={loading}>
        {loading ? 'Speaking...': 'Speak'}
      </button>
      <button onClick={handlePause} disabled = {!speechUrl}>
        Pause
      </button>
    </div>
  );
};
// import { Controls } from "./components/Controls";
// import { CurrentlyReading } from "./components/CurrentlyReading";

// function App() {
//   // const [sentences, setSentences] = useState<Array<string>>([]);
//   // const { currentWord, currentSentence, controls } = useSpeech(sentences);

//   return (
//     <div className="App">
//       <h1>Text to speech</h1>
//       <div>
//         <CurrentlyReading />
//       </div>
//       <div>
//         <Controls />
//       </div>
//     </div>
//   );
// }

export default App;
