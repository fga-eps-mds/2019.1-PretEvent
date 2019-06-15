const pretEventStorageKeyId = 'PretEventv1-Storage-id';

export const setId = id => localStorage.setItem(pretEventStorageKeyId, id);

export const getId = () => localStorage.getItem(pretEventStorageKeyId);

export const removeId = () => localStorage.removeItem(pretEventStorageKeyId);