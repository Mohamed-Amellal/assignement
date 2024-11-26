import * as path from 'path';
import * as fs from 'fs';

// parse setdata
let csvToJson : any = require('convert-csv-to-json');
export const products_csv : String = path.resolve(__dirname, 'dataset/products.csv');
let outfile1 : String = 'products.json';
csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(products_csv, outfile1);
