import bcrypt from 'bcrypt'
import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    underscored: true,
    tableName: 'users'
})
class User extends Model {
  @Column
  username!: string;

  @Column
  password!: string;

  public isPasswordMatch(plainPassword: string) {
    return bcrypt.compareSync(plainPassword, this.password)
  }
}

export default User
