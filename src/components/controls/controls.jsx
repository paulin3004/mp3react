import './controls.css';

//Importing Icons
import { PiPlayFill, PiPauseFill, PiSkipBackFill, PiSkipForwardFill, PiMaskHappyFill} from "react-icons/pi";

//Importing all songs
import { tracklist } from '../tracks/tracks';

//Importing monitoring method
import { useRef, useState } from 'react';

export default function Controls(){
    //let indexsong = 0
    const [indexsong, setIndexsong] = useState(0)
    const [stagebutton, setStagebutton] = useState(<PiPlayFill/>)
    const [fulltime, setFulltime] = useState("0:00")
    const [currentTime, setCurrentime] = useState("0:00")
    let viewprogress = 0
    let calcprogress = 0

    //Monitoring the audio tag with the useRef method
    const audioRef = useRef(null);//Here, we basically turn a variable into a reference point
    const progressRef = useRef(null);

    const fullwidthbar = Number(400);


    function calcFulltime(){
        let fullMinutes = Math.floor(audioRef.current.duration / 60)
        let fullSeconds = Math.floor(audioRef.current.duration % 60)
        if(fullSeconds < 10){
            fullSeconds = '0' + fullSeconds
        }
        setTimeout(()=>{
            setFulltime(fullMinutes + ':' + fullSeconds)
        }, 300)
    }
    
    function calcCurrentTime(){
        let fullMinutes = Math.floor(audioRef.current.currentTime / 60)
        let fullSeconds = Math.floor(audioRef.current.currentTime % 60)
        if(fullSeconds < 10){
            fullSeconds = '0' + fullSeconds
        }
        setCurrentime(fullMinutes + ':' + fullSeconds)
        viewprogress = Number(audioRef.current.currentTime/audioRef.current.duration)
        setTimeout(()=>{
            calcprogress = Math.floor(viewprogress * fullwidthbar)
        }, 1000)
        console.log(calcprogress)
    }

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
    //NEXT and PREVIOUS function
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

    return(
        <>
            <audio src={tracklist[indexsong].src} onLoadedMetadata={calcFulltime} onTimeUpdate={calcCurrentTime} ref={audioRef}/>

            <div className='songtag'>
                <div className='mask'>
                    <PiMaskHappyFill/>
                </div>
                <div>
                    {tracklist[indexsong].name}
                </div>
            </div>
            <div className='spacetime'>

                <div className='barprogress'>
                    <div className='progress' style={{width:calcprogress}} ref={progressRef}></div>
                </div>

                <div className='timer'>
                    <span>{currentTime}</span>
                    <span>{fulltime}</span>
                </div>
            </div>

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
