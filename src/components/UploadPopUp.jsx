const UploadPopUp = ({trigger, handleSend, handleChangePhoto, name, handleClose}) => {
    return ( 
        trigger ? 
        (<div className='upload-popup'>
            <div className='upload-popup-inner'>
                <button onClick={() => handleSend(name)}>Send</button>
                <button onClick={() => handleClose()}>X</button>
                <br></br>
                <br></br>
                <input onChange={(e) => handleChangePhoto(e)} type="file" name={name}/>
            </div>
        </div>) : ""
     );
}
 
export default UploadPopUp;