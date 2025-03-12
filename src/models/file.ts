import { Table, Column, Model, DataType, ForeignKey, Index } from 'sequelize-typescript';
import User from 'models/user';
import path from 'path';
import fs from 'fs';

interface FileAttributes {
  id: number;
  status: string;
  previewUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  duration?: number;
  userId?: number;
  originalFileId?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface FileCreationAttributes {
  status: string;
  previewUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  duration?: number;
  userId?: number;
  originalFileId?: number;
}

export const FILE_STATUS_ORIGINAL = 'ORIGINAL';
export const FILE_STATUS_CONVERTED = 'CONVERTED';

@Table({
  tableName: 'files',
  timestamps: true,
  paranoid: true,
})
class File extends Model<FileAttributes, FileCreationAttributes> {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  status: string;

  @Column({ type: DataType.STRING, allowNull: false })
  previewUrl: string;

  @Column({ type: DataType.STRING, allowNull: false })
  fileName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  fileType: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  fileSize: string;

  @Column({ type: DataType.STRING, allowNull: false })
  fileUrl: string;

  @Column({ type: DataType.FLOAT, allowNull: true })
  duration?: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: true })
  userId?: number;

  @ForeignKey(() => File)
  @Column({ type: DataType.BIGINT, allowNull: true })
  originalFileId?: number;

  @Index
  @Column
  deletedAt: Date;

  static async createFile(fileData: FileCreationAttributes) {
    return await this.create(fileData);
  }

  static async findById(id: number) {
    return await this.findOne({ where: { id } });
  }

  destroyLocalFile() {
    const filePath = path.join(process.cwd(), this.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

export default File;
