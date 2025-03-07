

function ModalConfirm({isOpened, message, onConfirm, onCancel}){
    if(!isOpened){
        return null
    }
    return(
        <div>
            <p>Are you sure you want to {message}?</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
        </div>
    )
}

export default ModalConfirm