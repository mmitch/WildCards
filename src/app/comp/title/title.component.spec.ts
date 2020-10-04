import { ComponentFixture, TestBed } from '@angular/core/testing';
import { View } from 'src/app/view';

import { TitleComponent } from './title.component';

const PROJECT_URL = 'https://github.com/mmitch/PlaceHolder';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;
  let html: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the app name', () => {
    expect(html.querySelector('h1')?.textContent).toContain('PlaceHolder');
  });

  it('should link to the github repository', () => {
    // given

    // when
    const project = html.querySelector<HTMLParagraphElement>('p#project');

    // then
    expect(project?.textContent).toContain('project homepage:');
    expect(project?.textContent).toContain(PROJECT_URL);

    const link = project?.querySelector('a');
    expect(link?.href).toBe(PROJECT_URL);
    expect(link?.textContent).toBe(PROJECT_URL);
  });

  it('should request switch to the main menu when the button is clicked', () => {
    // given
    spyOn(component.viewChange, 'emit');

    // when
    html.querySelector('button')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.MAIN_MENU);
  });
});
