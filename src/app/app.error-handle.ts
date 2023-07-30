import { Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

export class ErrorHandler {
    static handleError(err: Response | any){
        let errorMessage: string;
        if (err instanceof Response) {
            errorMessage = `Erro ${err.status} ao obter a URL ${err.url} - ${err.statusText}`
        } else{
            errorMessage = err.toString();
        }
        return Observable.throw(errorMessage);
    }
}