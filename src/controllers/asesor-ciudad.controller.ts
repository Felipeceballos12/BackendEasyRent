import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Asesor,
  Ciudad,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorCiudadController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Asesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.string('id') id: typeof Asesor.prototype.id,
  ): Promise<Ciudad> {
    return this.asesorRepository.ciudad(id);
  }
}
