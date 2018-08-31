import { OfSearchUIModule } from './ui.module';

describe('UiModule', () => {
  let ofSearchUIModule: OfSearchUIModule;

  beforeEach(() => {
    ofSearchUIModule = new OfSearchUIModule();
  });

  it('should create an instance', () => {
    expect(ofSearchUIModule).toBeTruthy();
  });
});
