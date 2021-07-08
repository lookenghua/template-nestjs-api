import { Injectable } from '@nestjs/common'
import { PrismaService } from '_module/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
}
