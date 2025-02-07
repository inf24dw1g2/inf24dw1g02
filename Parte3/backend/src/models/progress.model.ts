import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Progress extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;

  @property({
    type: 'number',
    required: true,
  })
  chest: number;

  @property({
    type: 'number',
    required: true,
  })
  arms: number;

  @property({
    type: 'number',
    required: true,
  })
  legs: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Progress>) {
    super(data);
  }
}

export interface ProgressRelations {
  // describe navigational properties here
}

export type ProgressWithRelations = Progress & ProgressRelations;
