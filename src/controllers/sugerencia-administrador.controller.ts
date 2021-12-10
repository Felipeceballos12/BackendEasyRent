import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sugerencia,
  Administrador,
} from '../models';
import {SugerenciaRepository} from '../repositories';

export class SugerenciaAdministradorController {
  constructor(
    @repository(SugerenciaRepository)
    public sugerenciaRepository: SugerenciaRepository,
  ) { }

  @get('/sugerencias/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Sugerencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Sugerencia.prototype.id,
  ): Promise<Administrador> {
    return this.sugerenciaRepository.administrador(id);
  }
}
