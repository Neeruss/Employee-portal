import { Component, OnInit } from '@angular/core';
import { employeeModel } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminapiService } from '../services/adminapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee:employeeModel={}
  constructor(private route:ActivatedRoute,private api:AdminapiService ,private router:Router){

  }
  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
    /*console.log(res.id);*/
    const {id}=res
    this.viewEmployee(id)
    })
    
  }
  viewEmployee(id:string)
  {
    this.api.viewEmployeeAPI(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.employee=res
        
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  editEmployee(id:any)
  {
    this.api.updateEmployeeAPI(id,this.employee).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Wow!",
          text: " Employee details updated successfully"

        });
        this.router.navigateByUrl('/employees')
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  cancelButton(id:any)
  {
    this.viewEmployee(id)
  }
}
