import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {MealPlan, MealPlanRelations} from '../models';

export class MealPlanRepository extends DefaultCrudRepository<
  MealPlan,
  typeof MealPlan.prototype.id,
  MealPlanRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MealPlan, dataSource);
  }
}
