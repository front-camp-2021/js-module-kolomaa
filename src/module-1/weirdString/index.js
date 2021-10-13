export const weirdString = (str = "") => {
    
   return str.length ? 
    str.split(' ').map((el) => {
        return (
          el.slice(0, el.length - 1).toUpperCase() +
          el[el.length - 1]
        );
      }).join(' ')
      : "";
};
