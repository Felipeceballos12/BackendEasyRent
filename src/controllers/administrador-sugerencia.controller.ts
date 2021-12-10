import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Administrador,
  Sugerencia,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorSugerenciaController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/sugerencias', {
    responses: {
      '200': {
        description: 'Array of Administrador has many Sugerencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sugerencia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Sugerencia>,
  ): Promise<Sugerencia[]> {
    return this.administradorRepository.sugerencias(id).find(filter);
  }

  @post('/administradors/{id}/sugerencias', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sugerencia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sugerencia, {
            title: 'NewSugerenciaInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) sugerencia: Omit<Sugerencia, 'id'>,
  ): Promise<Sugerencia> {
    return this.administradorRepository.sugerencias(id).create(sugerencia);
  }

  @patch('/administradors/{id}/sugerencias', {
    responses: {
      '200': {
        description: 'Administrador.Sugerencia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sugerencia, {partial: true}),
        },
      },
    })
    sugerencia: Partial<Sugerencia>,
    @param.query.object('where', getWhereSchemaFor(Sugerencia)) where?: Where<Sugerencia>,
  ): Promise<Count> {
    return this.administradorRepository.sugerencias(id).patch(sugerencia, where);
  }

  @del('/administradors/{id}/sugerencias', {
    responses: {
      '200': {
        description: 'Administrador.Sugerencia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sugerencia)) where?: Where<Sugerencia>,
  ): Promise<Count> {
    return this.administradorRepository.sugerencias(id).delete(where);
  }
}
