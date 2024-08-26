export const initialState = {
    currentValue: "0",
    operator: null,
    previousValue: null,
    isOperatorPressed: false,
  };
  
  export const handleNumber = (value, state) => {
    if (state.isOperatorPressed) {
      return {
        ...state,
        currentValue: `${value}`,
        isOperatorPressed: false,
      };
    }
  
    if (state.currentValue === "0") {
      return { ...state, currentValue: `${value}` };
    }
  
    return {
      ...state,
      currentValue: `${state.currentValue}${value}`,
    };
  };
  
  export const handleEqual = (state) => {
    const { currentValue, previousValue, operator } = state;
  
    if (previousValue === null || operator === null) {
      return state; // Nothing to calculate
    }
  
    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);
    const resetState = {
      operator: null,
      previousValue: null,
      isOperatorPressed: false,
    };
  
    let newValue;
    switch (operator) {
      case "/":
        newValue = previous / current;
        break;
      case "*":
        newValue = previous * current;
        break;
      case "+":
        newValue = previous + current;
        break;
      case "-":
        newValue = previous - current;
        break;
      default:
        return state;
    }
  
    return {
      currentValue: `${newValue}`,
      ...resetState,
    };
  };
  
  const calculator = (type, value, state) => {
    switch (type) {
      case "number":
        return handleNumber(value, state);
      case "operator":
        // If an operator is pressed, store the current value as previous and display the operator
        if (state.operator && state.previousValue !== null) {
          // Perform the previous operation before continuing
          const calculatedState = handleEqual(state);
          return {
            ...calculatedState,
            operator: value,
            previousValue: calculatedState.currentValue,
            currentValue: `${calculatedState.currentValue} ${value}`,
            isOperatorPressed: true,
          };
        }
  
        return {
          ...state,
          operator: value,
          previousValue: state.currentValue,
          currentValue: `${state.currentValue} ${value}`, // Display the operator with the current value
          isOperatorPressed: true,
        };
      case "equal":
        return handleEqual(state);
      case "clear":
        return initialState;
      case "posneg":
        return {
          ...state,
          currentValue: `${parseFloat(state.currentValue) * -1}`,
        };
      case "percentage":
        return {
          ...state,
          currentValue: `${parseFloat(state.currentValue) * 0.01}`,
        };
      default:
        return state;
    }
  };
  
  export default calculator;
  