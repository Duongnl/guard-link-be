// folder-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { FoldersService } from './folders.service';

@Injectable()
export class FolderAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private configService: ConfigService,
        private foldersService: FoldersService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const folderToken = request.headers['x-folder-token'] as string;
        const folderId = request.params['id'];
        const user: any = request.user;
        const isLocked = await this.foldersService.inspectFolderIsLocked(user, folderId);

        if (!isLocked) {
            return true; // Nếu folder không bị khóa, cho phép truy cập
        }

        if (!folderToken) {
            throw new UnauthorizedException('Thiếu folder token');
        }

        try {

            const payload = this.jwtService.verify(folderToken,
                {
                    secret: this.configService.get<string>('JWT_FOLDER_SECRET'),
                }

            );

            // So sánh userId và folderId trong token với request hiện tại
            const user: any = request.user; // được gắn từ JwtAuthGuard trước đó
            const folderId = request.params['id'];

            if (payload.ownerId !== user._id || payload.sub !== folderId) {
                throw new UnauthorizedException('Folder token error');
            }

            //   Có thể gắn folder info vào request nếu cần
            request['folderAccess'] = payload;



            return true;
        } catch (err) {
            throw new UnauthorizedException('Folder token error');
        }


    }
}
