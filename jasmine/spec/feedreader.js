/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URL defiend for each feed and is not empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length > 0).toBe(true);
            })
         })


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Name defiend for each feed and is not empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length > 0).toBe(true);
            })
         })
    });



    describe('The menu', () => {
        /* A test that ensures the menu element is
         * hidden by default.
         */
        var bodyElement = $('body'),
            menuIcon = $('.menu-icon-link');
        it('are hidden by default', () => {
            expect(bodyElement.hasClass('menu-hidden')).toBe(true);
        })


        /* A test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * has two expectations: the menu displays when menu icon
        * clicked and does it hide when clicked again.
        */
        it('displays when the menu icon is clicked and hides when clicked again', () => {            
            menuIcon.click();
            expect(bodyElement.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(bodyElement.hasClass('menu-hidden')).toBe(true);
        })
    })



    describe('Initial Entries', () => {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * And loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(done => {
            loadFeed(0, () => {
                done();
            })
        })


        it('loaded asynchronously', () => {
            expect($('.feed .entry-link .entry').length > 0).toBe(true);
            // done();
        })
    }) 
        


    describe('New Feed Selection', () => {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * And loadFeed() is asynchronous.
         */
        var initialEntries,
            newEntries;
        beforeEach(done => {
            
            loadFeed(1, () => {
                initialEntries = $('.feed').first().html();
                loadFeed(2, () => {
                    done();
                })
            })
        })

        it('Loaded new feed entries', () => {
            newEntries = $('.feed').first().html();
            expect(newEntries).not.toBe(initialEntries); 
            // done(); 
        })
    })
        
}());
