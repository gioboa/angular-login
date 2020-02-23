import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  public set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public get(key: string): string {
    return JSON.parse(localStorage.getItem(key));
  }
}