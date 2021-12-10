import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TipoVehiculo,
  Administrador,
} from '../models';
import {TipoVehiculoRepository} from '../repositories';

export class TipoVehiculoAdministradorController {
  constructor(
    @repository(TipoVehiculoRepository)
    public tipoVehiculoRepository: TipoVehiculoRepository,
  ) { }

  @get('/tipo-vehiculos/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to TipoVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof TipoVehiculo.prototype.id,
  ): Promise<Administrador> {
    return this.tipoVehiculoRepository.administrador(id);
  }
}
