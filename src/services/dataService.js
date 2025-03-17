import { fetchAllData as fetchAllDataFromAPI } from "./apiService";

const USE_LOCAL_DATA = import.meta.env.VITE_USE_LOCAL_DATA === "true";
const LOCAL_STORAGE_KEY = "ganttData";

const fetchAllDataFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (!data) {
    throw new Error("No local data found");
  }
  return data;
};

const saveDataToLocalStorage = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

const fetchAllData = async () => {
  if (USE_LOCAL_DATA) {
    return fetchAllDataFromLocalStorage();
  } else {
    const data = await fetchAllDataFromAPI();
    saveDataToLocalStorage(data);
    return data;
  }
};

export { fetchAllData, saveDataToLocalStorage };
