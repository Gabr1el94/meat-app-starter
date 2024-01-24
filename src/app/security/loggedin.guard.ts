import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate{

    constructor(private loginService: LoginService){}


    checkAuthentication(path: string):boolean{
        const loggedIn = this.loginService.isLoggedIn();
        if (!loggedIn){
            this.loginService.handleLogin(`/${path}`);
        }
        return loggedIn;
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
       return this.checkAuthentication(route.path);
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean | Observable<boolean>{
        return this.checkAuthentication(activatedRoute.routeConfig.path);
    }

}