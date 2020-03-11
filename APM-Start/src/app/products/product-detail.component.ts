import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { stringify } from 'querystring';

@Component({
  //selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    let productId = +this.route.snapshot.paramMap.get('id');// + is 'n shortcut om 'n string na 'n numeric id te cast.
    this.GetProduct(productId);
  }

  GetProduct(id: number) {
    this.product = this.productService.GetProduct(id);
  }
  
  onBack(): void {
    this.router.navigate(['/products']);
  }
}
