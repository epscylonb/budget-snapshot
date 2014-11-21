
# Budget Snapshot

A tool to calculate a snapshot of your budget, breaking down your income and expenses by different periods.

Wrote this mainly to shore up my JavaScript knowledge, explore single page JS apps and play with Bootstrap 3.

The lib directory has two objects, Budget and Line, this is where the budget logic lives.  These objects have tests (using the [JSTest](http://jstest.jcoglan.com/) framework) in the spec directory.  To run them just open browser.html in a web browser from wherever you check out the repo from.

The code layout was inspired by the [example todo app](http://todomvc.com/examples/jquery/#/allQuery) on todomvc.com.  For the lib objects however I deliberately avoided using jQuery, they are pure JS with no dependencies.

The htdocs directory contains the app, to run the application copy the files to your webroot, you will also need to copy the files from the lib directory to the webroot as well.

## TODO

* Change the default color scheme.
* Fix the behaivour around using the tab key to move to the next form field.
