import { useDropzone } from 'react-dropzone'
import { ReactComponent as Uploadsvg } from '../../../assets/icons/upload.svg'
import { ReactComponent as LoadedSvg } from '../../../assets/icons/iconDone.svg'
import Input from '../input/Input'
import classes from './PdfDropZone.module.css'

export default function PdfDropZone({ pdf, setPdf }) {
   const { getRootProps, getInputProps } = useDropzone({
      accept: 'application/pdf/*',
      multiple: false,
      onDrop: (files) => {
         if (files[0]) {
            setPdf({
               file: files[0],
            })
         }
      },
   })
   const isEmtyObj = Object.keys(pdf.file).length === 0

   const fileName = pdf.file.name ? pdf.file.name : ''
   const isLoadedSvg = !isEmtyObj ? (
      <LoadedSvg className={classes.isLoadedIcon} />
   ) : (
      <Uploadsvg className={classes.isUplodedicon} {...getRootProps()} />
   )
   const isPdfUpload = isEmtyObj ? 'Загрузите PDF' : 'PDF загружен'
   return (
      <div className={classes.uploadFrag}>
         <h1 className={classes.uploadFragText}>Загрузите книгу</h1>
         <div className={classes.flexBoxed}>
            <Input
               {...getInputProps()}
               type="file"
               label={isPdfUpload}
               className={`${isEmtyObj ? classes.fix : classes.fixed}`}
               accept="audio/mp3"
               id="f3"
            />
            {isLoadedSvg}
            <span className={classes.maximumLenght}>{fileName}</span>
         </div>
      </div>
   )
}
