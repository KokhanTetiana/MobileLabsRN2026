import * as FileSystem from 'expo-file-system/legacy'; 

export const getDirectoryContent = async (uri) => {
  const fileNames = await FileSystem.readDirectoryAsync(uri);
  return Promise.all(
    fileNames.map(async (name) => {
      const info = await FileSystem.getInfoAsync(uri + name);
      return { name, ...info };
    })
  );
};

export const getStorageStats = async () => {
  try {
    const free = await FileSystem.getFreeDiskStorageAsync();
    const total = await FileSystem.getTotalDiskStorageAsync();
    return { total, free, used: total - free };
  } catch (e) {
    return { total: 0, free: 0, used: 0 }; 
  }
};

export const createFolder = async (uri, folderName) => {
  const path = uri + folderName + '/';
  await FileSystem.makeDirectoryAsync(path, { intermediates: true });
};

export const saveFile = async (uri, content) => {
  await FileSystem.writeAsStringAsync(uri, content);
};

export const readFile = async (uri) => {
  return await FileSystem.readAsStringAsync(uri);
};

export const deleteItem = async (uri) => {
  await FileSystem.deleteAsync(uri);
};