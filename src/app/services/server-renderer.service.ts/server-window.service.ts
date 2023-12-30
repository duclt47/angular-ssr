// server-window.service.ts
import { Injectable } from '@angular/core';
import { WindowService } from './window.service';

@Injectable()
export class ServerWindowService extends WindowService {
    override getWidth(): number {
        return 0;
    }
}