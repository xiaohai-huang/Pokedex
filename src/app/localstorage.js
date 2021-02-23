export const loadState = () => {
  try {
    const state = localStorage.getItem("state");
    return state ? JSON.parse(state) : undefined;
  } catch {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serialzedState = JSON.stringify(state);
    localStorage.setItem("state", serialzedState);
  } catch {
    console.error("Error: unable to save the state.");
  }
};
