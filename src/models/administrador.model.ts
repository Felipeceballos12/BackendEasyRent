import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Ciudad} from './ciudad.model';
import {Sugerencia} from './sugerencia.model';
import {TipoVehiculo} from './tipo-vehiculo.model';

@model()
export class Administrador extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoDocumento: string;

  @property({
    type: 'string',
    required: true,
  })
  numeroDocumento: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;

  @property({
    type: 'string',
    required: true,
  })
  correoElectronico: string;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;

  @hasMany(() => TipoVehiculo)
  tipoVehiculos: TipoVehiculo[];

  @hasMany(() => Sugerencia)
  sugerencias: Sugerencia[];

  @hasMany(() => Asesor)
  asesores: Asesor[];

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
