
// $ npm install --save @nestjs/passport passport passport-local
// $ npm install --save-dev @types/passport-local
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport'; 
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service'; 

// ham nay chay khi controller khai bao  @UseGuards(LocalAuthGuard)
// ham nay se nhan vao request va xac thuc nguoi dung do co dung du lieu hay khong
// neu dung thi se tra ve thong tin nguoi dung va controller co the lay bang cach @Request() req
// neu khong hop le thi no se tra ve 401
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
