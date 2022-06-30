import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tags } from 'src/app/services/interfaces/tag';

@Component({
  selector: 'app-tag-control',
  templateUrl: './tag-control.component.html',
  styleUrls: ['./tag-control.component.scss']
})
export class TagControlComponent implements OnInit {
  @Input()
  tags: Tags = {};

  @Output()
  tagsChange: EventEmitter<Tags>;

  tagForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.tagsChange = new EventEmitter<Tags>();
    this.tagForm = fb.group({
      key: [null, Validators.required],
      value: [null],
    })
  }

  ngOnInit(): void {
  }

  onRemoveTag(tag: any) {
    const [key, value] = tag
  }

  onAddTag(tag: any) {
    const {key, value} = this.tagForm.value;
    this.tags[key] = value;
    this.tagForm.reset();
    this.tagsChange.emit(this.tags);
  }

}
