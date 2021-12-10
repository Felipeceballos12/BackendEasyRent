import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Administrador,
  Ciudad,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorCiudadController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.string('id') id: typeof Administrador.prototype.id,
  ): Promise<Ciudad> {
    return this.administradorRepository.ciudad(id);
  }
}
