import React from 'react';


export const ToastContext = React.createContext();

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastProvider({ children }) {

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
  function handleCreateToast(event) {
    event.preventDefault();
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
    // clear the form data on submit
    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  };

  // remove selected object from the array of toasts
  function handleDismiss(id) {
    // duplicate our array and filter through it, 
    // only keeping the objects that do NOT have the id of the dismissed toast
    const nextToasts = toasts.filter(toast => {
      return toast.id !== id;
    })
    // update our toasts state
    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider
      value={{
        VARIANT_OPTIONS,
        message,
        setMessage,
        variant,
        setVariant,
        toasts,
        handleCreateToast,
        handleDismiss,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
