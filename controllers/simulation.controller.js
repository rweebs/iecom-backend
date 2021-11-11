const { google } = require("googleapis");
const dotenv = require("dotenv");
const { Investasi } = require("./map");
dotenv.config();
async function read(sheets, range, spreadsheetId) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range,
  });
  return response.data.values[0][0];
}
async function read_multiple(sheets, range, spreadsheetId) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range,
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
async function isValid(sheets, spreadsheetId, value) {
  let year = new Map();
  year.set(2022, 3);
  year.set(2023, 4);
  year.set(2024, 5);
  year.set(2025, 6);
  year.set(2026, 7);
  year.set(2027, 8);
  year.set(2028, 9);
  const row = year.get(value.substr(cell.length - 4));
  let max_money;
  let current_invest;
  let money;
  try {
    max_money = await read(sheets, `Pilihan investasi!S${row}`, spreadsheetId);
  } catch (err) {
    return false;
  }
  try {
    current_money = await read(
      sheets,
      `Pilihan investasi!T${row}`,
      spreadsheetId
    );
  } catch (err) {
    return false;
  }
  try {
    const temp = cell.replace("Pilihan investasi!", "");
    const temp2 = temp.substring(1, temp.length);
    money = await read(sheets, `Pilihan investasi!G${temp2}`, spreadsheetId);
  } catch (err) {
    return false;
  }
  if (max_money <= current_invest + money) {
    return true;
  } else {
    return false;
  }
}
async function financialStatus(sheets, spreadsheetId, value) {
  let year = new Map();
  year.set(2022, 3);
  year.set(2023, 4);
  year.set(2024, 5);
  year.set(2025, 6);
  year.set(2026, 7);
  year.set(2027, 8);
  year.set(2028, 9);
  const row = year.get(value.substr(cell.length - 4));
  let available;
  let investment_cost;
  let annual;
  try {
    available = await read(sheets, `Pilihan investasi!S${row}`, spreadsheetId);
  } catch (err) {
    return false;
  }
  try {
    investment_cost = await read(sheets, `Pilihan investasi!T${row}`, spreadsheetId);
  } catch (err) {
    return false;
  }
  return ({
    available: available,
    investment_cost: investment_cost - 300000,
    annual: 300000,
  })

}
const auth = await google.auth.getClient({
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

module.exports = {
  edit: async (req, res) => {
    const cell = req.query.cell;
    const value = req.query.value;
    if (!Investasi.get(cell)) {
      return res.status(404).json({
        status: "FAILED",
        message: "error request",
      });
    }
    try {
      if (cell.includes("marketing_2")) {
        const isChecked = await read(
          sheets,
          `Pilihan investasi!P5`,
          process.env.SPREADSHEET_ID
        );
        if (isChecked === 1) {
          return res.status(400).json({
            status: "FAILED",
            message:
              "You can only choose 'Install Customer Relationship Management software' once",
          });
        } else {
          if (
            isValid(sheets, process.env.SPREADSHEET_ID, Investasi.get(cell))
          ) {
            const result = await write(
              sheets,
              Investasi.get(cell),
              process.env.SPREADSHEET_ID,
              value
            );
            const result2 = await write(
              sheets,
              `Pilihan investasi!P5`,
              process.env.SPREADSHEET_ID,
              1
            );
          } else {
            return res.status(400).json({
              status: "FAILED",
              message: "Not enough money",
            });
          }
        }
      } else if (cell.includes("warehouse_1")) {
        const isChecked = await read(
          sheets,
          `Pilihan investasi!P15`,
          process.env.SPREADSHEET_ID
        );
        if (isChecked === 1) {
          return res.status(400).json({
            status: "FAILED",
            message: "You can only choose 'Build a new warehouse' once",
          });
        } else {
          if (
            isValid(sheets, process.env.SPREADSHEET_ID, Investasi.get(cell))
          ) {
            const result = await write(
              sheets,
              Investasi.get(cell),
              process.env.SPREADSHEET_ID,
              value
            );
            const result2 = await write(
              sheets,
              `Pilihan investasi!P15`,
              process.env.SPREADSHEET_ID,
              1
            );
          } else {
            return res.status(400).json({
              status: "FAILED",
              message: "Not enough money",
            });
          }
        }
      } else if (cell.includes("warehouse_2")) {
        const isChecked = await read(
          sheets,
          `Pilihan investasi!P16`,
          process.env.SPREADSHEET_ID
        );
        if (isChecked === 1) {
          return res.status(400).json({
            status: "FAILED",
            message: "You can only choose 'Expand current warehouse' once",
          });
        } else {
          if (
            isValid(sheets, process.env.SPREADSHEET_ID, Investasi.get(cell))
          ) {
            const result = await write(
              sheets,
              Investasi.get(cell),
              process.env.SPREADSHEET_ID,
              value
            );
            const result2 = await write(
              sheets,
              `Pilihan investasi!P16`,
              process.env.SPREADSHEET_ID,
              1
            );
          } else {
            return res.status(400).json({
              status: "FAILED",
              message: "Not enough money",
            });
          }
        }
      } else if (cell.includes("supplier_1")) {
        const isChecked = await read(
          sheets,
          `Pilihan investasi!P26`,
          process.env.SPREADSHEET_ID
        );
        if (isChecked === 1) {
          return res.status(400).json({
            status: "FAILED",
            message:
              "You can only choose 'Install Supplier Relationship Management software' once",
          });
        } else {
          if (
            isValid(sheets, process.env.SPREADSHEET_ID, Investasi.get(cell))
          ) {
            const result = await write(
              sheets,
              Investasi.get(cell),
              process.env.SPREADSHEET_ID,
              value
            );
            const result2 = await write(
              sheets,
              `Pilihan investasi!P26`,
              process.env.SPREADSHEET_ID,
              1
            );
          } else {
            return res.status(400).json({
              status: "FAILED",
              message: "Not enough money",
            });
          }
        }
      } else if (cell.includes("waste_1")) {
        const isChecked = await read(
          sheets,
          `Pilihan investasi!P33`,
          process.env.SPREADSHEET_ID
        );
        if (isChecked === 1) {
          return res.status(400).json({
            status: "FAILED",
            message:
              "You can only choose 'Install waste management system' once",
          });
        } else {
          if (
            isValid(sheets, process.env.SPREADSHEET_ID, Investasi.get(cell))
          ) {
            const result = await write(
              sheets,
              Investasi.get(cell),
              process.env.SPREADSHEET_ID,
              value
            );
            const result2 = await write(
              sheets,
              `Pilihan investasi!P33`,
              process.env.SPREADSHEET_ID,
              1
            );
          } else {
            return res.status(400).json({
              status: "FAILED",
              message: "Not enough money",
            });
          }
        }
      } else {
        if (isValid(sheets, process.env.SPREADSHEET_ID, Investasi.get(cell))) {
          const result = await write(
            sheets,
            Investasi.get(cell),
            process.env.SPREADSHEET_ID,
            value
          );
        } else {
          return res.status(400).json({
            status: "FAILED",
            message: "Not enough money",
          });
        }
      }
    } catch (err) {
      return res.status(400).json({
        status: "FAILED",
        message: err.message,
      });
    }
    const result = await financialStatus(sheets, process.env.SPREADSHEET_ID, Investasi.get(cell));
    return res.status(200).json({
      status: "SUCCESS",
      data: result,
    });
  },
  current_condition: async (req, res) => {
    const range2 = 'Current condition!B3:B26'
    const range3 = 'Current condition!A3:A26'
    const sample2 = await read(sheets, range2, process.env.SHEET_ID)
    const sample3 = await read(sheets, range3, process.env.SHEET_ID)
    let result = {}
    for (let i = 0; i < sample2.length; i++) {
      result[sample3[i][0]] = sample2[i][0]
    }
  }
};