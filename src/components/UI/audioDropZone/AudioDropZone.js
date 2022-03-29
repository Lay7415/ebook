import { useDropzone } from 'react-dropzone'
import { ReactComponent as Uploadsvg } from '../../../assets/icons/upload.svg'
import { ReactComponent as LoadedSvg } from '../../../assets/icons/iconDone.svg'
import Input from '../input/Input'
import classes from './AudioDropZone.module.css'

export default function AudioDropZone({ audio, setAudio, dropZoneOption }) {
   const { getRootProps, getInputProps } = useDropzone({
      accept: 'audio/*',
      multiple: false,
      onDrop: (files) => {
         if (files[0]) {
            setAudio({
               audio: files[0],
            })
         }
      },
   })

   const isEmtyObj = Object.keys(audio.audio).length === 0

   const fileName = audio.audio?.name
      ? audio.audio.name
      : dropZoneOption.timeDuration

   const isLoadedSvg = !isEmtyObj ? (
      <LoadedSvg className={classes.loadedSvg} />
   ) : (
      <Uploadsvg className={classes.uploadSvg} {...getRootProps()} />
   )
   const isAudioUpload = isEmtyObj
      ? 'Загрузите аудиозапись'
      : 'Аудиозапись загружен'
   return (
      <div className={classes.uploadFrag}>
         <h1 className={classes.uploadFragText}>{dropZoneOption.title}</h1>
         <div className={classes.flexBoxed}>
            <Input
               {...getInputProps()}
               type="file"
               label={isAudioUpload}
               className={`${isEmtyObj ? classes.fix : classes.fixed}`}
               accept="audio/mp3"
               id={dropZoneOption.id}
            />
            {isLoadedSvg}
            <span className={classes.maximumLenght}>{fileName}</span>
         </div>
      </div>
   )
}
