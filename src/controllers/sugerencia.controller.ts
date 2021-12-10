import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Sugerencia} from '../models';
import {SugerenciaRepository} from '../repositories';

export class SugerenciaController {
  constructor(
    @repository(SugerenciaRepository)
    public sugerenciaRepository : SugerenciaRepository,
  ) {}

  @post('/sugerencias')
  @response(200, {
    description: 'Sugerencia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sugerencia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sugerencia, {
            title: 'NewSugerencia',
            exclude: ['id'],
          }),
        },
      },
    })
    sugerencia: Omit<Sugerencia, 'id'>,
  ): Promise<Sugerencia> {
    return this.sugerenciaRepository.create(sugerencia);
  }

  @get('/sugerencias/count')
  @response(200, {
    description: 'Sugerencia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sugerencia) where?: Where<Sugerencia>,
  ): Promise<Count> {
    return this.sugerenciaRepository.count(where);
  }

  @get('/sugerencias')
  @response(200, {
    description: 'Array of Sugerencia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sugerencia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sugerencia) filter?: Filter<Sugerencia>,
  ): Promise<Sugerencia[]> {
    return this.sugerenciaRepository.find(filter);
  }

  @patch('/sugerencias')
  @response(200, {
    description: 'Sugerencia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sugerencia, {partial: true}),
        },
      },
    })
    sugerencia: Sugerencia,
    @param.where(Sugerencia) where?: Where<Sugerencia>,
  ): Promise<Count> {
    return this.sugerenciaRepository.updateAll(sugerencia, where);
  }

  @get('/sugerencias/{id}')
  @response(200, {
    description: 'Sugerencia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sugerencia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Sugerencia, {exclude: 'where'}) filter?: FilterExcludingWhere<Sugerencia>
  ): Promise<Sugerencia> {
    return this.sugerenciaRepository.findById(id, filter);
  }

  @patch('/sugerencias/{id}')
  @response(204, {
    description: 'Sugerencia PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sugerencia, {partial: true}),
        },
      },
    })
    sugerencia: Sugerencia,
  ): Promise<void> {
    await this.sugerenciaRepository.updateById(id, sugerencia);
  }

  @put('/sugerencias/{id}')
  @response(204, {
    description: 'Sugerencia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sugerencia: Sugerencia,
  ): Promise<void> {
    await this.sugerenciaRepository.replaceById(id, sugerencia);
  }

  @del('/sugerencias/{id}')
  @response(204, {
    description: 'Sugerencia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sugerenciaRepository.deleteById(id);
  }
}
