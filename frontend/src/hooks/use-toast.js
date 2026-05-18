"use client";
// Inspired by react-hot-toast library
import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString();
}

const toastTimeouts = new Map()

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

// Helper function to add a new toast
const addToast = (state, toast) => ({
  ...state,
  toasts: [toast, ...state.toasts].slice(0, TOAST_LIMIT),
});

// Helper function to update an existing toast
const updateToast = (state, toast) => ({
  ...state,
  toasts: state.toasts.map((t) =>
    t.id === toast.id ? { ...t, ...toast } : t),
});

// Helper function to handle toast dismissal
const dismissToast = (state, toastId) => {
  // Add toasts to remove queue
  if (toastId) {
    addToRemoveQueue(toastId);
  } else {
    state.toasts.forEach((toast) => {
      addToRemoveQueue(toast.id);
    });
  }

  // Mark toasts as closed
  return {
    ...state,
    toasts: state.toasts.map((t) =>
      t.id === toastId || toastId === undefined
        ? { ...t, open: false }
        : t),
  };
};

// Helper function to remove toast(s)
const removeToast = (state, toastId) => {
  if (toastId === undefined) {
    return { ...state, toasts: [] };
  }
  return {
    ...state,
    toasts: state.toasts.filter((t) => t.id !== toastId),
  };
};

// Main reducer - now more concise
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return addToast(state, action.toast);

    case "UPDATE_TOAST":
      return updateToast(state, action.toast);

    case "DISMISS_TOAST":
      return dismissToast(state, action.toastId);

    case "REMOVE_TOAST":
      return removeToast(state, action.toastId);

    default:
      return state;
  }
}

const listeners = []

let memoryState = { toasts: [] }

function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function toast({
  ...props
}) {
  const id = genId()

  const update = (props) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Note: setState is stable across renders, listeners and index are cleanup-only
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast }
