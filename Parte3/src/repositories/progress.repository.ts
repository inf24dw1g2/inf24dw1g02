import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {Progress, ProgressRelations} from '../models';

export class ProgressRepository extends DefaultCrudRepository<
  Progress,
  typeof Progress.prototype.id,
  ProgressRelations
> {
  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(Progress, dataSource);
  }
}
