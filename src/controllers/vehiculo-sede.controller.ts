import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Sede,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoSedeController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/sede', {
    responses: {
      '200': {
        description: 'Sede belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sede)},
          },
        },
      },
    },
  })
  async getSede(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<Sede> {
    return this.vehiculoRepository.sede(id);
  }
}
