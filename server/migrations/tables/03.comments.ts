import { Comments } from '../../models/comments';

console.log("======Creating Comments Table======");

const create_table_comments = async() => {
    await Comments.sync({force : true})
        .then(() => {
            console.log("✅Successfully created Comments Table");
        })
        .catch((err) => {
            console.log("❗Failed to create Comments Table: ", err);
        })
}

create_table_comments();