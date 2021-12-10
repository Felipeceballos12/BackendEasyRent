import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Sede} from './sede.model';
import {Cliente} from './cliente.model';
import {Asesor} from './asesor.model';
import {Administrador} from './administrador.model';

@model()
export class Ciudad extends Entity {
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

  @belongsTo(() => Departamento)
  departamentoId: string;

  @hasMany(() => Sede)
  sedes: Sede[];

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Asesor)
  asesores: Asesor[];

  @hasMany(() => Administrador)
  administradores: Administrador[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
