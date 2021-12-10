import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Cliente} from './cliente.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRecogida: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaEntrega: string;

  @property({
    type: 'number',
    required: true,
  })
  valorTotal: number;

  @property({
    type: 'string',
  })
  contractoDocumento?: string;

  @property({
    type: 'string',
  })
  causaRechazo?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaCreacion: string;

  @property({
    type: 'string',
    required: true,
  })
  CorreoElectronicoACargo: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
