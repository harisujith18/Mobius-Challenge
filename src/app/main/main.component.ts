import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApicallsService} from '../apicalls.service';
import {Chart} from 'node_modules/chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public userName : String = ''
  public followersCountArr = []
  public usersDetails;
  public detailsToDisplay=[];
  public usersCount;
  public displayCount:Boolean = false;
  public displayChart:Boolean = false

  constructor(private router:Router, private ref: ChangeDetectorRef,
              private api : ApicallsService) { }


  ngOnInit(): void {
       
  }
  public searchUser(){
    this.api.getUserName(this.userName).subscribe( res => {
      this.usersCount = res.total_count
      this.usersDetails = res.items
      this.usersDetails = this.usersDetails.splice(0,10)
      this.displayCount = true
      this.displayChart = true
      console.log(this.usersDetails)
      var ctx = document.getElementById('myChart');
      var myChart = new Chart("myChart", {
    type: 'bar',
    data: {
        labels: [this.usersDetails[0].login, this.usersDetails[1].login,this.usersDetails[2].login,this.usersDetails[3].login,this.usersDetails[4].login,this.usersDetails[5].login,this.usersDetails[6].login,this.usersDetails[7].login,this.usersDetails[8].login,this.usersDetails[9].login ],
        datasets: [{
            label: 'Number of Followers for the above users',
            data:this.followersCountArr,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(432, 213, 64, 0.2)',
                'rgba(65, 234, 64, 0.2)',
                'rgba(56, 98, 64, 0.2)',
                'rgba(222, 111, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

    })
    this.ref.detectChanges();
  }

  public goToProfile(user){
    this.router.navigate(['user',user])
  }

  followersCount(){
    for(let i=0;i<this.usersDetails.length;i++){
      this.api.getFollowers(this.usersDetails[i].followers_url).subscribe(data =>{
        this.followersCountArr.push(data.length)
      })
    }
    
  }

 

}
