import UsersPrivateData from '@src/models/UsersPrivateData';
import { Table, Column, Model, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';

interface Attribute {
    users_private_data_id: number
    amount: number
    type: TypeEnum
}

enum TypeEnum {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw'
}

@Table({
    underscored: true,
    tableName: 'transactions'
})
class Transaction extends Model<Attribute> {

    @ForeignKey(() => UsersPrivateData)
    @Column
    users_private_data_id!: number;

    @Column(DataType.DOUBLE)
    amount!: number;

    @Column(DataType.STRING)
    type!: TypeEnum

    @BelongsTo(() => UsersPrivateData, 'users_private_data_id')
    userData!: UsersPrivateData
}

export default Transaction

export {
    TypeEnum
}
