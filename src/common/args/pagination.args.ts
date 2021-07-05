import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0 })
  offset = 0;

  @Field(() => Int, { defaultValue: 10 })
  limit = 10;
}
