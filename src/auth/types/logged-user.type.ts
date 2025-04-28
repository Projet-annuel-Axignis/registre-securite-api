import { User } from '@src/users/entities/user.entity';

export type LoggedUser = Omit<User, 'apiKey'>;
