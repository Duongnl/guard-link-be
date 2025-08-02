
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


// ham nay duoc chay khi 1 api khong duoc public va phai kiem tra token
// neu token hop le thi no se chay ham validate gan du lieu trong token vao bien golbal va chay tiep vao controller co the lay thong tin nay moi noi o controller khong public() bang cach dung @Request() req la duoc
// neu token khong hop le thi no se tra ve loi 401
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
     
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
            throw new Error('JWT_SECRET is not defined in configuration');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }


    async validate(payload: any) {
        return { _id: payload.sub, username: payload.username };
    }
}
