import React from 'react';

import Button from '../Button';
import ToastShelf from "../ToastShelf/ToastShelf";

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {

  // collect our form data and hold it in state
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('');

  // create our array of Toast objects (to be used in our ToastShelf)
  const [toasts, setToasts] = React.useState([
    // placeholder objects
    {
      message: 'Opps. It broke.',
      variant: 'error',
      id: Math.random(),
    },
    {
      message: 'This is a notice',
      variant: 'notice',
      id: Math.random(),
    }
  ]);

  // create a new toast object and add it to our array of toasts
  function handleCreateToast() {
    // duplicate existing array of toasts
    // and push new object
    const nextToasts = [
      ...toasts,
      {
        message,
        variant,
        id: Math.random(),
      }
    ];
    // update toasts state
    setToasts(nextToasts);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      
      <ToastShelf toasts={toasts} />

      <div className={styles.controlsWrapper}>
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
            <Button 
              onClick={handleCreateToast}
            >
              Pop Toast!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
