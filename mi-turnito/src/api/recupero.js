import {hostname} from "../utils/constants.js";
import axios from 'axios';

export const enviarCorreo = async ({ to, subject, text }) => {
  try {
    const response = await axios.post(`${hostname}/pacientes/enviar-correo`, {
        to: String(to),
        subject: String(subject),
        text: String(text)
    }, {
      auth: {
        username: 'usuario',
        password: '1234'
      }
    });

    console.log('Correo enviado:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error al enviar el correo:', error.response?.data || error);
    throw error;
  }
};