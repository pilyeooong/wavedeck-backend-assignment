import { Table, Column, Model, DataType, Index, ForeignKey } from 'sequelize-typescript';
import File from 'models/file';
import Voice from 'models/voice';
import User from 'models/user';

interface JobHistoriesAttributes {
  id: number;
  pitch: number;
  transactionId: string;
  userId: number;
  fileId: number;
  voiceId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface JobHistoryCreationAttributes {
  transactionId: string;
  pitch: number;
  userId: number;
  fileId: number;
  voiceId: number;
}

@Table({
  tableName: 'jobHistories',
  timestamps: true,
  paranoid: true,
})
class JobHistory extends Model<JobHistoriesAttributes, JobHistoryCreationAttributes> {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  pitch: number;

  @Column({ type: DataType.STRING, allowNull: false })
  transactionId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false })
  userId: number;

  @ForeignKey(() => File)
  @Column({ type: DataType.BIGINT, allowNull: false })
  fileId: number;

  @ForeignKey(() => Voice)
  @Column({ type: DataType.BIGINT, allowNull: false })
  voiceId: number;

  @Index
  @Column
  deletedAt: Date;

  static async createJobHistory(jobHistoryCreationAttributes: JobHistoryCreationAttributes) {
    return await this.create(jobHistoryCreationAttributes);
  }

  static async findById(id: number) {
    return await this.findOne({ where: { id } });
  }
}

export default JobHistory;
