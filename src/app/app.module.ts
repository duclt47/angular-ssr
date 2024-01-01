import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './components/chart/chart.component';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgApexchartsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"ninex-39b24","appId":"1:382722981934:web:55b3f245577be3a4db1fbf","storageBucket":"ninex-39b24.appspot.com","apiKey":"AIzaSyD-d1Yrp9uVxZVXx9YAVP2-zYCebdSyu74","authDomain":"ninex-39b24.firebaseapp.com","messagingSenderId":"382722981934","measurementId":"G-MTTXEJTNPN"})),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
