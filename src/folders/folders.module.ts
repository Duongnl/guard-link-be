import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './schemas/folder.schema';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

import { FolderAuthGuard } from './folder-auth.guard';



@Module({
  imports: [MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]), UsersModule, JwtModule


  ],
  controllers: [FoldersController],
  providers: [FoldersService, FolderAuthGuard],
  exports: [FoldersService, FolderAuthGuard]
})
export class FoldersModule { }
