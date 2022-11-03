import UsersPrivateData from '@src/models/UsersPrivateData';
import AuthService from '@src/services/AuthService';
import TransactionService from '@src/services/TransactionService';

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
    return (new AuthService(this)).isPasswordMatch(plainPassword)
  }

  public generateBearerToken() {
    return "Bearer " + (new AuthService(this)).generateToken()
  }

  public deposit(amount: number): Promise<UsersPrivateData> {
    const service = new TransactionService(this)
    return service.deposit(amount)
  }

  public withdraw(amount: number): Promise<UsersPrivateData> {
    const service = new TransactionService(this)
    return service.withdraw(amount)
  }
}

export default User
