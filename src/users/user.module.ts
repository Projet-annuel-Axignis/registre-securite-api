import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './controllers/company.controller';
import { UserController } from './controllers/user.controller';
import { Company } from './entities/company.entity';
import { Plan } from './entities/plan.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { CompanyService } from './services/company.service';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController, CompanyController],
  imports: [TypeOrmModule.forFeature([User, Role, Company, Plan])],
  providers: [UserService, CompanyService],
  exports: [UserService, CompanyService],
})
export class UserModule {}
