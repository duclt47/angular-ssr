import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ChartComponent, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { IRbT } from '../../models/rbt.model';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend?: ApexLegend;
};
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})


export class BarChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input('data') set allowDay(data: IRbT[]) {
    const totals: number[] = [];
    const RpH: number[] = [];
    const anothers: number[] = [];

    if (data?.length) {
      data.forEach((data: IRbT) => {
        totals.push(data.total);
        RpH.push(data.RpH);
        anothers.push(data.another);
      })

      this.chartOptions.series = [
        {
          name: "Tổng",
          data: totals
        },
        {
          name: "Tiền giờ",
          data: RpH
        },
        {
          name: "Nước/Thuốc",
          data: anothers
        }
      ]
    }
  }

  public chartOptions: ChartOptions;
  constructor() {
    let sefl = this;

    this.chartOptions = {
      series: [

      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false,

      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "B1",
          "B2",
          "B3",
          "B4",
          "B5",
          "B6",
          "B7",
          "B8",
        ],

      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return sefl.nFormatter(value, 1);
          }
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return sefl.nFormatter(val, 1);
          }
        }
      }
    };


  }

  ngOnInit(): void {
  }


  private nFormatter(num: number, digits: number) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }
}
