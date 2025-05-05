import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { Company } from './entities/company.entity';
import { Plan } from './entities/plan.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User, Role, Company, Plan])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
