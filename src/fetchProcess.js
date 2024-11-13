//fetching and processing of the data
import db from './database';

async function getData() {
    const cursor = await db.query(` 
        FOR doc IN historical_data 
        FILTER doc.acq_date >= "01 01 2020" AND doc.acq_date <= "31 12 2023" 
        RETURN doc `);
    const data = await cursor.all();
    return data;
}

function fetchProcessData(data){
    return data.map(row =>({
      latitude: parseFloat(row.latitude),
      longitude: parseFloat(row.longitude),
      bright_ti4: parseFloat(row.bright_ti4)/1000, //normalize for data processing
      bright_ti5: parseFloat(row.bright_ti5)/1000,
      frp: parseFloat(row.frp)/100,
      daynight: row.daynight === 'D' ? 1 : 0, //encoded to binary
      confidence: row.confidence === 'n' ? 0 : parseInt(row.confidence),
      acq_date: new Date(row.acq_date),
      scan: parseFloat(row.scan),
      track: parseFloat(row.track)   
    }));
}
module.exports = {getData, fetchProcessData };
