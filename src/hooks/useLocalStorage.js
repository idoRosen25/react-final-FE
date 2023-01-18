const useLocalStorage = () => {
  const setValue = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  const getValue = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const removeValue = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    setValue,
    getValue,
    removeValue,
  };
};
export default useLocalStorage;
