import { BadRequestException, Injectable, Request } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderNameDto } from './dto/update-folder-name.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Folder, FolderDocument } from './schemas/folder.schema';
import { Model } from 'mongoose';
import { UpdatePinDto } from './dto/update-pin.dto';
import { CreatePinDto } from './dto/create-pin.dto';
import { UnlockFolderDto } from './dto/unlock-folder.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FoldersService {

  constructor(

    @InjectModel(Folder.name)
    private folderModel: Model<Folder>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async create(req, createFolderDto: CreateFolderDto) {

    const { _id } = req.user
    const { name, parentId, pin } = createFolderDto

    // kiem tra xem parentId co hay khong
    if (parentId) {
      const parentFolder = await this.folderModel.findOne({ _id: parentId })
      if (!parentFolder) {
        throw new BadRequestException("parent folder not exist")
      }
    }

    return await this.folderModel.create({
      ownerId: _id,
      name: name,
      parentId: parentId,
      pin: pin
    })

  }

  // tim folder theo user id 
  async findFoldersByUserId(req) {
    const { _id } = req.user
    const folders = await this.folderModel.find({ ownerId: _id, isActive: true }).lean();
    return this.buildFolderTree(folders);
  }


  // tao cay folder
  buildFolderTree(folders, parentId = null) {
    return folders
      .filter(folder => String(folder.parentId) === String(parentId))
      .map(folder => {
        const { pin, ...rest } = folder; // loại bỏ pin khỏi object

        return {
          ...rest,
          isLock: pin != null,
          children: this.buildFolderTree(folders, folder._id)
        };
      });
  }


  findAll() {
    return `This action returns all folders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  async updateFolderName(req, updateFolderNameDto: UpdateFolderNameDto) {
    const { _id, name } = updateFolderNameDto


    //  tim xem folder co thuoc chu so huu hay khong
    const folder = await this.folderModel.findOne({ _id: _id, ownerId: req.user._id })
    if (!folder) throw new BadRequestException("Not found folder")


    return await this.folderModel.updateOne({ _id: _id }, {
      name: name,
      updatedAt: new Date()
    })

  }


  async updatePin(req, updatePinWithOldPinDto: UpdatePinDto) {
    const { _id, newPin } = updatePinWithOldPinDto

    const folder = await this.folderModel.findOne({ _id: _id, ownerId: req.user._id, pin: null })
    if (!folder) throw new BadRequestException("Not found folder or pin error")

    await this.folderModel.updateOne({ _id: _id }, {
      pin: newPin,
    })

    return { message: "change pin successfully" }
  }

  async createPin(req, createPinDto: CreatePinDto) {
    const { _id, newPin } = createPinDto

    const folder = await this.folderModel.findOne({ _id: _id, ownerId: req.user._id, pin: null })
    if (!folder) throw new BadRequestException("Not found folder or pin exist")

    await this.folderModel.updateOne({ _id: _id }, {
      pin: newPin,
    })

    return { message: "crate pin successfully" }
  }


  async deleteFolder(req, _id:string) {


    const folder = await this.folderModel.findOne({ _id: _id, ownerId: req.user._id })
    if (!folder) throw new BadRequestException("Not found folder")
    await this.folderModel.deleteOne({ _id: _id })
    return { message: "delete folder successfully" }

  }

  async deletePin(req, _id:string) {

    const folder = await this.folderModel.findOne({ _id: _id, ownerId: req.user._id, pin: { $ne: null } })
    if (!folder) throw new BadRequestException("Not found folder or pin error")
    await this.folderModel.updateOne({ _id: _id }, { pin: null })

    return { message: "delete pin successfully" }
  }


  // ----------------------------------------------------------
  async unlockFolder(req, unlockFolderDto: UnlockFolderDto) {
    const { _id, pin } = unlockFolderDto;
    const folder: FolderDocument | null = await this.folderModel.findOne({ _id: _id, ownerId: req.user._id, pin: pin })

    if (!folder) throw new BadRequestException("pin error")

    return await this.createFolderToken(folder);

  }

  async createFolderToken(folder: FolderDocument) {
    const payload = { sub: folder._id, ownerId: folder.ownerId };
    return {
      folder_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_FOLDER_SECRET'),
        expiresIn: this.configService.get<string>('JWT_FOLDER_TOKEN_EXPIRED'),
      }),
    };
  }

  async inspectFolderIsLocked(req, _id) {
    const folder = await this.folderModel.findOne({ _id: _id, ownerId: req._id })
    if (!folder) throw new BadRequestException("folder not exist")
    if (folder.pin == null) return false
    return true
  }




}
