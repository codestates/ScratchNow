import { Post } from '../../models/post';

console.log('======Creating <post> Table======');

const create_table_post = async () => {
  await Post.sync({ force: true })
    .then(() => {
      console.log('✅ Successfully created <post> Table');
    })
    .catch((err) => {
      console.log('❗ Failed to create <post> Table: ', err);
    });
};

void create_table_post();
