import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private readonly localStorage = inject(DOCUMENT)?.defaultView?.localStorage;

  get(key: string): any {
    const item = this.localStorage?.getItem(key);
    if (!item) {
      return [];
    }
    return JSON.parse(item);
  }
  add(key: string, value: any): void{
    const storage = this.get(key);
    storage.push(value)
    this.set(key, storage)
  }
  set(key: string, value: any): void {
    this.localStorage?.setItem(key, JSON.stringify(value));
  }
  remove(key: string): void {
    this.localStorage?.removeItem(key);
  }
  removeKeys(keys: string[]): void {
    keys.forEach(key => this.localStorage?.removeItem(key));
  }
  clear(): void {
    this.localStorage?.clear();
  }
  private isJSONValid(value: string): boolean {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  }
}