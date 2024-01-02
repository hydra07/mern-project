import 'dotenv/config';
// import server from './config/app';

import { connectDB } from './configs/database';
import server from './configs/socket';
import env from './utils/validateEnv';

connectDB();
server.listen(env.PORT, () => {
  console.log(`⚡[server]: Server is running at http://localhost:${env.PORT}`);
});
