context('Portal Test', () => {
  beforeEach(() => {
  	// demo3404@kkbox.com
    cy.setCookie('token', 'V0007GSB2560000000000000000000100000000000000000000000000014825', {path: '/', domain: 'portal.kkbox.com'})
      .visit('https://portal.kkbox.com/listen-with/');
  });

  // chartroom
  const nameOfDJ = 'div.chat-room-profile .name';

  // main
  const celebrityActionOverlay = 'div.verified-users div.avatar div.action-overlay';
  const celebrityName = 'div.verified-users div.name';
  const officialFollowButton = 'div.official-channels div.program-card .action';
  const popularDjName = 'div.top-channels div.creator-name ';
  const popularDjFollowButton = 'div.top-channels div.avatar div.action-overlay';
  const userName = 'div.user-name';

  // profile
  const currentSong = 'section.listen-with-widget div.listen-with-current_playing .primary';
  const playButton = '.button-play';
  const profileName = '.profile-info div.name';
  const DjName = 'div.user.columns a.name';
  const DjName1 = 'div.user.columns a.name';
  const profileTab = 'div.profile-tabs div.tabs li';
  const shareButton = 'div.profile-tools .profile-share';
  const trackName = 'table.track-list tr.track-item .track-name';
  const track = '.container.sub-page .track-item';
  const alldj = 'div.infinite-scroller ol li div.avatar div.action-overlay';
  const alldjlink = '.nav a.nav-item.is-tab';
  const alldjname = 'div.infinite-scroller div.name';

  // sharing 
  const copyUrl = '.sb-copybox-action';
  const facebookSharingButton = 'button.sb-btn-social-block.sb-btn-facebook';

  it('Get', () => {
    cy.get(userName).should('contain', '');
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



  it.only('1', () => {
    cy.get(popularDjName).eq(0).invoke('text').then((name) => {
      cy.get(popularDjFollowButton).eq(0).invoke('show').find('button').click();
        cy.get(DjName).invoke('text').then((DjName) => {
        expect(name.trim()).to.equal(DjName.trim());
      });
    });
  });



  


  it('2', () => {
    
    cy.get(popularDjName).eq(0).invoke('text').then((name) => {
      cy.get(popularDjFollowButton).eq(0).invoke('show').find('button').click();
        cy.get(DjName).invoke('text').then((DjName) => {
        expect(name.trim()).to.equal(DjName.trim());

    cy.get(alldjlink).eq(1).click();

    cy.get(alldjname).eq(0).invoke('text').then((name1) => {
      cy.get(alldj).eq(0).invoke('show').find('button').click();
        cy.get(DjName1).invoke('text').then((DjName1) => {
        expect(name1.trim()).to.equal(DjName1.trim());
    //cy.get(alldj).eq(0).invoke('show').find('button').click();
  });
  });
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