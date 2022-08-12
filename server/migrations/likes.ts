import { Likes } from '../models/likes';

console.log("======Creating Likes Table======");

const create_table_likes = async() => {
    await Likes.sync({force : true})
        .then(() => {
            console.log("✅Successfully created Likes Table");
        })
        .catch((err) => {
            console.log("❗Failed to create Likes Table: ", err);
        })
}

create_table_likes();