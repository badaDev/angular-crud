import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

const productApi = "https://angular-crud-7c712-default-rtdb.firebaseio.com/productLists.json"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postProduct(data: any) {
    return this.http.post<any>(productApi, data);
  } 


  getProduct() {
    return this.http.get<any>(productApi)
    .pipe(map(res => {
      return res;
    })
      
    );
  }

  putProduct(data: any, id: number) {
    return this.http.put<any>(productApi + id, data);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(productApi + id);
  }
}
