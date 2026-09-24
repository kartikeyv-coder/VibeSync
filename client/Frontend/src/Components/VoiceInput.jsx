import React, { useState, useRef, useEffect } from 'react'

const VoiceInput = ({ setMessage }) => {

    const FileInputRef = useRef(null);

    const [islistening, setIsListening] = useState(false);

    //Mic sensitivity
    //it will stores what level of microphone  sensitivity the user selected. setSenstivity changes  that selection
    const [sensitivity, setSensitivity] = useState(50)

    //Current Microphone Volume
    //stores the Current microphone Volume
    const [volume, setVolume] = useState(0)
    // this state is used detect whether the user is speaking or not
    const [isSpeaking, setIsSpeaking] = useState(false);

    // const [islanguages, setLangauges] = useState('en-IN');

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
                StopMicrophone()
            };

            recognition.onend = () => {
                setIsListening(false);
                StopMicrophone()
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

        const analyzer = analyserRef.current;

        console.log("Analyzer:", analyzer);
        console.log("Frequency Bin Count:", analyzer.frequencyBinCount);

        const dataArray = new Uint8Array(analyzer.frequencyBinCount);

        //this will store the waveform of the audio signal
        analyzer.getByteTimeDomainData(dataArray);
        //here it is to calculate the strength of the signal
        let sum = 0;

        for (let i = 0; i < dataArray.length; i++) {
            const normalized = (dataArray[i] - 128) / 128;
            //this will calculate the total amount of energy of the  audio sample
            sum += normalized * normalized
        }
        // A useful method to calculate   the average strength of the audio signal.
        const rms = Math.sqrt(sum / dataArray.length);

        console.log("RMS:", rms);
        //the volume will not   go above the 100
        const currentVolume = Math.min(rms * 500, 100);

        setVolume(currentVolume);
        //Check whether microphone is receiving voice
        const threshold = 100 - sensitivity;
        console.log("Volume", currentVolume)

        if (currentVolume > threshold) {
            setIsSpeaking(true);
        } else {
            setIsSpeaking(false)
        }


        animationRef.current = requestAnimationFrame(checkVolume)
    }

    //Function to stop the Microphone 
    const StopMicrophone = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
        }

        if (streamRef) {
            streamRef.current?.getTracks()?.forEach(track => track.stop());
            streamRef.current = null;
        }

        analyserRef.current = null

    }


    //useEffect

    useEffect(() => {
        return () => {
            StopMicrophone();
        }
    }, [])




    return (

        <div className='flex items-center gap-3'>
            {/* Sensitivity Slider */}
            <div className='flex flex-col'>
                <label className='text-sm text-gray-600'>
                    Mic Senstivity: {sensitivity}%
                </label>

                <input
                    type="range"
                    min='1'
                    max='100'
                    value={sensitivity}
                    onChange={(e) => { setSensitivity(Number(e.target.value)) }}
                />
            </div>

            {/* Languages  */}
            {/* <select
                value={islanguages}
                onChange={(e) => setLangauges(e.target.value)}
                className="px-2 py-2 rounded"
            >
                <option value="en-IN">English (India)</option>
                <option value="en-US">English (US)</option>
                <option value="hi-IN">Hindi</option>
                <option value="bn-IN">Bengali</option>
                <option value="ta-IN">Tamil</option>
                <option value="te-IN">Telugu</option>
                <option value="mr-IN">Marathi</option>
                <option value="gu-IN">Gujarati</option>
                <option value="kn-IN">Kannada</option>
                <option value="ml-IN">Malayalam</option>
                <option value="pa-IN">Punjabi</option>
            </select> */}

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

            {/* this tag is for the volume  */}
            <div className='w-32'>

                <div className='text-xs text-gray-400'>
                    Mic Level: {Math.round(volume)}%
                </div>

                <div className='h-2 bg-gray-300 rounded'>

                    <div className='h-2 bg-green-500 rounded'
                        style={{
                            width: `${volume}%`
                        }}>


                    </div>
                </div>

                <div className='text-xs mt-1'>
                    {isSpeaking ? (
                        <span className='text-green-500'>
                            🟢 Mic is receiving input
                        </span>
                    ) : (
                        <span className='text-gray-400'>
                            ⚪ No voice detected
                        </span>
                    )}

                </div>
            </div>
        </div>
    )
}

export default VoiceInput