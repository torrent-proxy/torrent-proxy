import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentComponent } from './torrent.component';
import {FormsModule} from "@angular/forms";

describe('TorrentComponent', () => {
  let component: TorrentComponent;
  let fixture: ComponentFixture<TorrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorrentComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
