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
import {Mealplan} from '../models';
import {MealplanRepository} from '../repositories';

export class MealPlanController {
  constructor(
    @repository(MealplanRepository)
    public mealplanRepository : MealplanRepository,
  ) {}

  @post('/mealplans')
  @response(200, {
    description: 'Mealplan model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mealplan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mealplan, {
            title: 'NewMealplan',
            
          }),
        },
      },
    })
    mealplan: Mealplan,
  ): Promise<Mealplan> {
    return this.mealplanRepository.create(mealplan);
  }

  @get('/mealplans/count')
  @response(200, {
    description: 'Mealplan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mealplan) where?: Where<Mealplan>,
  ): Promise<Count> {
    return this.mealplanRepository.count(where);
  }

  @get('/mealplans')
  @response(200, {
    description: 'Array of Mealplan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mealplan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mealplan) filter?: Filter<Mealplan>,
  ): Promise<Mealplan[]> {
    return this.mealplanRepository.find(filter);
  }

  @patch('/mealplans')
  @response(200, {
    description: 'Mealplan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mealplan, {partial: true}),
        },
      },
    })
    mealplan: Mealplan,
    @param.where(Mealplan) where?: Where<Mealplan>,
  ): Promise<Count> {
    return this.mealplanRepository.updateAll(mealplan, where);
  }

  @get('/mealplans/{id}')
  @response(200, {
    description: 'Mealplan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mealplan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Mealplan, {exclude: 'where'}) filter?: FilterExcludingWhere<Mealplan>
  ): Promise<Mealplan> {
    return this.mealplanRepository.findById(id, filter);
  }

  @patch('/mealplans/{id}')
  @response(204, {
    description: 'Mealplan PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mealplan, {partial: true}),
        },
      },
    })
    mealplan: Mealplan,
  ): Promise<void> {
    await this.mealplanRepository.updateById(id, mealplan);
  }

  @put('/mealplans/{id}')
  @response(204, {
    description: 'Mealplan PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mealplan: Mealplan,
  ): Promise<void> {
    await this.mealplanRepository.replaceById(id, mealplan);
  }

  @del('/mealplans/{id}')
  @response(204, {
    description: 'Mealplan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mealplanRepository.deleteById(id);
  }
}
