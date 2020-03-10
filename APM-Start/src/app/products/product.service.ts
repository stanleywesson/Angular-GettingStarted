import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private productsUrl = 'api/products/products.json';

    constructor(private http: HttpClient) { }

    // TODO I don't like that I call all the products for the 1 screen from the back end, and to get a single item, I again call the back end
    // Why cannot I search for the value in memory?
    GetProduct(id: number): Observable<IProduct | undefined> {
        return this.GetProducts()
            .pipe(
                map((products: IProduct[]) => products.find(p => p.productId === id))
            );
    }

    GetProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productsUrl)
            .pipe(
                tap(data => console.log('GetProducts')),
                catchError(this.handleError)
            );
    }

    private handleError(err: HttpErrorResponse) {
        let msg = '';

        if (err.error instanceof ErrorEvent) {
            msg = `Client side or network error ${err.error.message}`;
        }
        else {
            msg = `Backend return unsuccessful responds. Code ${err.status}: ${err.message}`;
        }

        console.error(msg);
        return throwError(msg);
    }
}