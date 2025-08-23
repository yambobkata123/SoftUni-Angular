import { Router } from "@angular/router";
import { environment } from "./environments/environment";
import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { ErrorService } from "./errormsg";
import { catchError, tap } from "rxjs";

const { apiUrl } = environment;

export const appInterceptor: HttpInterceptorFn = (req, next) => {
    const API = '/api';
    if (req.url.startsWith(API)) {
        req = req.clone({
          url: req.url.replace(API, apiUrl),
          withCredentials: true,
    })
    }

    const router = inject(Router);
    const err = inject(ErrorService);
    return next(req).pipe(
        tap((event) => {
            err.setApiError(null);

            
        }),
        catchError((err) => {
            err.setApiError(err);
            return [err]
        }
            )
    )
}