export const loadFirstTimeFlag = () => {
  try {
    const firstTime = localStorage.getItem('firstTime');
    if (firstTime === null) {
      return undefined;
    }
    return JSON.parse(firstTime);
  } catch (err) {
    return undefined;
  }
};

export const saveFirstTimeFlag = (flag: any) => {
  try {
    const firstTime = JSON.stringify(flag);
    localStorage.setItem('firstTime', firstTime);
  } catch {
    console.log('empty');
  }
};
