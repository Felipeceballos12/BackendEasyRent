import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Administrador} from './administrador.model';

@model()
export class Sugerencia extends Entity {
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
  correoElectronico: string;

  @property({
    type: 'string',
    required: true,
  })
  contenido: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  constructor(data?: Partial<Sugerencia>) {
    super(data);
  }
}

export interface SugerenciaRelations {
  // describe navigational properties here
}

export type SugerenciaWithRelations = Sugerencia & SugerenciaRelations;
