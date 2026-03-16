import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant, RestaurantDocument } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const createdRestaurant = new this.restaurantModel(createRestaurantDto);
    return createdRestaurant.save();
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find().exec();
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findById(id).exec();
    if (!restaurant) throw new NotFoundException(`Restaurant with ID ${id} not found`);
    return restaurant;
  }

  async update(id: string, updateRestaurantDto: Partial<CreateRestaurantDto>): Promise<Restaurant> {
    const updatedRestaurant = await this.restaurantModel
      .findByIdAndUpdate(id, updateRestaurantDto, { new: true })
      .exec();
    if (!updatedRestaurant) throw new NotFoundException(`Restaurant with ID ${id} not found`);
    return updatedRestaurant;
  }

  async remove(id: string): Promise<Restaurant> {
    const deletedRestaurant = await this.restaurantModel.findByIdAndDelete(id).exec();
    if (!deletedRestaurant) throw new NotFoundException(`Restaurant with ID ${id} not found`);
    return deletedRestaurant;
  }
}
