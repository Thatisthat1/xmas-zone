import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback, FeedbackDocument } from './schemas/feedback.schema';
import { Model } from 'mongoose';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
  ) {}

  create(createFeedbackDto: CreateFeedbackDto) {
    const createdFeedback = new this.feedbackModel(createFeedbackDto);
    return createdFeedback.save();
  }

  findAll() {
    return this.feedbackModel.find().exec();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} feedback`;
  // }

  // update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
  //   return `This action updates a #${id} feedback`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} feedback`;
  // }
}
