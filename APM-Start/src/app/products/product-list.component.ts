import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent
    implements OnInit {
    pageTitle: string = 'Product List';
    showImage: boolean = false;
    imageWidth: number = 50;
    imageMargin: number = 2;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private productService: ProductService) {
      
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.products = this.productService.GetProducts();
        this.filteredProducts = this.products;
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List' + message;
    }
}