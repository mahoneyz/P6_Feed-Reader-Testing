/* feedreader.js*/

$(function() {
    // RSS feeds tests

    describe('RSS Feeds', function() {
        /* Test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('URLs are defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('Names are defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });

    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default. */

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes visibility when the
          * menu icon is clicked.*/

        it('its visibility toggles when clicked', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

    });

    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.*/

         //use beforeEach to wait for async call to finish
         beforeEach(function(done) {
            loadFeed(0, done)
         });

         // Make sure feeds are loaded
        it('there is at least one feed loaded', function() {
            var feeddiv = $('.feed').children().length;
            expect(feeddiv).toBeDefined();
            expect(feeddiv).toBeGreaterThan(0); // has at least one entry
        });

    });

    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded by the loadFeed
        *  function that the content actually changes.*/

        var beforetitle, afterTitle;
        beforeEach(function(done) {
            loadFeed(0, function() {
                beforetitle = $(".feed").html();
            });
            loadFeed(1, function() {
                afterTitle = $(".feed").html();
                done();
            });
        });

        /* makes sure the values are different */
        it('title value changes after loading', function(done) {
            expect(afterTitle).not.toBe(beforetitle);
            done();
        });

        afterEach(function(done) {
            loadFeed(0, done);
        });
    });
}());
