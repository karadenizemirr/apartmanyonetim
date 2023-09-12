import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtService {
    private secretKey = "apartmanyonetimsistemi"
    constructor() {}

    create_token(payload:any){
        return jwt.sign(payload, this.secretKey)
    }

    verify_token(token:string){
        return jwt.verify(token, this.secretKey)
    }
}