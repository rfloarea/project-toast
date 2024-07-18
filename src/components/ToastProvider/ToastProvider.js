import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {

  const [toasts, setToasts] = React.useState([]);

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        message,
        variant,
        id: Math.random(),
      }
    ];
    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter(toast => {
      return toast.id !== id;
    })
    setToasts(nextToasts);
  }

  React.useEffect(() => {
    function handleClearAllToasts(event) {
      if (event.key === 'Escape') {
        setToasts([]);
      }
    }
    window.addEventListener('keydown', handleClearAllToasts);

    return () => {
      window.removeEventListener('keydown', handleClearAllToasts);
    }
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        createToast,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
