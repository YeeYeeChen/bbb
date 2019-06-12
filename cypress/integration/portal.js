context('Portal Test', () => {
  beforeEach(() => {
  	// demo3758@kkbox.com
    cy.setCookie('token', 'V04urR4O555000000000000001TG-hu00000000000000000000001ROHVu431b', {path: '/', domain: 'portal.kkbox.com'})
      .visit('https://portal.kkbox.com/listen-with/');
  });

  // chartroom
  const nameOfDJ = 'div.chat-room-profile .name';

  // main
  const celebrityActionOverlay = 'div.verified-users div.avatar div.action-overlay';
  const celebrityName = 'div.verified-users div.name';
  const officialFollowButton = 'div.official-channels div.program-card .action';
  const userName = 'div.user-name';

  // profile
  const currentSong = 'section.listen-with-widget div.listen-with-current_playing .primary';
  const playButton = '.button-play';
  const profileName = '.profile-info div.name';
  const profileTab = 'div.profile-tabs div.tabs li';
  const shareButton = 'div.profile-tools .profile-share';
  const trackName = 'table.track-list tr.track-item .track-name';
  const track = '.container.sub-page .track-item';

  // sharing
  const copyUrl = '.sb-copybox-action';
  const facebookSharingButton = 'button.sb-btn-social-block.sb-btn-facebook';

  it('Get', () => {
    cy.get(userName).should('contain', 'demo3758');
  });

  it('Click', () => {
    cy.get(officialFollowButton).click()
      .get(nameOfDJ).should('contain', '速爆音樂台');
  });

  it('Eq', () => {
    cy.get(celebrityName).eq(0).click();
  });

  it('Invoke Show', () => {
    cy.get(celebrityActionOverlay).eq(0).invoke('show').find('button').click();
  });

  it('Invoke Text', () => {
    cy.get(celebrityName).eq(0).invoke('text').then((name) => {
      
      cy.get(celebrityName).eq(0).click();
      cy.get(profileName).invoke('text').then((profileName) => {
        expect(name.trim()).to.equal(profileName.trim());
      });

    });
  });

  it('Attribute', () => {
    cy.visit('https://portal.kkbox.com/listen-with/profile/338078680670');

    cy.get(currentSong).then((song) => {
      cy.get(profileTab).contains('Recently Played').click();
      cy.get(trackName).first().find('a').should('have.attr', 'title').and('eq', song.text());
    });
  });

  it('Stub', () => {
    cy.visit('https://portal.kkbox.com/listen-with/profile/338078680670');
    cy.get(shareButton).click();

    cy.get(copyUrl).should('have.attr', 'data-clipboard-text').then((data) => {
      cy.window().then((win) => {
        cy.stub(win, 'open');
        cy.get(facebookSharingButton).click();
        cy.window().its('open').should('be.calledWithMatch', 'https://www.facebook.com/dialog/share');
        cy.window().its('open').should('be.calledWithMatch', encodeURIComponent(data));
      });
    });
  });

});
