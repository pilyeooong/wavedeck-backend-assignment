import { Table, Column, Model, DataType, Index } from 'sequelize-typescript';

interface VoiceAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface VoiceCreationAttributes {
  name: string;
}

@Table({
  tableName: 'voices',
  timestamps: true,
  paranoid: true,
})
class Voice extends Model<VoiceAttributes, VoiceCreationAttributes> {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Index
  @Column
  deletedAt: Date;

  static async createVoice(voiceCreationAttributes: VoiceCreationAttributes) {
    return await this.create(voiceCreationAttributes);
  }
}

export default Voice;
