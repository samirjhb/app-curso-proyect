import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type AwardsDocument = Awards & Document;

@Schema({ timestamps: true })
export class Awards {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop()
  title: string;

  @Prop()
  idUser: mongoose.Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ required: true })
  idAuthor: string;
}

export const AwardsSchema = SchemaFactory.createForClass(Awards);

AwardsSchema.statics.findAllAwards = function () {
  const list = this.aggregate([
    {
      //Relacion con la base de datos
      $lookup: {
        from: 'users',
        foreignField: 'id',
        localField: 'idAuthor',
        as: 'MyAuthor',
        pipeline: [
          {
            //Actuando en la colletions de User
            $project: {
              _id: 0,
              name: 1,
              email: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: '$MyAuthor',
    },
  ]);

  return list;
};
