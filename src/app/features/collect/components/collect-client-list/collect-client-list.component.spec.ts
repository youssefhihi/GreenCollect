import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectClientListComponent } from './collect-client-list.component';

describe('CollectClientListComponent', () => {
  let component: CollectClientListComponent;
  let fixture: ComponentFixture<CollectClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectClientListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
