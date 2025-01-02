import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductListingService } from '../Services/product-listing.service';
import { ProductListing } from '../shared/product-listing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})

export class ProductListingComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'price', 'brand', 'productTypeName', 'description'];
  dataSource = new MatTableDataSource<ProductListing>();
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productListingService: ProductListingService) {}

  ngOnInit(): void {
    this.productListingService.GetProducts().subscribe(
      (products: any) => {
        this.dataSource.data = products;
      },
      (error: any) => {
        if (error.status === 401) {
          this.errorMessage = 'Unauthorized access. Please log in.';
        } else {
          this.errorMessage = 'An error occurred while fetching the products.';
        }
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}