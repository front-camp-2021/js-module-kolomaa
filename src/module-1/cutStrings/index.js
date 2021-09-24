export const cutStrings = (arr = []) => {
    let arrLengths = [];
    
    for (let i = 0; i < arr.length; i++){
        arrLengths.push(arr[i].length);
    }
    
    let minLength = Math.min(...arrLengths);
    
    return arr.map(el => el.slice(0, minLength));
};
