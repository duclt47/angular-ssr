import { Component, OnInit } from '@angular/core';
import { CollectDataService } from '../../services/collect-data.service';
import { IRbT } from '../../models/rbt.model';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  data: IRbT[];
  constructor(public collectDataService: CollectDataService) { }

  ngOnInit(): void {
    this.getData();
  }

  public async readFile(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    target.files[0].arrayBuffer().then((arrayBuffer) => {

      const wb = XLSX.read(arrayBuffer);
      this.data = this.collectDataService.parseData(wb);
    })

  }

  private async getData() {
    this.collectDataService.readFile().subscribe((data) => {
      console.log(data);

      const wb = XLSX.read(data);
      this.data = this.collectDataService.parseData(wb);
      // console.log(this.data);
    })
  }
}
