import { Comment } from '../../models/comment';

console.log('======Creating <comment> Table======');

const create_table_comment = async () => {
  await Comment.sync({ force: true })
    .then(() => {
      console.log('✅ Successfully created <comment> Table');
    })
    .catch((err) => {
      console.log('❗ Failed to create <comment> Table: ', err);
    });
};

void create_table_comment();
