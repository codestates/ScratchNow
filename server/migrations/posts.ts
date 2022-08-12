import { Posts } from '../models/posts';

console.log("======Creating Posts Table======");

const create_table_posts = async() => {
    await Posts.sync({force : true})
        .then(() => {
            console.log("✅Successfully created Posts Table");
        })
        .catch((err) => {
            console.log("❗Failed to create Posts Table: ", err);
        })
}

create_table_posts();