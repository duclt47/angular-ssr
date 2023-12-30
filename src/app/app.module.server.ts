import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { BrowserService } from './services/browser.service';
import { WindowService } from './services/server-renderer.service.ts/window.service';
import { ServerWindowService } from './services/server-renderer.service.ts/server-window.service';
import { LibraryShimComponent } from './library-shim.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
  // providers: [{
  //   provide: WindowService,
  //   useClass: ServerWindowService,
  // }],
  // declarations: [LibraryShimComponent]
})
export class AppServerModule { }
