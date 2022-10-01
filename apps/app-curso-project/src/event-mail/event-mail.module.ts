import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDocument } from '../users/model/user.schema';

@Module({})
export class EventMailModule {
  constructor(private readonly mailService: MailerService) {}

  //Inicio de sesion
  @OnEvent('user.login')
  handleUserLongEvent(user: any) {
    console.log('Inicio Sesion', user);
  }

  //creacion de Usuario
  @OnEvent('user.created')
  handleUserCreatedEvent(user: UserDocument) {
    //Enviar Email
    console.log('user', user);
    this.mailService.sendMail({
      to: user.email,
      subject: 'Bienvenido a la APP',
      template: 'welcome',
      context: {
        name: user.name,
      },
    });
  }
}
