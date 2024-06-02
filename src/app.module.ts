import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SummariesModule } from './summaries/summaries.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {OpenaiModule} from "./openai/openai.module";

@Module({
  imports: [
    AuthModule,
    SummariesModule,
    UsersModule,
    EventEmitterModule.forRoot(),
    OpenaiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
