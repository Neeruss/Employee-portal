import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { employeeModel } from '../employee.model';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  /*OnInit is an interface function to implement ngOnInit*/
  allEmployee:employeeModel[]=[]
  searchKey:string=""
  /* for pagination*/
  p: number = 1;
  constructor(private api:AdminapiService)
  {

  }
  /*LifeCycle hook -call just after the component is created and constructor is called*/
  ngOnInit(): void {
    this.allEmployeeDetails()
  }
  allEmployeeDetails()
  {
    this.api.getAllEmployeeAPI().subscribe({
      next:(res:any)=>{
        
        this.allEmployee=res
        console.log(this.allEmployee);
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  removeEmployee(id:any)
  {
    this.api.deleteEmployeeAPI(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allEmployeeDetails()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  sortId()
  {
    this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
  }
  sortName()
  {
    this.allEmployee.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }
  generatePDF()
  {
    /* create an object for jspdf */
    const pdf=new jsPDF()
    let head=[['Id','Employee name','Email','Status']]
    let body :any=[]
    this.allEmployee.forEach((item)=>{
      body.push([item.id,item.name,item.email,item.status])
    })
    /*font size*/
    pdf.setFontSize(16)
    /*title*/
    pdf.text('Employee Details',10,10)
    /*table*/
    autoTable(pdf,{head,body})
    /*to open in a new tab*/
    pdf.output('dataurlnewwindow')
    /*save and download*/
    pdf.save('employee.pdf')

  }
}
