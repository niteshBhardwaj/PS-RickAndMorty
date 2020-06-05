let storage = {}

export const setItem = (key, data) => {
    storage[key] = data;
}

export const getItem = (key, data) => {
    return storage[key];
}