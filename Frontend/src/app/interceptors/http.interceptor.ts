import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

// create intercept to bind header with each http request and throw error as well
export const httpInterceptor: HttpInterceptorFn = (req, next) => {

    // Clone the request to add new headers.
    const clonedRequest = req.clone({
      setHeaders:{
        'Content-Type': 'application/json'
      }
    });


    // Handle the request and response.
    return next(clonedRequest).pipe(
      catchError((error)=>{
        console.log('HTTP Error:', error);
        return throwError(()=>error);
      })
    )
};
