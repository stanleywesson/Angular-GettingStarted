import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  //selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Details';
  product: IProduct;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');// + is 'n shortcut om string na numeric id te cast.
    this.pageTitle += `: ${id}`;

    this.product = {
      'productId': id,
      'productName': 'Leaf Rake',
      'productCode': 'test',
      'releaseDate': 'test',
      'description': 'test',
      'price': 1,
      'starRating': 1.5,
      'imageUrl': 'test'
    };
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
