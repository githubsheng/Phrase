# Phrase

#Live Demo
http://www.wangshengwow.appspot.com/html/sheng.html

#New Features
1. Infinite scroll: by default only 40 phrases are displayed in the page. As user scrolls down, more phrases are dynamically loaded in.
2. Enhanced select all: clicking select all will only select all filtered results (results filtered by search key word / status)
3. Dependency refactoring: removed all JQuery and Boostrap dependencies. This demo is pure Angular based.

#Code Format
Written in TypeScript, compiled to ES6, packed by Webpack.

#Installation
This installation guide assumes you have the following popular tools installed:
1. node.js / npm
2. tsc ( typescript compiler )
3. bower
4. tsd ( typing management tool)

After you have all the tools in place:
1. Download the zip file and navigate to the root folder.
2. run `npm install`
3. run `bower install`
4. run `tsd install`
5. run `gulp packSourceCode`
6. run `gulp packTestCases`
7. open `html/sheng.html` to view the page
8. optionally open `test/test.html` to run the test cases


