import { Table, Column, Model, DataType, Index, ForeignKey } from 'sequelize-typescript';
import File from 'models/file';
import Voice from 'models/voice';

interface JobAttributes {
  id: number;
  pitch: number;
  soundQuality: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

@Table({
  tableName: 'jobs',
  timestamps: true,
  paranoid: true,
})
class Job extends Model<JobAttributes> {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  pitch: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  soundQuality: number;

  @ForeignKey(() => File)
  @Column({ type: DataType.BIGINT, allowNull: true })
  fileId: number;

  @ForeignKey(() => Voice)
  @Column({ type: DataType.BIGINT, allowNull: true })
  voiceId: number;

  @Index
  @Column
  deletedAt: Date;
}

export default Job;
