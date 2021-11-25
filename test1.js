const {google} = require('googleapis');
const dotenv = require('dotenv');
dotenv.config();
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
async function appendData(auth,spreadsheetId,userId,name,aspirasi,status,id) {
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.append({
      auth: auth,
      spreadsheetId: spreadsheetId,
      range: 'Sheet1!A2', //Change Sheet1 if your worksheet's name is something else
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [ ["Void", "Canvas", "Website"], ["Paul", "Shan", "Human"] ]
      }
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      } else {
          console.log("Appended");
      }
    });
  }

async function test(){
const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });

await appendData(auth,"1hdGL6hdQD8PZOdLQFxSFofJPhi8IqUt6GE2ZGncYsEE");

  // Query

}
test()