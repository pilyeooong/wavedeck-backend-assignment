import { Table, Column, Model, DataType, Index } from 'sequelize-typescript';

interface VoiceAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

@Table({
  tableName: 'voices',
  timestamps: true,
  paranoid: true,
})
class Voice extends Model<VoiceAttributes> {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Index
  @Column
  deletedAt: Date;
}

export default Voice;
