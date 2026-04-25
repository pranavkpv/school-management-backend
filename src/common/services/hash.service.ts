import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {

 async hashValue(
   value:string
 ){
   return bcrypt.hash(value,10);
 }

 async compare(
  plain:string,
  hashed:string
 ){
   return bcrypt.compare(
    plain,
    hashed
   );
 }

}