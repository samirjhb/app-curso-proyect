import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type VideoDocument = Video & Document;

@Schema({ timestamps: true })
export class Video {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop()
  title: string;

  @Prop()
  idCourse: mongoose.Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ default: null })
  source: string;

  @Prop({ default: 0 })
  score: number;

  @Prop()
  idAuthor: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

VideoSchema.statics.findAllVideos = function () {
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
