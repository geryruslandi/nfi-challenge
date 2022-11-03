import UsersPrivateData from '@src/models/UsersPrivateData';
import bcrypt from 'bcrypt'
import { Table, Column, Model, HasOne } from 'sequelize-typescript';


interface UsersAttribute {
    id?: number
    privateData?: UsersPrivateData
    username: string
    password: string
}

@Table({
    underscored: true,
    tableName: 'users'
})
class User extends Model<UsersAttribute> {
  @Column
  username!: string;

  @Column
  password!: string;

  @HasOne(() => UsersPrivateData)
  privateData!: UsersPrivateData

  public isPasswordMatch(plainPassword: string) {
    return bcrypt.compareSync(plainPassword, this.password)
  }
}

export default User
