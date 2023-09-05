import React from 'react';
import styles from "./modal.module.css";

const Modal = ({setModal,message}) => {
  return (
    <div onClick={()=>{
        setModal(false)
    }} className={styles.wrapper}>
      <div className={styles.modal}>
        <h1 className={styles.error}> {message}</h1>
        <button onClick={()=>{
        setModal(false)
    }} className={styles.close}>Close</button>
      </div>
    </div>
  );    
}   

export default Modal;
