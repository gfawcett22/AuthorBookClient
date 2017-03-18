import { AuthorBookAppPage } from './app.po';

describe('author-book-app App', () => {
  let page: AuthorBookAppPage;

  beforeEach(() => {
    page = new AuthorBookAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
