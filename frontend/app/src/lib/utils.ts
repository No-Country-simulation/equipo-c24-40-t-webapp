// src/lib/utils.ts
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}


import axios from "axios";

const API_URL = ""; // reemplaza con la URL de tu API

// Configura el cliente de Axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Funciones de utilidad para las solicitudes
export const postRequest = async (url: string, data: object) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRequest = async (url: string) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putRequest = async (url: string, data: object) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async (url: string) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
