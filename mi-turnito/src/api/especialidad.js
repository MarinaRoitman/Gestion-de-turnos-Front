import axios from 'axios';
import { hostname } from '../utils/constants.js';

export async function getEspecialidades() {
  try {
    const endpoint = `${hostname}/especialidad`;
    const response = await axios.get(endpoint, {
      auth: {
        username: 'usuario',
        password: '1234'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener especialidades:', error);
    throw error;
  }
}
