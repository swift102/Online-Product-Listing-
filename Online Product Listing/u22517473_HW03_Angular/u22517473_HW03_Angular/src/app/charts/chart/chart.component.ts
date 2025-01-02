import { Component , ElementRef, OnInit , ViewChild , AfterViewInit} from '@angular/core';
import { Chart, ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { ProductListingService } from 'src/app/Services/product-listing.service';
import { Brands } from 'src/app/shared/report';
import { ProductTypes } from 'src/app/shared/report';
import { HttpClient } from '@angular/common/http';
import { registerables } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';
import { ProductType } from 'src/app/Services/product-listing.service';


interface Product {
  productId: number;
  name: string;
  price: number;
  isActive: boolean;
}

interface ProductTypeGroup {
  productType: string;
  products: Product[];
}

interface BrandGroup {
  brand: string;
  productTypes: ProductTypeGroup[];
}



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  activeProducts: BrandGroup[] = [];
  productsByBrand: any[] = [];
  productsByType: any[] = [];
  productTypes: ProductType[] = [];

  constructor(private dataService: ProductListingService, private http: HttpClient,  private cdr: ChangeDetectorRef) {
    Chart.register(...registerables);
  }

  ngOnInit() : void {
    this.fetchData();
    this.fetchActiveProductsReport();
    this.dataService.getproductTypes().subscribe((data) => {
      this.productTypes = data.filter(pt => pt.products.some(p => p.isActive));
    });
  }

  fetchData() {
    this.dataService.getProductsByBrands().subscribe(data => {
      console.log('Products by Brands:', data);  // Log data
      this.productsByBrand = data;
      this.createBrandChart();
    });
  
    this.dataService.getProductsByTypes().subscribe(data => {
      console.log('Products by Types:', data);  // Log data
      this.productsByType = data;
      this.createProductTypeChart();
    });
  }
  
  createBrandChart() {
    const brandCtx = document.getElementById('brandChart') as HTMLCanvasElement;
    new Chart(brandCtx, {
      type: 'bar',
      data: {
        labels: this.productsByBrand.map(item => item.brand), 
        datasets: [{
          label: 'Brands',
          data: this.productsByBrand.map(item => item.count), 
          backgroundColor: ['#90E0EF', '#00B4D8'] 
        }]
      }
    });
  }
  
  createProductTypeChart() {
    const productTypeCtx = document.getElementById('productTypeChart') as HTMLCanvasElement;
    new Chart(productTypeCtx, {
      type: 'bar',
      data: {
        labels: this.productsByType.map(item => item.productType), 
        datasets: [{
          label: 'Product Types',
          data: this.productsByType.map(item => item.count),
          backgroundColor: ['#90E0EF', '#00B4D8'] 
        }]
      }
    });
  }

  
  fetchActiveProductsReport() {
    this.dataService.getActiveProducts().subscribe(data => {
      this.activeProducts = this.transformData(data);
      console.log(this.activeProducts);
    });
  }
   
  
    transformData(data: any[]): BrandGroup[] {
      const transformed = data.reduce((acc: BrandGroup[], curr: any) => {
        const { productType, brand, products } = curr;
        let brandGroup = acc.find(b => b.brand === brand);
        if (!brandGroup) {
          brandGroup = { brand, productTypes: [] };
          acc.push(brandGroup);
        }
        let typeGroup = brandGroup.productTypes.find(t => t.productType === productType);
        if (!typeGroup) {
          typeGroup = { productType, products: [] };
          brandGroup.productTypes.push(typeGroup);
        }
        typeGroup.products = typeGroup.products.concat(products);
        return acc;
      }, []);
      return transformed;
    }

  toggleAccordion(event: Event) {
    const element = event.currentTarget as HTMLElement;
    element.classList.toggle("active");
    const content = element.parentElement?.nextElementSibling as HTMLElement;
    if (content) {
      if (content.style.maxHeight) {
        content.style.maxHeight = '';
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    } else {
      console.error("Accordion content not found for", element);
    }
  }

}