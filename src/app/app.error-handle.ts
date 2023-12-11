import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class ErrorHandler {
    static handleError(err: HttpErrorResponse | any){
        let errorMessage: string;
        if (err instanceof HttpErrorResponse) {
            const body = err.error
            errorMessage = `${err.url}: ${err.status} - ${err.statusText} || '' ${body}`
        } else{
            errorMessage = err.message ? err.message : err.toString();
        }
        return Observable.throw(errorMessage);
    }
}