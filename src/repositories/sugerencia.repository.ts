import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sugerencia, SugerenciaRelations, Administrador} from '../models';
import {AdministradorRepository} from './administrador.repository';

export class SugerenciaRepository extends DefaultCrudRepository<
  Sugerencia,
  typeof Sugerencia.prototype.id,
  SugerenciaRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof Sugerencia.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Sugerencia, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
