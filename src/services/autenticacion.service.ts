import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import generador from 'password-generator';
import {Llaves} from '../config/llaves';
import {Administrador, Asesor, Cliente} from '../models';
import {AdministradorRepository, AsesorRepository, ClienteRepository} from '../repositories';

const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository : AsesorRepository,
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @repository(AdministradorRepository)
    public administradorRepository : AdministradorRepository
  ) {}

  /*
   * Add service methods here
   */

  /*
    Instalamos el crypto-js y el password generate:

      - npm i crypto-js (Paquete para cifrar las claves o contraseñas)
      - npm i password-generator (Paquete que genera claves o contraseñas aleatorias)
  */

  // Defición de metodos
  generarClave() {
    /*
      - 1 Parametro = la longitud que quisieramos para la contraseña
      - 2 Parametro = La intencidad de la contraseña, es decir si es facil de memorizar o no
    */
    const clave = generador(8, false);
    return clave;
  }

  cifrarClave(clave: string) {
    const claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  async identificarAsesor(correo: string, clave: string) {
    try {
      const asesor = this.asesorRepository.findOne({where: {correoElectronico: correo, clave: clave }});

      if (await asesor) {
        return await asesor;
      }

      return false;
    } catch {
      return false;
    }
  }

  async identificarCliente(correo: string, clave: string) {
    try {
      const cliente = this.clienteRepository.findOne({where: {correoElectronico: correo, clave: clave }});

      if (await cliente) {
        return await cliente;
      }

      return false;
    } catch {
      return false;
    }
  }

  async identificarAdministrador(correo: string, clave: string) {
    try {
      const administrador = this.administradorRepository.findOne({where: {correoElectronico: correo, clave: clave }});

      if (await administrador) {
        return await administrador;
      }

      return false;
    } catch {
      return false;
    }
  }

  generarTokenJWTAsesor(asesor: Asesor) {
    /*
      Instalamos el paquete: npm install jsonwebtoken
    */
    const token = jwt.sign({
      data: {
        id: asesor.id,
        nombre: asesor.nombre + " " + asesor.apellido,
        correoElectronico: asesor.correoElectronico,
      }
    },
      Llaves.claveJWT);

    return token;
  }

  generarTokenJWTCliente(cliente: Cliente) {
    /*
      Instalamos el paquete: npm install jsonwebtoken
    */
    const token = jwt.sign({
      data: {
        id: cliente.id,
        nombre: cliente.nombre + " " + cliente.apellido,
        correoElectronico: cliente.correoElectronico,
      }
    },
      Llaves.claveJWT);

    return token;
  }

  generarTokenJWTAdministrador(administrador: Administrador) {
    /*
      Instalamos el paquete: npm install jsonwebtoken
    */
    const token = jwt.sign({
      data: {
        id: administrador.id,
        nombre: administrador.nombre + " " + administrador.apellido,
        correoElectronico: administrador.correoElectronico,
      }
    },
      Llaves.claveJWT);

    return token;
  }

  validarTokenJWT(token: string) {
    try {
      const datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }

}
