import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';

@Module({
  providers: [TodoResolver]
})
export class TodoModule {}
