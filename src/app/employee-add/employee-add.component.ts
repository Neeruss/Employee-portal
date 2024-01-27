import { Component } from '@angular/core';
import { employeeModel } from '../employee.model';
import { AdminapiService } from '../services/adminapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  /* variable to store the value from the input box which have the same structure of employeeModel*/
  employee:employeeModel={}
  constructor(private api:AdminapiService)
  {

  }
  cancelEmployees()
  {
    this.employee={}
  }
  addEmployee()
  {
    console.log(this.employee);
    if(!this.employee.id || !this.employee.name || !this.employee.email || !this.employee.status)
    {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "please fill the form completely"
        
      });
    }
    else
    {
      this.api.addEmployeeAPI(this.employee).subscribe({
        next:(res:employeeModel)=>
        {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Wow!",
            text: `${res.name} added successfully`
  
          });
          this.employee={}
          
        },
        error:(err:any)=>{
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "failed"
            
          });
        }
      })
    }
    
  }
}
