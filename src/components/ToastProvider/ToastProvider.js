import React from 'react';
import { useKeydown } from "../../hooks/useKeydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {

  const [toasts, setToasts] = React.useState([]);

  // memoize our custom hook so it only runs once on initial mount 
  // (because 'callback' inside our custom hook will never change on re-renders)
  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, [])
  useKeydown('Escape', handleEscape)

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
