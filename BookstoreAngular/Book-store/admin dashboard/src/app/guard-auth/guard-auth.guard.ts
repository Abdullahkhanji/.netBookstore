import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { Observable } from 'rxjs';

@Injectable()
export class GuardAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Promise<boolean> {
    //  let user_f = JSON.parse(localStorage.getItem('user'))
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          user
            .getIdTokenResult()
            .then((idTokenResult) => {
              console.log(idTokenResult.claims);
              if (!!idTokenResult.claims['admin']) {
                // Show admin UI.

                return resolve(true);
              } else {
                // Show regular user UI.
                // this.toastr.error(
                //   'You do not have permission to access this section'
                // );
                return resolve(false);
              }
            })
            .catch((error: any) => {
              console.log('no user1');
              //console.log(error);
            });
        } else {
          console.log('no user');
          // this.toastr.error('you are not logging in');

          this.router.navigate(['/pages-login']);
          return resolve(false);
        }
      });
      ////
      // let auth = getAuth();
      // let user = auth.onAuthStateChanged;
      // if (user) {
      //   user
      //     .getIdTokenResult()
      //     .then((idTokenResult) => {
      //       console.log(idTokenResult.claims);
      //       if (!!idTokenResult.claims['admin']) {
      //         // Show admin UI.

      //         return resolve(true);
      //       } else {
      //         // Show regular user UI.
      //         // this.toastr.error(
      //         //   'You do not have permission to access this section'
      //         // );

      //         return resolve(false);
      //       }
      //     })
      //     .catch((error: any) => {
      //       console.log('no user1');
      //       //console.log(error);
      //     });
      // } else {
      //   // localStorage.setItem('user', '');
      //   // localStorage.setItem('user_email', '');
      //   console.log('no user');
      //   // this.toastr.error('you are not logging in');

      //   return resolve(false);
      //   this.router.navigate(['/pages-login']);
      // }
    });
  }
}
