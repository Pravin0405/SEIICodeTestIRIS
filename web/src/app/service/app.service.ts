import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  api = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  // Returns all subdivision
  public getSubdivision() {
    return this.http
      .get(`${this.api}subdivisions`)
      .pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
