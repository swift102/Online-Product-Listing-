import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductListingService } from '../Services/product-listing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brands } from '../shared/brand';
import { ProductTypes } from '../shared/product-types';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductsComponent implements OnInit {
  formData = new FormData();
  brandsData: Brands[] = [];
  productTypesData: ProductTypes[] = [];
  fileNameUploaded = '';

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    image: ['', Validators.required],  // Use 'image' instead of 'file' to match backend
    price: ['', Validators.required],
    brand: [null, Validators.required],
    producttype: [null, Validators.required],
    description: ['', Validators.required]
  });

  constructor(
    private productService: ProductListingService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.GetBrands();
    this.GetProductTypes();
  }

  GetBrands() {
    this.productService.getBrands().subscribe(
      result => {
        this.brandsData = result;
        console.log('Brands Data:', this.brandsData);
      },
      error => {
        console.error('Error fetching brands', error);
      }
    );
  }

  GetProductTypes() {
    this.productService.getProductTypes().subscribe(
      result => {
        this.productTypesData = result;
        console.log('Product Types Data:', this.productTypesData);
      },
      error => {
        console.error('Error fetching product types', error);
      }
    );
  }

  uploadFile(files: any) {
    let fileToUpload = <File>files[0];
    this.formData.append('image', fileToUpload, fileToUpload.name);  // Use 'image' instead of 'file'
    this.fileNameUploaded = fileToUpload.name;
    
    // Update the form control value
    this.productForm.patchValue({
      image: fileToUpload
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      // Clear any existing FormData before appending new data
      this.formData = new FormData();
  
      this.formData.append('Name', this.productForm.get('name')!.value);
      this.formData.append('Price', this.productForm.get('price')!.value);
      this.formData.append('Description', this.productForm.get('description')!.value);
      this.formData.append('Brand', this.productForm.get('brand')!.value);
      this.formData.append('ProductType', this.productForm.get('producttype')!.value);
  
      // Append file if exists
      if (this.fileNameUploaded) {
        this.formData.append('Image', this.productForm.get('image')!.value);  // Use 'Image' to match backend
      }
  
      this.productService.addProduct(this.formData).subscribe(
        response => {
          this.clearData();
          this.router.navigateByUrl('product').then(navigated => {
            if (navigated) {
              this.snackBar.open(this.productForm.get('name')!.value + ` created successfully`, 'X', { duration: 5000 });
            }
          });
        },
        error => {
          console.error('Error adding product', error);
        }
      );
    }
  }

  clearData() {
    this.formData.delete("Image");
    this.formData.delete("Name");
    this.formData.delete("Price");
    this.formData.delete("Description");
    this.formData.delete("Brand");
    this.formData.delete("ProductType");
  }
}