import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showSideBar:boolean=true
  employeeCount:Number=0
  adminName:any=""
  adminDetails:any={}

  selected: Date | null=new Date()

  Highcharts: typeof Highcharts = Highcharts; 
  chartOptions = { }

  profileImage:string='./assets/images/6716646.png'

  editAdminStatus:boolean=false

  constructor(private api:AdminapiService)
  {
    this.chartOptions={
      
    chart: {
      type: 'pie'
  },
  title: {
      text: 'Project Completion Report'
  },
  tooltip: {
      valueSuffix: '%'
  },
  plotOptions: {
      series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
              enabled: true,
              distance: 20
          }, {
              enabled: true,
              distance: -40,
              format: '{point.percentage:.1f}%',
              style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
              },
              filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 10
              }
          }]
      }
  },
  credits:{
    enabled:false
  },
  series: [
      {
          name: 'Project',
          colorByPoint: true,
          data: [
              {
                  name: 'FireFox',
                  y: 55.02
              },
              {
                  name: 'Chrome',
                  sliced: true,
                  selected: true,
                  y: 26.71
              },
              {
                  name: 'Safari',
                  y: 12.59
              },
              {
                  name: 'Opera',
                  y: 5.68
              }
          ]
      }
  ]

    }
    HC_exporting(Highcharts);
  }
  ngOnInit(): void {
    if(localStorage.getItem("name"))
    {
      this.adminName=localStorage.getItem("name")
    }
    this.totalEmployee()
    //fetch all admin details
    this.api.authorization().subscribe((res:any)=>{
      console.log(res);
      this.adminDetails=res
      if(res.picture)
      {
        this.profileImage=res.picture
      }
    })
  }
  menuBar()
  {
    this.showSideBar=!this.showSideBar
  }
  totalEmployee()
  {
    this.api.getAllEmployeeAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.employeeCount=res.length
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  edit()
  {
    this.editAdminStatus=true
  }
  getFile(event:any)
  {
    let fileDetails=event.target.files[0]
    console.log(fileDetails);
    //create an object for fileReader() class
    let fr=new FileReader()
    //read
    fr.readAsDataURL(fileDetails)
    //convert
    fr.onload=(event:any)=>{
      /*console.log(event.target.result);*/
      this.profileImage=event.target.result
      this.adminDetails.picture=this.profileImage
      
    }
  }
  updateAdmin()
  {
    this.api.updateAdminAPI(this.adminDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Wow!",
          text: "Updated Successfully"
          
        });
        localStorage.setItem("name",res.name)
        localStorage.setItem("pswd",res.password)
        this.adminName=localStorage.getItem("name")
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  cancel()
  {
    this.api.authorization().subscribe((res:any)=>{
      console.log(res);
      this.adminDetails=res
      if(res.picture)
      {
        this.profileImage=res.picture
      }
    })
    this.editAdminStatus=false
  }
}
