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
import {MealPlan} from '../models';
import {MealPlanRepository} from '../repositories';

export class MealplanController {
  constructor(
    @repository(MealPlanRepository)
    public mealPlanRepository : MealPlanRepository,
  ) {}

  @post('/mealplan')
  @response(200, {
    description: 'MealPlan model instance',
    content: {'application/json': {schema: getModelSchemaRef(MealPlan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MealPlan, {
            title: 'NewMealPlan',
            
          }),
        },
      },
    })
    mealPlan: MealPlan,
  ): Promise<MealPlan> {
    return this.mealPlanRepository.create(mealPlan);
  }

  @get('/mealplan/count')
  @response(200, {
    description: 'MealPlan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MealPlan) where?: Where<MealPlan>,
  ): Promise<Count> {
    return this.mealPlanRepository.count(where);
  }

  @get('/mealplan')
  @response(200, {
    description: 'Array of MealPlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MealPlan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MealPlan) filter?: Filter<MealPlan>,
  ): Promise<MealPlan[]> {
    return this.mealPlanRepository.find(filter);
  }

  @patch('/mealplan')
  @response(200, {
    description: 'MealPlan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MealPlan, {partial: true}),
        },
      },
    })
    mealPlan: MealPlan,
    @param.where(MealPlan) where?: Where<MealPlan>,
  ): Promise<Count> {
    return this.mealPlanRepository.updateAll(mealPlan, where);
  }

  @get('/mealplan/{id}')
  @response(200, {
    description: 'MealPlan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MealPlan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MealPlan, {exclude: 'where'}) filter?: FilterExcludingWhere<MealPlan>
  ): Promise<MealPlan> {
    return this.mealPlanRepository.findById(id, filter);
  }

  @patch('/mealplan/{id}')
  @response(204, {
    description: 'MealPlan PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MealPlan, {partial: true}),
        },
      },
    })
    mealPlan: MealPlan,
  ): Promise<void> {
    await this.mealPlanRepository.updateById(id, mealPlan);
  }

  @put('/mealplan/{id}')
  @response(204, {
    description: 'MealPlan PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mealPlan: MealPlan,
  ): Promise<void> {
    await this.mealPlanRepository.replaceById(id, mealPlan);
  }

  @del('/mealplan/{id}')
  @response(204, {
    description: 'MealPlan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mealPlanRepository.deleteById(id);
  }
}
