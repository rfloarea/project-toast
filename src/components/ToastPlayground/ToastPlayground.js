import React from 'react';
import Button from '../Button';
import ToastShelf from "../ToastShelf/ToastShelf";
import styles from './ToastPlayground.module.css';
import { ToastContext } from "../ToastProvider/ToastProvider";


function ToastPlayground() {

  const {
    VARIANT_OPTIONS,
    message,
    setMessage,
    variant,
    setVariant,
    handleCreateToast,
  } = React.useContext(ToastContext);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      
      <ToastShelf />

      <form className={styles.controlsWrapper} onSubmit={handleCreateToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea 
              className={styles.messageInput} 
              id="message" 
              value={message}
              onChange={event => {
                setMessage(event.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
            {VARIANT_OPTIONS.map((option) => (
              <div key={option} className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
                <label htmlFor={option}>
                  <input
                    id={option}
                    type="radio"
                    name={option}
                    value={option}
                    checked={option === variant}
                    onChange={event => {
                      setVariant(event.target.value)
                    }}
                  />
                  {option}
                </label>
              </div>
            ))}
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>
              Pop Toast!
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
