import {hostname} from "../utils/constants.js";
import axios from 'axios';

export async function getPaciente() {
  try {
    const endpoint = `${hostname}/pacientes`;
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

export async function login(mail, password) {
  try {
    const endpoint = `${hostname}/pacientes/login`;
    const response = await axios.post(endpoint, {
      mail: mail,
      password: password
    }, {
      auth: {
        username: 'usuario',
        password: '1234'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Hubo un error al iniciar sesión:', error);
    throw error;
  }
}

export async function getPacienteById(id) {
  try {
    const endpoint = `${hostname}/pacientes/${id}`;
    const response = await axios.get(endpoint, {
      auth: {
        username: 'usuario',
        password: '1234'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Hubo un error al obtener el paciente por ID:', error);
    throw error;
  }
}