import Transaction from '@src/models/Transaction';
import User from '@src/models/User';
import { Table, Column, Model, BelongsTo, ForeignKey, HasMany, DataType } from 'sequelize-typescript';

interface Attribute {
    user_id: number
    balance?: number
    user?: User
    transactions?: Transaction[]
}

@Table({
    underscored: true,
    tableName: 'users_private_data'
})
class UsersPrivateData extends Model<Attribute> {

    @ForeignKey(() => User)
    @Column
    user_id!: number;

    @Column(DataType.DOUBLE)
    balance!: number;

    @BelongsTo(() => User)
    user!: User

    @HasMany(() => Transaction)
    transactions!: Transaction[]

}

export default UsersPrivateData
