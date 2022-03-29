import { useDropzone } from 'react-dropzone'
import DropImg from '../../../assets/png/Vector.png'
import classes from './DropZone.module.css'

export default function DropZone({ avatar, setAvatar }) {
   const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      multiple: false,
      onDrop: (files) => {
         setAvatar({
            avatar: files[0],
            preview: URL.createObjectURL(files[0]),
         })
      },
   })

   return (
      <div className={classes.dropZoneBox}>
         <span {...getRootProps()} className={classes.uploadedBook}>
            <input
               type="file"
               accept="image/png, image/gif, image/jpeg"
               {...getInputProps()}
            />
            {!avatar ? (
               <div className={classes.dromImgBox}>
                  <img
                     src={DropImg}
                     alt=""
                     className={classes.uploadedDropZone}
                  />
                  <span className={classes.span}>
                     Нажмите на иконку чтобы загрузить или перетащите фото
                  </span>
               </div>
            ) : (
               <>
                  <img
                     src={avatar?.preview}
                     alt=""
                     className={classes.uploadedBook}
                  />
                  <button
                     type="button"
                     className={classes.changeBtn}
                     {...getInputProps}
                  >
                     Заменить
                  </button>
               </>
            )}
         </span>
      </div>
   )
}
