import {Entity, model, property,belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model({settings: {strict: false}})
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
  UserId: number;

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

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Workout>) {
    super(data);
  }
}

export interface WorkoutRelations {
  // describe navigational properties here
}

export type WorkoutWithRelations = Workout & WorkoutRelations;
