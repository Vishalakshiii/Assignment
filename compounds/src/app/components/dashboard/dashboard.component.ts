import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public compounds: Observable<any> = of(null);
  public pageNum: number = 1;
  public array: null[] = [];
  public deleteId: any;


  constructor(public service: HttpService) {}
  

  ngOnInit(): void {
    this.compounds =this.service.getCompounds(6,6).pipe(tap(data => this.array.length = Math.ceil(data.count[0].COUNT/6)));
  }

  getData(pageNum) {
    this.pageNum = pageNum;
    let offset = (this.pageNum - 1)*6;
    this.compounds = this.service.getCompounds(6,offset);
  }

  addComp(data) {
    this.service.addComponent(data).subscribe( data => this.ngOnInit())
  }

  deleteComp(id) {
    this.service.delete(id).subscribe(()=>this.ngOnInit())
  }
}
