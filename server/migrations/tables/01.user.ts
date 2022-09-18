import { User } from '../../models/user';

console.log('======Creating <user> Table======');

const create_table_user = async () => {
  await User.sync({ force: true })
    .then(() => {
      console.log('✅ Successfully created <user> Table');
    })
    .catch((err) => {
      console.log('❗ Failed to create <user> Table: ', err);
    });
};

void create_table_user();
