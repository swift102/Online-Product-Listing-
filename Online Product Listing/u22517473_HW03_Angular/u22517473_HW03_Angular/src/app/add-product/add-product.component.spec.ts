import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductsComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductsComponent;
  let fixture: ComponentFixture<AddProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductsComponent ],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.productForm.valid).toBeFalsy();
  });

  it('should have a valid form when filled', () => {
    component.productForm.controls['name'].setValue('Test Product');
    component.productForm.controls['price'].setValue(100);
    component.productForm.controls['brand'].setValue('Test Brand');
    component.productForm.controls['producttype'].setValue('Test Type');
    component.productForm.controls['description'].setValue('Test Description');
    expect(component.productForm.valid).toBeTruthy();
  });

  it('should call onSubmit when form is valid', () => {
    spyOn(component, 'onSubmit');

    component.productForm.controls['name'].setValue('Test Product');
    component.productForm.controls['price'].setValue(100);
    component.productForm.controls['brand'].setValue('Test Brand');
    component.productForm.controls['producttype'].setValue('Test Type');
    component.productForm.controls['description'].setValue('Test Description');

    let form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
