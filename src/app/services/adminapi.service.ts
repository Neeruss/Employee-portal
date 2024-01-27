import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeeModel } from '../employee.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  constructor(private http:HttpClient) { }
  server_URL="http://localhost:3000"
  //create an object for the BehaviorSubject
  public sharedData=new BehaviorSubject(false)
  //
  updateData(data:any)
  {
    //to access the new value
    this.sharedData.next(data)
  }
  authorization()
  {
    return this.http.get(`${this.server_URL}/employee/1`)
  }
  addEmployeeAPI(employee:employeeModel)
  {
    return this.http.post(`${this.server_URL}/employee`,employee)
  }
  getAllEmployeeAPI()
  {
    return this.http.get(`${this.server_URL}/employee`)
  }
  deleteEmployeeAPI(id:string)
  {
    return this.http.delete(`${this.server_URL}/employee/${id}`)
  }
  viewEmployeeAPI(id:string)
  {
    return this.http.get(`${this.server_URL}/employee/${id}`)
  }
  updateEmployeeAPI(id:any,employee:any)
  {
    return this.http.put(`${this.server_URL}/employee/${id}`,employee)
  }
  updateAdminAPI(admin:any){
    return this.http.put(`${this.server_URL}/employee/1`,admin)
  }

}
