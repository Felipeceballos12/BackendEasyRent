import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Asesor, Credenciales} from '../models';
import {AsesorRepository} from '../repositories';
import {AutenticacionService} from '../services';

const fetch = require('node-fetch');

export class AsesorController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository : AsesorRepository,
    @service(AutenticacionService)
    public servicioAutenticacion : AutenticacionService
  ) {}


  @post('/identificarAsesor', {
    responses: {
      '200': {
        description: "Identificacion de asesor"
      }
    }
  })
  async identificarAsesor(
    @requestBody() credenciales: Credenciales
  ) {
    const asesorPerson = await this.servicioAutenticacion.identificarAsesor(credenciales.correo, credenciales.clave);

    if (asesorPerson) {
      const token = this.servicioAutenticacion.generarTokenJWTAsesor(asesorPerson);

      return {
        datos: {
          nombre: asesorPerson.nombre,
          correoElectronico: asesorPerson.correoElectronico,
          id: asesorPerson.id
        },
        tk: token
      }
    } else {
      throw new HttpErrors[401]("Datos invalidos");
    }
  }


  @post('/asesores')
  @response(200, {
    description: 'Asesor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesor',
            exclude: ['id'],
          }),
        },
      },
    })
    asesor: Omit<Asesor, 'id'>,
  ): Promise<Asesor> {

    const clave = this.servicioAutenticacion.generarClave();
    const claveCifrada = this.servicioAutenticacion.cifrarClave(clave);

    asesor.clave = claveCifrada;
    asesor.aceptacion = false;

    const newAsesor = await this.asesorRepository.create(asesor);

    // Notificar al asesor

    /*
      Instalamos el paquete node-fetch (npm install node-fetch@2)
    */

    const emailDestino = asesor.correoElectronico;
    const asunto = 'Bienvenido a Easy Rent';
    const mensaje = `Hola <strong>${ asesor.nombre } ${ asesor.apellido }</strong>, su nombre de usuario es: ${ asesor.correoElectronico } y su contraseña es: ${ clave }`;

    fetch(`${ Llaves.urlServicioNotificaciones }/email?emailDestino=${ emailDestino }&asunto=${ asunto }&mensaje=${ mensaje }`)
      .then((res: unknown) => console.log(res))
      .catch((err: unknown) => console.log(err));

    return newAsesor;

  }

  @get('/asesores/count')
  @response(200, {
    description: 'Asesor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.count(where);
  }

  @get('/asesores')
  @response(200, {
    description: 'Array of Asesor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asesor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Asesor) filter?: Filter<Asesor>,
  ): Promise<Asesor[]> {
    return this.asesorRepository.find(filter);
  }

  @patch('/asesores')
  @response(200, {
    description: 'Asesor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.updateAll(asesor, where);
  }

  @get('/asesores/{id}')
  @response(200, {
    description: 'Asesor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asesor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asesor, {exclude: 'where'}) filter?: FilterExcludingWhere<Asesor>
  ): Promise<Asesor> {
    return this.asesorRepository.findById(id, filter);
  }

  @patch('/asesores/{id}')
  @response(204, {
    description: 'Asesor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.updateById(id, asesor);
  }

  @put('/asesores/{id}')
  @response(204, {
    description: 'Asesor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.replaceById(id, asesor);
  }

  @del('/asesores/{id}')
  @response(204, {
    description: 'Asesor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asesorRepository.deleteById(id);
  }
}
