import UsersPrivateData from '@src/models/UsersPrivateData';
import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';

interface Attribute {
    users_private_data_id: number
    amount: number
}

@Table({
    underscored: true,
    tableName: 'transactions'
})
class Transaction extends Model<Attribute> {

    @ForeignKey(() => UsersPrivateData)
    @Column
    users_private_data_id!: number;

    @Column
    amount!: number;

    @BelongsTo(() => UsersPrivateData)
    userData!: UsersPrivateData
}

export default Transaction
