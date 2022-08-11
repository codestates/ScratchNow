import { Users } from '../models/users';

console.log("======Creating Users Table======");

const create_table_users = async() => {
    await Users.sync({force : true})
        .then(() => {
            console.log("✅Successfully created Users Table");
        })
        .catch((err) => {
            console.log("❗Failed to create Users Table: ", err);
        })
}

create_table_users();