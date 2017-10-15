# RedditClone

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

## Install dependencies

Clone repository and run `npm install` to install project dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Using the App! (The fun part)

Reddit clone will show you listings for r/javascript. It will display 10 listing items per page, and you can navigate between pages using the buttons at the bottom. You can change which r/javascript feed you see by clicking any of the links in the black nav bar at the top (hot/new/rising/top). 


Clicking the listing item title will take you to the actual reddit page for that listing item. Clicking the listing item author will take you to that user's reddit profile. Click the page header (javascript) to be taken to the actual subreddit to compare!


To see post comments, click on the 'X comments' link at the bottom of the listing. This will show you the original post along with the associated comments.

## Challenges

Response data needs to be stored in meaningful 'shapes' depending on what is being requested and what is being displayed. There are 4 main models that the response data is sorted into:

- Listing: Contains information about the current page of listings. For example, it contains information about the next and previous pages as well as an array of ListingItems.
- ListingItem: Contains information about each individual listing on a page. This includes information such as title, urls, author, id, etc.
- Post: Contains further details relating to a ListingItem including the description text and the Comment tree array.
- Comment: Contains information about an individual comment, such as author and body text, as well as an array of any Comments made on this comment (nested comment structure).


When sorting through data from requests to get all comments for an article, it quickly became clear that the comments can be deeply nested and that the depth of the comment tree is unknown/variable. The solution to the problem of generically mapping response data to retrieve the full comment tree for an article was solved using recursion. For each comment, look to see if there are replies, and for each reply comment, look to see if there are replies.... etc until the full comment tree for each article has been traversed and stored. Recursion was also reqired in the template to display the nested comment lists.

## Improvements

There are some irregularities in the layout of comments on small screens which should be addressed. Further, the current test suite is very bare bones and if the application is going to be expanded with new features, it will be necessary to add sufficient tests to detect when modifications produce breaking changes.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
