import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  validateUser(id: number) {
    return new Promise((resolve) => {
      resolve(id)
    })
  }
}
