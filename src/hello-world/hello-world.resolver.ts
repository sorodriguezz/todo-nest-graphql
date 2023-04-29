import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { description: 'Hola mundo es lo que retorna', name: 'hello' })
  helloWorld(): string {
    return 'Hello World!';
  }

  @Query(() => Float, { description: 'Retorna un numero random', name: 'randomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, { description: 'Retorna un numero random entre 0 y to', name: 'randomZeroTo' })
  getRandomZeroTo(@Args('to', { nullable: true, type: () => Int}) to: number = 6): number {
    return Math.round(Math.random() * to);
  }
}
