export const splitAndMerge = (str = "", separator = "") => {
    return str.split(' ').map(el => el.split('').join(`${separator}`)).join(' ');
};
