import { useState, useEffect } from "react";

const Recorder = ({trigger, handleSend, handleChange, name, handleClose}) => {
      const [audioURL, setAudioURL] = useState("");
      const [isRecording, setIsRecording] = useState(false);
      const [recorder, setRecorder] = useState(null);
    
      useEffect(() => {
        // Lazily obtain recorder first time we're recording.
        if (recorder === null) {
          if (isRecording) {
            requestRecorder().then(setRecorder, console.error);
          }
          return;
        }
    
        // Manage recorder state.
        if (isRecording) {
          recorder.start();
        } else {
          recorder.stop();
        }
    
        // Obtain the audio when ready.
        const handleData = e => {
          setAudioURL(URL.createObjectURL(e.data));
        };
    
        recorder.addEventListener("dataavailable", handleData);
        return () => recorder.removeEventListener("dataavailable", handleData);
      }, [recorder, isRecording]);
    
      const startRecording = () => {
        setIsRecording(true);
      };
    
      const stopRecording = () => {
        setIsRecording(false);
      };
    
    async function requestRecorder() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      return new MediaRecorder(stream);
    }

    const send = (n) => {
        handleChange(audioURL);
        handleSend(n);
    }

    return ( 
        trigger ? 
        (<div className='upload-popup'>
            <div className='upload-popup-inner'>
                
                <button onClick={() => send(name)}>Send</button>
                <button onClick={() => handleClose()}>X</button>
                <button onClick={() => startRecording()}>Start</button>
                <button onClick={() => stopRecording()}>Stop</button>
                
                <br></br>
                <br></br>

  

                
            </div>
        </div>) : ""
     );
}
 
export default Recorder;



