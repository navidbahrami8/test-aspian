import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectedInterface} from "../../shared/interfece/selected.interface";
import {Cities, Names} from "../../shared/mock";
import {GridService} from "./services/gird.service";
import {usersArray, UsersData} from "../../shared/interfece/users.interface";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedComponent implements OnInit , AfterViewInit{
  form!: FormGroup;
  items!: FormArray;
  isAddItem: boolean = false;
  isDeleteItem: boolean = false;

  //grid
  dataSource: any;
  usersData!: UsersData
  usersArray!: usersArray[]
  displayedColumns: string[] = ['no', 'name', 'family', 'age', 'phone', 'gender', 'email', 'eyeColor', 'birthDate'];

  get itemsGroups() {
    return this.form.get('items') as FormArray
  }

  cities: SelectedInterface [] = Cities
  names: SelectedInterface [] = Names

  dataGrid: any

  constructor(private fb: FormBuilder, private api: GridService ,private ref:ChangeDetectorRef) {

  }


  async getDataGrid() {
   await this.api.get().subscribe(async (res: any) => {
      this.dataSource = new MatTableDataSource(res?.users);
      this.ngAfterViewInit()
    })
  }
  async ngOnInit() {
    this.initForm()
    await this.getDataGrid()
  }

  initForm() {
    this.form = this.fb.group({
      cities: ['', Validators.required],
      names: ['', Validators.required],
      items: this.fb.array([this.createNewItems()]),
    })
  }

  createNewItems(): FormGroup {
    return this.fb.group({
      description: []
    });
  }

  addItem(): void {
    this.items = this.form.get('items') as FormArray;
    if (this.items.controls.length < 4) {
      this.items.push(this.createNewItems());
    } else {
      this.isAddItem = true
    }
  }

  deleteItemsGroup(index: number) {
    const add = this.form.get('items') as FormArray;
    if (add.controls.length >= 4) {
      console.log(add.controls.length)
      this.isAddItem = false
    }
    add.removeAt(index)
  }

  save() {
    console.log(this.form.value, 'value')
  }

  ngAfterViewInit() {
    this.ref.detectChanges()
  }

}
