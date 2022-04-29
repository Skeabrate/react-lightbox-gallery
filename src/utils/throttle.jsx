export const throttleFunc = (func, interval) => {
  let shouldFire = true;

  return function (...args) {
    if (shouldFire) {
      func(...args);
      shouldFire = false;
      console.log(shouldFire);

      setTimeout(() => {
        shouldFire = true;
        console.log(shouldFire);
      }, interval);
    }
  };
};
