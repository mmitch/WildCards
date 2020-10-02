import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project PlaceHolder', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title screen', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('PlaceHolder');
  });

  // TODO: This fails with Firefox, longstanding bug in Protractor
  // https://github.com/angular/protractor/issues/5346
  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(jasmine.objectContaining({
  //     level: logging.Level.SEVERE,
  //   } as logging.Entry));
  // });
});
