export const useGetVariableColor = (variable: string) => {
  if (typeof window !== "undefined") {
    const style = window.getComputedStyle(document.body);
    return style.getPropertyValue(variable);
  }
};
