const { google } = require("googleapis");
const dotenv = require("dotenv");
const { Investasi } = require("./map");
const {Team} = require("../models/team");
dotenv.config();
async function read(sheets, range, spreadsheetId) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range:range,
  });
  return response.data.values[0][0];
}
async function read_multiple(sheets, range, spreadsheetId) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range:range,
  });
  return response.data.values
}
async function write(sheets, range, spreadsheetId, values) {
  let resource = {
    values: [[values]],
  };
  const response = await sheets.spreadsheets.values.update({
    resource,
    valueInputOption: "USER_ENTERED",
    spreadsheetId: spreadsheetId,
    range,
  });
  return response;
}

function generateRandomAccount() {
  const paths=['./load1.json','./load2.json','./load3.json','./load4.json','./load5.json']
  let random = Math.floor(Math.random())%paths.length;
  return paths[random]
}
async function isValid(sheets, spreadsheetId, cell,value) {
  let year = new Map();
  year.set('2022', 3);
  year.set('2023', 4);
  year.set('2024', 5);
  year.set('2025', 6);
  year.set('2026', 7);
  year.set('2027', 8);
  year.set('2028', 9);
  const row = year.get(cell.substr(cell.length - 4));
  let max_money;
  let current_invest;
  let money;
  
  try {
    max_money = await read(sheets, `Pilihan investasi!S${row}`, spreadsheetId);
    // console.log(max_money);
  } catch (err) {
    // console.log(err.message);
    return {result:false,message:"Server Error Please submit another request in 5 seconds"}
  }
  try {
    current_invest = await read(
      sheets,
      `Pilihan investasi!T${row}`,
      spreadsheetId
    );
    // console.log(current_invest);
  } catch (err) {
    // console.log(err.message);
    return {result:false,message:"Server Error Please submit another request in 5 seconds"}
  }
  try {
    const temp = Investasi.get(cell).replace("Pilihan investasi!", "");
    const temp2 = temp.substring(1, temp.length);
    money = await read(sheets, `Pilihan investasi!G${temp2}`, spreadsheetId);
  } catch (err) {
    // console.log(err.message);
    return {result:false,message:"Server Error Please submit another request in 5 seconds"}
  }
  if (parseInt(max_money) > parseInt(current_invest) + parseInt(money)*value) {
    // console.log(max_money > current_invest + money*value);
    return {result:true,message:"true"}
  } else {
    // console.log(err.message);
    return {result:false,message:"Not enough money"}
  }
}
async function financialStatus(sheets, spreadsheetId, cell,session_3) {
  let years = new Map();
  years.set('2022', 3);
  years.set('2023', 4);
  years.set('2024', 5);
  years.set('2025', 6);
  years.set('2026', 7);
  years.set('2027', 8);
  years.set('2028', 9);
  let row = years.get(cell.substr(cell.length - 4));
  let available;
  let investment_cost;
  try {
    available = await read(sheets, `Pilihan investasi!S${row}`, spreadsheetId);
  } catch (err) {
    // available = false;
    // console.log(err.message);
  }
  try {
    
    investment_cost = await read(sheets, `Pilihan investasi!T${row}`, spreadsheetId);
  } catch (err) {
    // investment_cost =false;
    // console.log(err.message);
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  let cost = parseFloat(available) - parseFloat(investment_cost);
  return ({
    session_3:session_3,
    available: formatter.format(cost),
    investment_cost: formatter.format(investment_cost),
    annual: 300000,
  })

}
// const auth = await google.auth.getClient({
//   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// });

// const sheets = google.sheets({ version: "v4", auth });

module.exports = {
  edit: async (req, res) => {
    let auth;
    let success=false;
    while(!success){
      try{
        auth = await google.auth.getClient({
          keyFile:generateRandomAccount(),
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
        success=true;
    }
    catch(err){
      success=false
    }
    
  }
    
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = req.sheet_id;
    const cell = req.query.cell;
    const value = req.query.value;
    if (!Investasi.get(cell)) {
      return res.status(404).json({
        status: "FAILED",
        message: "error request",
      });
    }
    // try {
      if (cell.includes("marketing_2")) {
        const isChecked = await read(
          sheets,
          `Pilihan investasi!P5`,
          spreadsheetId
        );
        if (isChecked == 1 && value == 1) {
          return res.status(400).json({
            status: "FAILED",
            message:
              "You can only choose 'Install Customer Relationship Management software' once",
          });
        } else {
          const {result,message} = await isValid(sheets, spreadsheetId, cell, value)
          if (
            result
          ) {
            const result = await write(
              sheets,
              Investasi.get(cell),
              spreadsheetId,
              value
            );
            // const result2 = await write(
            //   sheets,
            //   `Pilihan investasi!P5`,
            //   spreadsheetId,
            //   1
            // );
          } else {
            return res.status(400).json({
              status: "FAILED",
              message: message,
            });
          }
        }
      } else if (cell.includes("warehouse_1")) {
        const isChecked = await read(
          sheets,
          `Pilihan investasi!P15`,
          spreadsheetId
        );
        if (isChecked == 1 && value == 1) {
          return res.status(400).json({
            status: "FAILED",
            message: "You can only choose 'Build a new warehouse' once",
          });
        } else {
          const {result,message} = await isValid(sheets, spreadsheetId, cell, value)
          if (
            result
          ) {
            const result = await write(
              sheets,
              Investasi.get(cell),
              spreadsheetId,
              value
            );
            // const result2 = await write(
            //   sheets,
            //   `Pilihan investasi!P15`,
            //   spreadsheetId,
            //   1
            // );
          } else {
            return res.status(400).json({
              status: "FAILED",
              message: message,
            });
          }
        }
      } else if (cell.includes("warehouse_2")) {
        const isChecked = await read(
          sheets,
          `Pilihan investasi!P16`,
          spreadsheetId
        );
        if (isChecked == 1 && value == 1) {
          return res.status(400).json({
            status: "FAILED",
            message: "You can only choose 'Expand current warehouse' once",
          });
        } else {
          const {result,message} = await isValid(sheets, spreadsheetId, cell, value)
          if (
            result
          ) {
            const result = await write(
              sheets,
              Investasi.get(cell),
              spreadsheetId,
              value
            );
            // const result2 = await write(
            //   sheets,
            //   `Pilihan investasi!P16`,
            //   spreadsheetId,
            //   1
            // );
          } else {
            return res.status(400).json({
              status: "FAILED",
              message: message,
            });
          }
        }
      } else if (cell.includes("supplier_1")) {
        const isChecked = await read(
          sheets,
          `Pilihan investasi!P26`,
          spreadsheetId
        );
        if (isChecked == 1 && value == 1) {
          return res.status(400).json({
            status: "FAILED",
            message:
              "You can only choose 'Install Supplier Relationship Management software' once",
          });
        } else {
          const {result,message} = await isValid(sheets, spreadsheetId, cell, value)
          if (
            result
          ) {
            const result = await write(
              sheets,
              Investasi.get(cell),
              spreadsheetId,
              value
            );
            // const result2 = await write(
            //   sheets,
            //   `Pilihan investasi!P26`,
            //   spreadsheetId,
            //   1
            // );
          } else {
            return res.status(400).json({
              status: "FAILED",
              message: message,
            });
          }
        }
      } else if (cell.includes("waste_1")) {
        const isChecked = await read(
          sheets,
          `Pilihan investasi!P33`,
          spreadsheetId
        );
        if (isChecked == 1 && value == 1) {
          return res.status(400).json({
            status: "FAILED",
            message:
              "You can only choose 'Install waste management system' once",
          });
        } else {
          if (
            await isValid(sheets, spreadsheetId, cell, value)
          ) {
            const result = await write(
              sheets,
              Investasi.get(cell),
              spreadsheetId,
              value
            );
            // const result2 = await write(
            //   sheets,
            //   `Pilihan investasi!P33`,
            //   spreadsheetId,
            //   1
            // );
          } else {
            return res.status(400).json({
              status: "FAILED",
              message: "Not enough money",
            });
          }
        }
      } else {
        const {result,message} = await isValid(sheets, spreadsheetId, cell, value)
        if (result) {
          await write(
            sheets,
            Investasi.get(cell),
            spreadsheetId,
            value
          );
        } else {
          return res.status(400).json({
            status: "FAILED",
            message: message,
          });
        }
      }
    // } catch (err) {
    //   return res.status(400).json({
    //     status: "FAILED",
    //     message: err.message,
    //   });
    // }
    const result = await financialStatus(sheets, spreadsheetId, cell,req.session_3);
    return res.status(200).json({
      status: "SUCCESS",
      data: result,
    });
  },
  current_condition: async (req, res) => {
    const auth = await google.auth.getClient({
      keyFile:generateRandomAccount(),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = req.sheet_id;
    let year = new Map();
  year.set('2022', 'Current condition!B3:B26');
  year.set('2023', 'Current condition!C3:C26');
  year.set('2024', 'Current condition!D3:D26');
  year.set('2025', 'Current condition!E3:E26');
  year.set('2026', 'Current condition!F3:F26');
  year.set('2027', 'Current condition!G3:G26');
  year.set('2028', 'Current condition!H3:H26');
    const range3 = 'Current condition!A3:A26';
    const sample2 = await read_multiple(sheets, year.get(req.current_year), spreadsheetId)
    const sample3 = await read_multiple(sheets, range3, spreadsheetId)
    let result = {}
    for (let i = 0; i < sample2.length; i++) {
      result[sample3[i][0]] = sample2[i][0]
    }
    return res.status(200).json({
      status: "SUCCESS",
      data: result,
    });
  },
  submit_current_year: async (req, res) => {
    const auth = await google.auth.getClient({
      keyFile:generateRandomAccount(),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = req.sheet_id;
    let year = new Map();
    year.set('2022', 'Keuangan!B5:G5');
    year.set('2023', 'Keuangan!B6:G6');
    year.set('2024', 'Keuangan!B7:G7');
    year.set('2025', 'Keuangan!B8:G8');
    year.set('2026', 'Keuangan!B9:G9');
    year.set('2027', 'Keuangan!B10:G10');
    year.set('2028', 'Keuangan!B11:G11');
    const current_year=(parseInt(req.current_year)-1).toString();
  const data = await read_multiple(sheets, year.get(current_year), spreadsheetId);
  const team = await Team.findOne({name: req.team});
  // team.current_year = (parseInt(req.current_year) + 1).toString();
  const result={
    "period":parseInt(req.current_year) + 1,
    "Product Sold": data[0][4],
    "Market Share Change": data[0][5],
    "Early Year Cash": data[0][0],
    "Total Cost": data[0][1],
    "Profit": data[0][2],
    "Cash": data[0][3],
  }
  let save = await team.save();
  return res.status(200).json({
    status: "SUCCESS",
    data: result,
  });
  },
  current_data: async (req, res) => {
    const auth = await google.auth.getClient({
      keyFile:generateRandomAccount(),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = req.sheet_id;
    let year = req.current_year;
    let result;
    if (year==='2022'){
      result = await read(sheets, 'Pengumuman!B2', spreadsheetId);
    }else if (year==='2023'){
      result = await read(sheets, 'Pengumuman!B3', spreadsheetId);
    }else if (year==='2024'){
      result = await read(sheets, 'Pengumuman!B4', spreadsheetId);
    }else if (year==='2025'){
      const isValid=await read(sheets, 'Pilihan Investasi!P33', spreadsheetId);
      if (isValid=='1'){
        result = await read(sheets, 'Pengumuman!B5', spreadsheetId);
      }else{
        result = await read(sheets, 'Pengumuman!C5', spreadsheetId);
      }
    }else if (year==='2026'){
      const isValid=await read(sheets, 'Pilihan Investasi!Q29', spreadsheetId);
      if (isValid>0){
        result = await read(sheets, 'Pengumuman!B6', spreadsheetId);
      }else{
        result = await read(sheets, 'Pengumuman!C6', spreadsheetId);
      }
    }else if (year==='2027'){
      const isValid=await read(sheets, 'Pilihan Investasi!P33', spreadsheetId);
      if (isValid=='1'){
        result = await read(sheets, 'Pengumuman!B7', spreadsheetId);
      }else{
        result = await read(sheets, 'Pengumuman!C7', spreadsheetId);
      }
    }else if (year==='2028'){
      const isValid=await read(sheets, 'Pilihan Investasi!R29', spreadsheetId);
      if (isValid>0){
        result = await read(sheets, 'Pengumuman!B8', spreadsheetId);
      }else{
        result = await read(sheets, 'Pengumuman!C8', spreadsheetId);
      }
    }
    else{
      result=null;
    }
  const finance = await financialStatus(sheets, spreadsheetId, req.current_year);
  return res.status(200).json({
    status: "SUCCESS",
    data: {session_3:req.session_3,financial_status:finance, announcement:result.split("._."), period:req.current_year},
  });
  },
  submit_final: async (req, res) => {
    const auth = await google.auth.getClient({
      keyFile:generateRandomAccount(),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = req.sheet_id;
    let team = await Team.findOne({name:req.team})
    const final_cash = await read(sheets, 'Keuangan!B12', spreadsheetId);
    team.final_cash = final_cash
    team.is_submited_2 = true
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    
      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    await team.save((err,result)=>{
      if(err){
          return(res.status(400).json({
              status: "FAILED",
              message: err.message
          }))
      }
      return(res.status(200).json({
              status:"SUCCESS",
              data:formatter.format(final_cash)
          }))
          
      }
  )
  },
   status: async (req,res)=>{
        let team
        try{
            team = await Team.findOne({name:req.team})
        }
        catch(err){
            return(res.status(400).json({
                status: "FAILED",
                message: err.message
            }))
        }
        const result = {
            session_3:team.session_3,
            is_submited:team.is_submited_2,
        }
        return(res.status(200).json({
            status:"SUCCESS",
            data:result
        }))
    },
    status_final: async (req, res) => {
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
      let team = await Team.findOne({name:req.team})
        return(res.status(200).json({
                status:"SUCCESS",
                data:formatter.format(team.final_cash)
            }))
    },
    reset:async (req,res)=>{ 
        let team = await Team.updateMany({},{is_submited_2:false,final_cash:0,$unset: { session_3: "" }})
        return(res.status(200).json({
            status:"SUCCESS",
            data:""
        }))
    }
  

};