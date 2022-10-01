import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailAppService } from './mail-app.service';

@Controller()
export class MailAppController {
  constructor(private readonly mailAppService: MailAppService) {}

  @MessagePattern('user.created')
  getMessageUser(data: any){
    console.log('____ESTO_ES_EL_MICROSERVICE_____', data);
    
  }
}
