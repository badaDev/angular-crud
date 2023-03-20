import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import {MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { ApiService } from './services/api.service';
import { ProductService } from './services/product.service';

//angular material table
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

//alertify
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularCrud';

  // allProducts: any = []

  //material table
  displayedColumns: string[] = ['productName', 'category', 'listingDate', 'condition', 'price', 'action'];
  dataSource: MatTableDataSource<any>;
  productData: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, 
              private apiService: ApiService,
              ) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllProducts();
      }
    });
  }

  ngOnInit(): void {
    this.getAllProducts(); 
  }
  


  getAllProducts() {
    this.apiService.getProduct()
    .subscribe({
      next: (res) => {
        console.log(res);
        
        this.productData = res;
        console.log(this.productData, "product data");
        
        this.dataSource = res['data'];
        console.log(this.dataSource, "datasource");
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error: (err) => {
        alertify.error('Error fetching products')
      }
    })
  }


  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      data: row   //we are linking each row with the dialog box input on click of edit button for this we inject the mat-dialog-data 
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllProducts();
      }
    });
  }

  //delete product

  removeProduct(id: number) {
    this.apiService.deleteProduct(id)
    .subscribe({
      next:(res) => {
        alertify.success('Product Deleted');
        this.getAllProducts()
      },
      error: (err) => {
        alertify.error('Error');
        
      }
    })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // getAllProduct() {
  //   this.allProducts = this.prodService.getProduct()
  //   // return this.prodService.productList
    
    
  // }

  


  
}
