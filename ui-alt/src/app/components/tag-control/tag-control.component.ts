import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Tags } from 'src/app/services/interfaces/tag';

@Component({
  selector: 'app-tag-control',
  templateUrl: './tag-control.component.html',
  styleUrls: ['./tag-control.component.scss'],
})
export class TagControlComponent implements OnInit, AfterViewInit {
  key: string;

  value: string;

  @ViewChild('keyInput')
  keyInput!: ElementRef;

  @Input()
  focusAfterViewInit!: boolean;

  @Input()
  tags: Tags;

  @Input()
  required: boolean;

  @Output()
  tagsChange: EventEmitter<Tags>;

  constructor(private fb: UntypedFormBuilder) {
    this.required = true;
    this.tags = {};
    this.tagsChange = new EventEmitter<Tags>();
    this.focusAfterViewInit = false;
    this.key = '';
    this.value = '';
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.focusAfterViewInit) this.focus();
  }

  public focus() {
    this.keyInput.nativeElement.focus();
  }

  onAddTag() {
    this.tags[this.key] = this.value;

    this.tagsChange.emit(this.tags);

    this.key = '';
    this.value = '';

    this.keyInput.nativeElement.focus();
  }

  onRemoveTag(tag: any) {
    delete this.tags[tag.key];
    this.tagsChange.emit(this.tags);
  }
}
