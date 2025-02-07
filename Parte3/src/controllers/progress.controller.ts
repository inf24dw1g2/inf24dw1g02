import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Progress} from '../models';
import {ProgressRepository} from '../repositories';

export class ProgressController {
  constructor(
    @repository(ProgressRepository)
    public progressRepository : ProgressRepository,
  ) {}

  @post('/progresses')
  @response(200, {
    description: 'Progress model instance',
    content: {'application/json': {schema: getModelSchemaRef(Progress)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Progress, {
            title: 'NewProgress',
            
          }),
        },
      },
    })
    progress: Progress,
  ): Promise<Progress> {
    return this.progressRepository.create(progress);
  }

  @get('/progresses/count')
  @response(200, {
    description: 'Progress model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Progress) where?: Where<Progress>,
  ): Promise<Count> {
    return this.progressRepository.count(where);
  }

  @get('/progresses')
  @response(200, {
    description: 'Array of Progress model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Progress, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Progress) filter?: Filter<Progress>,
  ): Promise<Progress[]> {
    return this.progressRepository.find(filter);
  }

  @patch('/progresses')
  @response(200, {
    description: 'Progress PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Progress, {partial: true}),
        },
      },
    })
    progress: Progress,
    @param.where(Progress) where?: Where<Progress>,
  ): Promise<Count> {
    return this.progressRepository.updateAll(progress, where);
  }

  @get('/progresses/{id}')
  @response(200, {
    description: 'Progress model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Progress, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Progress, {exclude: 'where'}) filter?: FilterExcludingWhere<Progress>
  ): Promise<Progress> {
    return this.progressRepository.findById(id, filter);
  }

  @patch('/progresses/{id}')
  @response(204, {
    description: 'Progress PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Progress, {partial: true}),
        },
      },
    })
    progress: Progress,
  ): Promise<void> {
    await this.progressRepository.updateById(id, progress);
  }

  @put('/progresses/{id}')
  @response(204, {
    description: 'Progress PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() progress: Progress,
  ): Promise<void> {
    await this.progressRepository.replaceById(id, progress);
  }

  @del('/progresses/{id}')
  @response(204, {
    description: 'Progress DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.progressRepository.deleteById(id);
  }
}
