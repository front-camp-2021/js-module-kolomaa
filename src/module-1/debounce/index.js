export const debounce = (fn, delay = 0) => {
    let isFrozen = false;

    return function() {
        if (isFrozen) return;
        
        isFrozen = true;
        console.log(fn.call(this, ...arguments));
        setTimeout(()=> isFrozen = false, delay);
    }
}
