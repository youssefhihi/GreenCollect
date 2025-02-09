import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectCollectorListComponent } from './collect-collector-list.component';

describe('CollectCollectorListComponent', () => {
  let component: CollectCollectorListComponent;
  let fixture: ComponentFixture<CollectCollectorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectCollectorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectCollectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
