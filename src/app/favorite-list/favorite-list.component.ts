import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

interface UserSetting {
  name: string;
  preferences: {
    theme: string;
    language: string;
  };
}

export class FavoriteListComponent {
  private readonly localStorageService = inject(LocalStorageService);

  setUserSettings(userSettings: UserSetting): void {
    this.localStorageService.set('UserSettingKey', userSettings);
  }

  getUserSettings(): UserSetting | null {
    return this.localStorageService.get<UserSetting>('UserSettingKey');
  }

  removeUserSettings(): void {
    return this.localStorageService.remove('UserSettingKey');
  }
}