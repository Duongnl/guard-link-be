import { Injectable } from '@nestjs/common';

// $ npm install --save @nestjs/jwt passport-jwt
// $ npm install --save-dev @types/passport-jwt
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';




@Injectable()
export class AuthService {


    constructor(
      
      private usersService: UsersService, // cai nay de check xem user co ton tai hay khong
    
      private jwtService: JwtService // cai nay de tao jwt
  ) { }

  // check user co ton tai hay khong va tra ve user hoac null
   async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user?.password !== password) {
      return null
    }
  
    return user
  }


  // ham nay tao token bang cach nhan vao du lieu cua nguoi dung
    async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  
}
