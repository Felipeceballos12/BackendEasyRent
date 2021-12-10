import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Departamento, Sede, Cliente, Asesor, Administrador} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {SedeRepository} from './sede.repository';
import {ClienteRepository} from './cliente.repository';
import {AsesorRepository} from './asesor.repository';
import {AdministradorRepository} from './administrador.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Ciudad.prototype.id>;

  public readonly sedes: HasManyRepositoryFactory<Sede, typeof Ciudad.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Ciudad.prototype.id>;

  public readonly asesores: HasManyRepositoryFactory<Asesor, typeof Ciudad.prototype.id>;

  public readonly administradores: HasManyRepositoryFactory<Administrador, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Ciudad, dataSource);
    this.administradores = this.createHasManyRepositoryFactoryFor('administradores', administradorRepositoryGetter,);
    this.registerInclusionResolver('administradores', this.administradores.inclusionResolver);
    this.asesores = this.createHasManyRepositoryFactoryFor('asesores', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesores', this.asesores.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.sedes = this.createHasManyRepositoryFactoryFor('sedes', sedeRepositoryGetter,);
    this.registerInclusionResolver('sedes', this.sedes.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
