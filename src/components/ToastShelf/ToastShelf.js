import React from 'react';
import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { ToastContext } from "../ToastProvider/ToastProvider";


function ToastShelf() {
  const { toasts } = React.useContext(ToastContext);

  // iterate over our toasts array to render one Toast per object in that array
  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ message, variant, id }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast id={id} variant={variant} >
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
