import { Table, Column, Model, DataType, Index, HasMany } from 'sequelize-typescript';
import File from 'models/file';

interface UserAttributes {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
class User extends Model<UserAttributes> {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Index({ unique: true })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @HasMany(() => File)
  files: File[];

  @Index
  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}

export default User;
