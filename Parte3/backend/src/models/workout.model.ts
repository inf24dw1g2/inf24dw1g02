import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Workout extends Entity {
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
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  exercise: string;

  @property({
    type: 'number',
    required: true,
  })
  sets: number;

  @property({
    type: 'number',
    required: true,
  })
  reps: number;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Workout>) {
    super(data);
  }
}

export interface WorkoutRelations {
  // describe navigational properties here
}

export type WorkoutWithRelations = Workout & WorkoutRelations;
