//connection to ArangoDD
import { Database } from 'arangojs';
const db = new Database ({
    url: 'https://d24cdc198b35.arangodb.cloud:8529',
    databaseName:'wildfirepredictions_db',
    auth: {username:'root', password: 'AGEwduKyBbLegHX5xsMG'}

});
export default db;