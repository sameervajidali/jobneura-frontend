// src/contexts/ToastContext.jsx
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

const ToastContext = createContext();

const ADD_TOAST = 'ADD_TOAST';
const REMOVE_TOAST = 'REMOVE_TOAST';

function toastReducer(state, action) {
  switch (action.type) {
    case ADD_TOAST:
      return [...state, action.toast];
    case REMOVE_TOAST:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = uuid();
    dispatch({ type: ADD_TOAST, toast: { id, message, type } });
    setTimeout(() => dispatch({ type: REMOVE_TOAST, id }), duration);
  }, []);

  const removeToast = useCallback(id => {
    dispatch({ type: REMOVE_TOAST, id });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return {
    success: msg => ctx.addToast(msg, 'success'),
    error:   msg => ctx.addToast(msg, 'error'),
    info:    msg => ctx.addToast(msg, 'info'),
  };
}
