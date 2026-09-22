import React, { useState, useRef } from 'react'

const VoiceInput = ({ setMessage }) => {

    const FileInputRef = useRef(null);

    const [islistening, setIsListening] = useState(false);

    //Mic sensitivity
    //it will stores what level of microphone  sensitivity the user selected. setSenstivity changes  that selection
    const [sensitivity, setSensitivity] = useState(50)

    //Current Microphone Volume
    //stores the Current microphone Volume
    const [volume, setVolume] = useState(0)

    //A Analyser is a device that watches the microphone and tells us how strong the audio signal is.
    const analyserRef = useRef(null);

    //Here we Repeatedly check the Microphone Volume
    const animationRef = useRef(null);

    //This Stores the Microphone Stream
    const streamRef = useRef(null)

    //we are making it asynchronous because as we will be waiting for the permission to access the Microphone
    const startListening = async () => {

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }

        try {

            //Get Microphone
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            })



            //Here we will the browser medio from the stream and then will svae it into the streamRef
            //We do this because we later need to stop it 
            streamRef.current = stream

            //create a audio context
            //this will create a Web Audio Api Environment
            const audioContext = new AudioContext()

            //Connect the Microphone to analyzer
            //connect the Microphone to the Audio System
            const microphone = audioContext.createMediaStreamSource(stream)
            //This is where we can inspect the Microphone signals
            //The analyzer doesn'r record the voice itself
            //it allows us to ask: "how loud is the Microphone right Now"
            const analyzer = audioContext.createAnalyser();
            //This tells how much audio information we examine at each Moment
            analyzer.fftSize = 256;

            microphone.connect(analyzer);

            analyserRef.current = analyzer;

            //Start checking microphone Volume
            checkVolume();
            const recognition = new SpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-IN';

            setIsListening(true);

            recognition.onresult = (e) => {
                const transcript = e.results[0][0].transcript;

                setMessage((prevMessage) =>
                    prevMessage
                        ? prevMessage + ' ' + transcript
                        : transcript
                );
            };

            recognition.onerror = (e) => {
                console.error('Speech Recognition error: ', e.error);
                setIsListening(false);
                stopMicrophone()
            };

            recognition.onend = () => {
                setIsListening(false);
                stopMicrophone()
            };

            recognition.start();

        } catch (e) {
            console.error(
                'Microphone error:',
                e
            )
        }
    };

    //Function which used to check the Volume

    const checkVolume = () => {
        if (!analyserRef.current) return;

        const analyzer = analyzer.current;

        const dataArray = new Uint8Array(analyserRef.frequencyBinCount);

        analyzer.getByteTimeDomainData(dataArray);

        let sum = 0;

        for (let i = 0; i < dataArray.length; i++) {
            const normalized = (dataArray[i] - 128) / 128;

            sum += normalized * normalized
        }

        const rms = Math.sqrt(sum / dataArray.length);

        const currentVolume = Math.min(rms * 500, 100);

        setVolume(currentVolume);

        animationRef.current = requestAnimationFrame(checkVolume)
    }



    return (
        <button
            type='button'
            onClick={startListening}
            className={`px-4 py-2.5 ${islistening
                ? 'bg-red-600'
                : 'bg-slate-800 hover:bg-slate-700'
                } text-white rounded-xl transition duration-200`}
        >
            {islistening ? '🔴' : '🎙️'}
        </button>
    )
}

export default VoiceInput