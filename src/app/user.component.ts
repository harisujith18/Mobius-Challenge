import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallsService } from '../apicalls.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public loginParam
  public userData

  constructor(private route:ActivatedRoute, private api: ApicallsService,private router:Router, private location:Location) {   }

  ngOnInit(): void {
    console.log('In On Init')
    this.route.params.subscribe(data => {
      this.loginParam = data.login
    })
    console.log(this.loginParam)
    this.api.getIndividualUser(this.loginParam).subscribe(data=>{
      this.userData = data
      console.log(this.userData.login)
    })

  }

}
