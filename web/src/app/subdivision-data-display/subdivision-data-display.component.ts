import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../service/app.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css']
})
export class SubdivisionDataDisplayComponent implements OnInit {

  displayedColumns: string[] = ['id', 'code', 'name', 'subdivisionStatusCode', 'nearMapImageDate'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  _paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this._paginator = paginator;
  }
  _sort!: MatSort;
  @ViewChild(MatSort, { static: false }) set matSort(sort: MatSort) {
    this._sort = sort;
  }
  tableData: any;

  constructor(private appService: AppService, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.appService.getSubdivision().subscribe(((res: any) => {
      this.dataSource = new MatTableDataSource(res.subdivisions);
      this.dataSource.paginator = this._paginator;
      this.dataSource.sort = this._sort;
    }))
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

export interface PeriodicElement {
  name: string;
  code: string;
  id: number;
  subdivisionStatusCode: number;
  nearMapImageDate: string;
}

const ELEMENT_DATA: PeriodicElement[] = []