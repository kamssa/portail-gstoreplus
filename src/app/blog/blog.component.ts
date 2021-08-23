import { Component, OnInit } from '@angular/core';
import {BlogService} from "../service/blog.service";
import {Blog} from "../models/Blog";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
blocs: Blog[];
bloc: Blog[];
  constructor(private  blocService: BlogService) { }

  ngOnInit(): void {
    this.blocService.getAllBlogTrue()
      .subscribe(data =>{
        this.blocs = data.body;

        console.log(this.blocs);
      });
    this.blocService.getAllBlogFalse()
      .subscribe(res => {
        this.bloc = res.body;
      });
  }

}
