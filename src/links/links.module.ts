import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from './schemas/link.schema';
import { FoldersModule } from 'src/folders/folders.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]), FoldersModule, JwtModule
  ],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule { }
