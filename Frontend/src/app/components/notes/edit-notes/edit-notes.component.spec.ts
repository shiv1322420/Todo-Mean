import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotesComponent } from './edit-notes.component';

describe('EditNotesComponent', () => {
  let component: EditNotesComponent;
  let fixture: ComponentFixture<EditNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
