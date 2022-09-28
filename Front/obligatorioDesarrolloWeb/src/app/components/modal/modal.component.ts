import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() deleteNote = new EventEmitter<string>();
  constructor(private location: Location,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  goBack(): void {
    this.location.back();
  }
  
  deleteModal(){
    this.deleteNote.emit();
  }

}
