import {hostname} from "../utils/constants.js";
import axios from 'axios';

export async function getProfesionales() {
  try {
    const endpoint = `${hostname}/profesional`;
    const response = await axios.get(endpoint, {
    auth: {
      username: 'usuario',
      password: '1234'
    }
  });
    return response.data;
  } catch (error) {
    console.error('Hubo un error llamando a profesionales:', error);
    throw error;
  }
}