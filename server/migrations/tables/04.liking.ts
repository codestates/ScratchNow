import { Liking } from '../../models/liking';

console.log('======Creating <liking> Table======');

const create_table_liking = async () => {
  await Liking.sync({ force: true })
    .then(() => {
      console.log('✅ Successfully created <liking> Table');
    })
    .catch((err) => {
      console.log('❗ Failed to create <liking> Table: ', err);
    });
};

void create_table_liking();
