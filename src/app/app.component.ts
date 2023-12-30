import { Component, OnInit } from '@angular/core';
import { CollectDataService } from './services/collect-data.service';
import { IRbT } from './models/rbt.model';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'chart-ngmodel';
  data: IRbT[];
  constructor(public collectDataService: CollectDataService) { }

  ngOnInit(): void {
    this.getData();
  }

  private async getData() {
    this.collectDataService.readFile().subscribe((data) => {
      const wb = XLSX.read(data);
      this.data = this.collectDataService.parseData(wb);
      console.log(this.data);

    })
  }
}
