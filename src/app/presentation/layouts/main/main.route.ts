import { Route } from '@angular/router';
import { roleGuard } from '../../../core/infrastructure/guards/role.guard';
import { UserRoles } from '../../../core/shared/constants/roles.const';

export const MAIN_ROUTES: Route[] = [
  {
    path: 'profile',
    loadComponent: () =>
      import('../../features/profile/setting/setting.component').then(
        (m) => m.SettingComponent
      ),
    title: 'Profile',
    canActivate: [roleGuard],
    data: { roles: [UserRoles.SURVEYOR, UserRoles.GARAGE, UserRoles.SPARE_PARTS] }
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
