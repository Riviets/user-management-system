

function ModalConfirm({isOpened, message, onConfirm, onCancel}){
    if(!isOpened){
        return null
    }
    return(
        <div className="fixed  inset-0 flex items-center justify-center px-10" style={{ backgroundColor: 'rgba(00, 00, 00, 0.5)'}}>
            <div className="bg-white py-10 px-5 md:px-10 border-3 border-gray-600 rounded-lg">
                <p className="mb-8 text-lg md:text-2xl text-center font-semibold">Are you sure you want to {message}?</p>
                <div className="flex justify-around">
                    <button className="btn border-green-800 bg-green-500 hover:bg-green-600" onClick={onConfirm}>Yes</button>
                    <button className="btn border-red-800 bg-red-500 hover:bg-red-700 font-bold" onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm