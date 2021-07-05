import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef], { nullable: true })
    list: T[];

    @Field(() => Int)
    total: number;

    @Field(() => Int)
    offset: number;

    @Field(() => Int)
    limit: number;
  }
  return PaginatedType;
}
