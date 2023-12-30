// window-service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class WindowService {
    getWidth(): number {
        return window.innerWidth;
    }
}