import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Ciudad, TipoVehiculo, Sugerencia, Asesor} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';
import {SugerenciaRepository} from './sugerencia.repository';
import {AsesorRepository} from './asesor.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Administrador.prototype.id>;

  public readonly tipoVehiculos: HasManyRepositoryFactory<TipoVehiculo, typeof Administrador.prototype.id>;

  public readonly sugerencias: HasManyRepositoryFactory<Sugerencia, typeof Administrador.prototype.id>;

  public readonly asesores: HasManyRepositoryFactory<Asesor, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>, @repository.getter('SugerenciaRepository') protected sugerenciaRepositoryGetter: Getter<SugerenciaRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Administrador, dataSource);
    this.asesores = this.createHasManyRepositoryFactoryFor('asesores', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesores', this.asesores.inclusionResolver);
    this.sugerencias = this.createHasManyRepositoryFactoryFor('sugerencias', sugerenciaRepositoryGetter,);
    this.registerInclusionResolver('sugerencias', this.sugerencias.inclusionResolver);
    this.tipoVehiculos = this.createHasManyRepositoryFactoryFor('tipoVehiculos', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipoVehiculos', this.tipoVehiculos.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
