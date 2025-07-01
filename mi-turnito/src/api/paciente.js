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

export async function createPaciente(nombre, apellido, mail, password, dni, fechaNacimiento, telefono) {
  try {
    const data = {
      nombre,
      apellido,
      mail,
      password,
      dni,
      fechaNacimiento,
      telefono
    };

    const response = await axios.post(`${hostname}/pacientes`, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: 'usuario',
        password: '1234'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al crear paciente:', error);
    throw error;
  }
}

export async function loginPaciente(mail, password) {
  try {
    const response = await axios.post(`${hostname}/pacientes/login`, {
      mail: mail,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: 'usuario',
        password: '1234'
      }
    });

    return response.data;
  } catch (error) {
    print(response)
    console.error("Error al hacer login del paciente:", error);
    throw error;
  }
}

export async function deletePacienteById(id) {
  try {
    console.log('Eliminando paciente con ID:', id);
    const endpoint = `${hostname}/pacientes/${id}`;
    const response = await axios.delete(endpoint, {
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: 'usuario',
        password: '1234'
      },
      data: { id }
    });
    console.log('Paciente eliminado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar paciente:', error);
    throw error;
  }
}

export async function modifyPaciente(id, nombre, apellido, mail, password, dni, fechaNacimiento, telefono) {
  try {
    const data = {id, nombre, apellido, mail, password, dni, fechaNacimiento, telefono};

    const response = await axios.put(`${hostname}/pacientes/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "usuario",
        password: "1234",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error al modificar paciente con ID ${id}:`, error);
    throw error;
  }
}