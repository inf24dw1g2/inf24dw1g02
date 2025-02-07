import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {Mealplan, MealplanRelations} from '../models';

export class MealplanRepository extends DefaultCrudRepository<
  Mealplan,
  typeof Mealplan.prototype.id,
  MealplanRelations
> {
  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(Mealplan, dataSource);
  }
}
