import User from '@src/models/User';
import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';

@Table({
    underscored: true,
    tableName: 'users-private-data'
})
class UsersPrivateData extends Model {

    @ForeignKey(() => User)
    @Column
    user_id!: number;

    @Column
    balance!: number;

    @BelongsTo(() => User)
    user!: User

}

export default UsersPrivateData
