import axios from 'axios';
import { hostname } from '../utils/constants.js';

export async function getObrasSociales() {
  try {
    const endpoint = `${hostname}/obraSocial`;
    const response = await axios.get(endpoint, {
      auth: {
        username: 'usuario',
        password: '1234'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener obras sociales:', error);
    throw error;
  }
}
