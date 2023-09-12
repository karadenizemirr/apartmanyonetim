import { Injectable } from '@nestjs/common';
import { PersonService } from './person/person.service';
import { DeptService } from './dept/dept.service';

@Injectable()
export class AppService {
  constructor(){}
}
