import { Table, Column, Model, DataType, ForeignKey, Index } from 'sequelize-typescript';
import User from 'models/user';

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
  fileType: string;
}

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
  duration: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => File)
  @Column
  originalFileId: number;

  @Index
  @Column
  deletedAt: Date;

  static async createFile(fileData: FileCreationAttributes) {
    await this.create({ ...fileData });
  }
}

export default File;
