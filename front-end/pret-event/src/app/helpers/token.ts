const pretEventStorageKeyToken = 'PretEventv1-Storage-token';

export const setToken = token => localStorage.setItem(pretEventStorageKeyToken, token);

export const getToken = () => localStorage.getItem(pretEventStorageKeyToken);

export const removeToken = () => localStorage.removeItem(pretEventStorageKeyToken);
