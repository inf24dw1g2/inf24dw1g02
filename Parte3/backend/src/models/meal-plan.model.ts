import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class MealPlan extends Entity {
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
  calories: number;

  @property({
    type: 'number',
    required: true,
  })
  protein: number;

  @property({
    type: 'number',
    required: true,
  })
  carbs: number;

  @property({
    type: 'number',
    required: true,
  })
  fats: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MealPlan>) {
    super(data);
  }
}

export interface MealPlanRelations {
  // describe navigational properties here
}

export type MealPlanWithRelations = MealPlan & MealPlanRelations;
