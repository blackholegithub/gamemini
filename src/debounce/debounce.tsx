

 const debounce = (func:()=>void, delay:number) => {
    let timerId: number;
  
    return () => {
      clearTimeout(timerId);
  
      timerId = window.setTimeout(() => {
        func();
      }, delay);
    };
  };

  export default debounce