import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from "xlsx";
import { IRbT } from '../models/rbt.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectDataService {

  constructor(private http: HttpClient) { }

  public readFile() {
    return this.http.get("../../../data/HangHoaBanRa12.xls", { responseType: 'arraybuffer' })
  }

  public parseData(wb: XLSX.WorkBook): IRbT[] {
    const tables: any = [];
    const results: IRbT[] = [];
    const sheet = wb.Sheets['HangHoaBanRa'];
    const pattent: RegExp = new RegExp(/^B.[1-8]$/);

    const pattent1: string = 'Giờ Lib';
    const pattent2: string = 'Giờ Pool';
    let tableIndex = 0;
    for (const key in sheet) {
      const col = sheet[key];
      if (!col.v || typeof col.v !== 'string') continue;

      if (col.v.match(pattent)) {
        if (tables.length) {
          tableIndex++
        }
        tables.push({
          key: key,
          name: sheet[key].v,
          revenue: []
        })
        tables[tableIndex].revenue.push(sheet[key]);

      } else {
        if (!tables.length) {
          continue;
        } else {
          tables[tableIndex].revenue.push({ key: key, value: sheet[key] })
        }
      }
    }

    tables.forEach((table: any) => {
      const result: IRbT = {
        name: table.name,
        total: Math.floor(sheet[table.key.replace('A', 'J')].v),
        RpH: 0,
        another: 0
      }
      table.revenue.forEach((revenue: any) => {
        const data = revenue?.value?.v;
        if (data) {
          if (data === pattent1 || data === pattent2) {
            result.RpH = Math.floor(sheet[revenue.key.replace('E', 'L')].v);
            if (result.RpH && result.total) result.another = result.total - result.RpH;
          }
        }
      })

      results.push(result);
    });

    return results

  }
}
