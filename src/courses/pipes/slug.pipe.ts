import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { convert } from 'url-slug';

@Injectable()
export class SlugPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, _metadata: ArgumentMetadata) {
    return convert(value);
  }
}
