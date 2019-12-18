import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Autorizado } from 'src/app/models/autorizado/autorizado';
const url = 'http://10.40.0.167:3000';

@Injectable({
  providedIn: 'root'
})
export class MongoService {

  constructor(private http: HttpClient) { }

  salvarAutorizado(autorizado: Autorizado): Observable<HttpResponse<Autorizado>> {
    // tslint:disable-next-line: object-literal-shorthand
    return this.http.post<any>(url + '/salvar', autorizado, { observe: 'response' })
      .pipe(
        catchError(this.handleError));
  }

  contarAutorizado(): Observable<HttpResponse<any>> {
    // tslint:disable-next-line: object-literal-shorthand
    return this.http.get<any>(url + '/contar', { observe: 'response' })
      .pipe(
        catchError(this.handleError));
  }

  conferirAutorizado(matricula: string): Observable<HttpResponse<any>> {
    // tslint:disable-next-line: object-literal-shorthand
    return this.http.post<any>(url + '/conferir', {matricula: matricula}, { observe: 'response' })
      .pipe(
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
