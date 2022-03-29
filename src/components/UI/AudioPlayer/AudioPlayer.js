import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import classes from './AudioPlayer.module.css'
import PauseButton from './PauseButton/PauseButton'
import PlayButton from './PlayButton/PlayButton'

const formWaveSurferOptions = (ref) => ({
   container: ref,
   progressColor: 'OrangeRed',
   waveColor: '#969696',
   cursorColor: '#00000000',
   barWidth: 0.5,
   responsive: true,
   barGap: 2,
   height: 30,
   normalize: true,
   partialRender: true,
})
const AudioPlayer = ({ url, time }) => {
   const waveformPlayerRef = useRef(null)
   const wavesurfer = useRef(null)
   const [playing, setPlay] = useState(false)
   const [volume, setVolume] = useState(0.5)
   useEffect(() => {
      const getSoundFromApi = {
         url: `http://3.123.114.41/static/download/${url}`,
      }
      setPlay(false)
      const options = formWaveSurferOptions(waveformPlayerRef.current)
      wavesurfer.current = WaveSurfer.create(options)
      wavesurfer.current.load(getSoundFromApi.url)
      wavesurfer.current.on('ready', () => {
         if (wavesurfer.current) {
            wavesurfer.current.setVolume(volume)
            setVolume(volume)
         }
      })
      return () => wavesurfer.current.destroy()
   }, [url])
   const playHundler = () => {
      setPlay(true)
      wavesurfer.current.playPause()
   }
   const pauseHundler = () => {
      setPlay(false)
      wavesurfer.current.playPause()
   }
   return (
      <div className={classes.containerForAudioPlayer}>
         <div className="controls">
            {playing && <PauseButton onClick={pauseHundler} />}
            {!playing && <PlayButton onClick={playHundler} />}
         </div>
         <div className={classes.waveformContainer}>
            <div id="waveformPlayer" ref={waveformPlayerRef} />
         </div>
         <div className={classes.time}>{time}</div>
      </div>
   )
}
export default AudioPlayer
