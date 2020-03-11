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
    products: IProduct[];

    constructor(private http: HttpClient) { }

    GetProduct(id: number): IProduct {
        return this.products.find(x => x.productId == id);
    }

    GetProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productsUrl)
            .pipe(
                tap(x => this.products = x),
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