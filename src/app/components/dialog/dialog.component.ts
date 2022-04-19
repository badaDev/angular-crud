import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

import * as alertify from 'alertifyjs';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productForm: FormGroup;
  // productDetails: ProductModel;

  // @Output() productOutput: EventEmitter<string> = new EventEmitter();

  allProducts: any = []

  actionBtn: string = "Save";
  
    

  constructor(private formBuilder: FormBuilder, 
              private apiService: ApiService,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<DialogComponent> ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      listingDate: ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.maxLength(250)],
    })

    // console.log(this.editData);
    
    
    if (this.editData) {
      this.actionBtn = "Update"
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['listingDate'].setValue(this.editData.listingDate);
      this.productForm.controls['condition'].setValue(this.editData.condition);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
    
  }

  //the below method adds product to our json server and 
  // we will implement getProduct method in our app component because that is where we will be displaying the products

  addProduct() {

        if (!this.editData) {
          if (this.productForm.valid) {
            this.apiService.postProduct(this.productForm.value)
            .subscribe({
              next:(res) => {
                alertify.success('Product Added') 
                this.productForm.reset()
                this.dialogRef.close('save')
              },
              error:(err) => {
                alertify.error('Error')
              }
            })
          } 
          } else {
            this.updateProduct()
          }
            
  }

  updateProduct() {

        this.apiService.putProduct(this.productForm.value, this.editData.id)
        .subscribe({
          next:(res) => {
            alertify.success('Product Updated') 
            this.productForm.reset()
            this.dialogRef.close('update')
          },
          error:(err) => {
            alertify.error('Error')
          }
        });
    }

    

  // productInfo(): ProductModel {
  //   return this.productDetails = {
  //     productName: this.productForm.get('productName').value,
  //     category: this.productForm.get('category').value,
  //     listingDate: this.productForm.get('listingDate').value,
  //     condition: this.productForm.get('condition').value,
  //     price: this.productForm.get('price').value,
  //     comment: this.productForm.get('comment').value
      
  //   }

  // }


  // getAllProduct() {
  //   this.allProducts = this.prodService.getProduct()
  //   this.productOutput.emit(this.allProducts);
  //   // // return this.prodService.productList
    
    
  // }

}
