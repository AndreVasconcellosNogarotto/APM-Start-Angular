import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, tap} from 'rxjs/operators';
import { IProduct } from './products';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) {}

  getProducts() : Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productUrl)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );

  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if(err.error instanceof ErrorEvent) {
      errorMessage = `Ocorreu um erro: ${err.error.message}`;
    } else {
      errorMessage = `Servidor retornou código: ${err.status}, o erro é: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

 }
