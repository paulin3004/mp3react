import './controls.css';

//Importing Icons
import { PiPlayFill, PiPauseFill, PiSkipBackFill, PiSkipForwardFill } from "react-icons/pi";

//Importing all songs
import { tracklist } from '../tracks/tracks';

//Importing monitoring method
import { useRef, useState } from 'react';

export default function Controls(){
    //let indexsong = 0
    const [indexsong, setIndexsong] = useState(0)
    const [stagebutton, setStagebutton] = useState(<PiPlayFill/>)

    //Monitoring the audio tag with the useRef method
    const audioRef = useRef(null);//Here, we basically turn a variable into a reference point

    //play and pause function
    const playAndPauseSong = () => {
        if(audioRef.current.paused){
            audioRef.current.play()
            setStagebutton(<PiPauseFill/>)
        }else{
            audioRef.current.pause()
            setStagebutton(<PiPlayFill/>)
        }
        
    }
    const nextsong = () => {
        if(indexsong < tracklist.length - 1){
            setIndexsong(indexsong+1)
        }else{
            setIndexsong(0)
        }
        setTimeout(playAndPauseSong, 400)
        
    }
    const previoussong = () => {
        if(indexsong > 0){
            setIndexsong(indexsong - 1)
        }else{
            setIndexsong(tracklist.length - 1)
        }
        setTimeout(playAndPauseSong, 400)
        
    }
    //animate__jello
    return(
        <>
            <audio src={tracklist[indexsong].src} ref={audioRef} controls/>

            <div className='buttons'>
                <div>
                    <button onClick={previoussong}>
                        <PiSkipBackFill/>
                    </button>
                </div>
                <div>
                    <button onClick={playAndPauseSong}>
                        {stagebutton}
                    </button>
                </div>
                <div>
                    <button onClick={nextsong}>
                        <PiSkipForwardFill/>
                    </button>
                </div>
            </div>
           
        </>
    )
}