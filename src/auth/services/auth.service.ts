import { Injectable } from '@nestjs/common';
import { UserDeactivateException } from '@src/users/helpers/user.exception';
import { UserService } from '@src/users/services/user.service';
import { ApiKey } from '../helpers/api-key.utils';
import { InvalidApiKeyException } from '../helpers/auth.exception';
import { LoggedUser } from '../types/logged-user.type';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async singIn(apiKey: string): Promise<LoggedUser> {
    const users = await this.userService.findAllWithDeleted();

    for (const user of users) {
      if (ApiKey.compare(apiKey, user.apiKey)) {
        if (user.deletedAt) {
          throw new UserDeactivateException({ apiKey });
        }

        const { apiKey: _, ...partialUser } = user;
        return partialUser;
      }
    }

    throw new InvalidApiKeyException({ apiKey });
  }
}
