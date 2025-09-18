import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderNameDto } from './dto/update-folder-name.dto';
import { UpdatePinDto } from './dto/update-pin.dto';
import { CreatePinDto } from './dto/create-pin.dto';
import { UnlockFolderDto } from './dto/unlock-folder.dto';
import { FolderAuthGuard } from './folder-auth.guard';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) { }

  @Post()
  create(@Request() req, @Body() createFolderDto: CreateFolderDto) {
    return this.foldersService.create(req, createFolderDto);
  }

  @Get("my-folders")
  findFoldersByUserId(@Request() req) {
    return this.foldersService.findFoldersByUserId(req)
  }

  // @Get()
  // findAll() {
  //   return this.foldersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.foldersService.findOne(+id);
  // }

  @Patch("update-folder-name")
  @UseGuards(FolderAuthGuard)
  updateFolderName(@Request() req, @Body() updateFolderNameDto: UpdateFolderNameDto) {
    return this.foldersService.updateFolderName(req, updateFolderNameDto);
  }

  @Post("unlock-folder")
  unlockFolder(@Request() req, @Body() unlockFolder: UnlockFolderDto) {
    return this.foldersService.unlockFolder(req, unlockFolder)
  }

  @Patch("update-pin")
  @UseGuards(FolderAuthGuard)
  updatePin(@Request() req, @Body() updatePinDto: UpdatePinDto) {
    return this.foldersService.updatePin(req, updatePinDto);
  }

  @Post("create-pin")
  createPin(@Request() req, @Body() createPinDto: CreatePinDto) {
    return this.foldersService.createPin(req, createPinDto);
  }

  @Delete("delete-pin/:id")
  @UseGuards(FolderAuthGuard)
  deletePin(@Request() req,@Param('id') _id: string) {
    return this.foldersService.deletePin(req, _id);
  }


  @Delete(":id")
  @UseGuards(FolderAuthGuard)
  deleteFolder(@Request() req, @Param('id') _id: string) {
    return this.foldersService.deleteFolder(req, _id);
  }




  // -----------------------------------------




}
