import "./Modal.scss";

function Modal({
  content,
  width = "50vh",
  height = "50vh",
  backgroundColor = "white",
  closingStateFunction,
}) {
    // closing state function prop
  function closeHandler() {
    closingStateFunction(false);
  }

  return (
    <>
      <div className='modal-overlay'></div>

      <div className='modal-conatiner'>
        <div className='modal-body' style={{ width, height, backgroundColor }}>
          <button className='modal-close-button' onClick={closeHandler}>
            x
          </button>
          {content}
        </div>
      </div>
    </>
  );
}

export default Modal;
