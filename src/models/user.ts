import { Table, Column, Model, DataType, Index, HasMany } from 'sequelize-typescript';
import File from 'models/file';

interface UserAttributes {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface UserCreationAttributes {
  email: string;
}

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Index({ unique: true })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @HasMany(() => File)
  files: File[];

  @Index
  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt?: Date;

  static async createUser(userData: UserCreationAttributes) {
    return await this.create(userData);
  }

  static async findById(id: number) {
    return await this.findOne({ where: { id } });
  }
}

export default User;
