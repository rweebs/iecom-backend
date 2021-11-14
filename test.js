const {google} = require('googleapis');
const dotenv = require('dotenv');
dotenv.config();

marketing_1_2021    = 'Pilihan investasi!I4'
marketing_2_2021    = 'Pilihan investasi!I5'
marketing_3_2021    = 'Pilihan investasi!I6'
machine_1_2021      = 'Pilihan investasi!I8'
machine_2_2021      = 'Pilihan investasi!I9'
machine_3_2021      = 'Pilihan investasi!I10'
machine_4_2021      = 'Pilihan investasi!I11'
machine_5_2021      = 'Pilihan investasi!I12'
machine_6_2021      = 'Pilihan investasi!I13'
warehouse_1_2021    = 'Pilihan investasi!I15'
warehouse_2_2021    = 'Pilihan investasi!I16'
warehouse_3_2021    = 'Pilihan investasi!I17'
distribution_1_2021 = 'Pilihan investasi!I19'
distribution_2_2021 = 'Pilihan investasi!I20'
distribution_3_2021 = 'Pilihan investasi!I21'
distribution_4_2021 = 'Pilihan investasi!I22'
distribution_5_2021 = 'Pilihan investasi!I23'
distribution_6_2021 = 'Pilihan investasi!I24'
supplier_1_2021     = 'Pilihan investasi!I26'
supplier_2_2021     = 'Pilihan investasi!I27'
worker_1_2021       = 'Pilihan investasi!I29'
worker_2_2021       = 'Pilihan investasi!I30'
worker_3_2021       = 'Pilihan investasi!I31'
waste_1_2021        = 'Pilihan investasi!I33'
async function read(sheets,range,spreadsheetId){
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range,
    });
    return response.data.values
}
async function write(sheets,range,spreadsheetId,values){
    let resource = {
        values:[[values]],
    };
    const response = await sheets.spreadsheets.values.update({
        resource,
        valueInputOption: 'USER_ENTERED',
        spreadsheetId: spreadsheetId,
        range
    });
    return response
}

async function test(){
const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });

const sheets = google.sheets({ version: 'v4', auth });

  // Query

const range = 'Pilihan investasi!I4';
const range2='Current condition!B3:B26'
const range3='Current condition!A3:A26'
let year = new Map();
  year.set(2022, 'Current condition!B3:B26');
  year.set(2023, 'Current condition!C3:C26');
  year.set(2024, 'Current condition!D3:D26');
  year.set(2025, 'Current condition!E3:E26');
  year.set(2026, 'Current condition!F3:F26');
  year.set(2027, 'Current condition!G3:G26');
  year.set(2028, 'Current condition!H3:H26');
const sample2 = await read(sheets,year.get(2023),process.env.SHEET_ID)
const sample3 = await read(sheets,range3,process.env.SHEET_ID)
let result={}
for(let i=0;i<sample2.length;i++){
    result[sample3[i][0]]=sample2[i][0]
}
console.log(sample2)
console.log(sample3)
console.log(result)}

test()