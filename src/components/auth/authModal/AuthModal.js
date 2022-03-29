import AuthForm from '../authForm/AuthForm'
import Modal from '../../UI/modal-window/ModalWindow'

const AuthModal = (props) => {
   const { onClose } = props
   return (
      <Modal onClose={onClose}>
         <AuthForm onClose={onClose} />
      </Modal>
   )
}

export default AuthModal
