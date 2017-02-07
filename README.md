# gulp-sweetsanitizer [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Deps][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A param sanitizer that reads your JSDoc.

## Table of contents

1. [Introduction](#introduction).
1. [Installation](#installation).
1. [Usage](#usage).
1. [Advanced Usage](#advanced-usage).
	1. [Machine readable errors](#machine-readable-errors).
	1. [Getting the non minified code](#getting-the-non-minified-code).
	1. [Things worth noticing](#things-worth-noticing).
1. [License](#license).

## Introduction

Sanitizing parameters is a pain in the ass, but it's necessary. Suppose that you're writing a
function for a collaborative project. Or maybe you're writing a module that will be downloaded
by millions of people. Suppose that your module needs a string:

```js
function superModule(superParameter) {
    // 100.000 lines of code
    
   let someRandomString = doSomethingRandom(superParameter);
   
   // 100.000 lines of code
   
   someRandomString.substr(Math.floor(Math.random() * someRandomString.length));
   
   // 100.000 lines of code
}
```

So you assign the result of `doSomethingRandom(string)`, which is a string, to someRandomString.
Your code looks cool. You publish it to NPM. It's a success: 10 million downloads. Google buys
your project because it's so cool. Suddenly you're drowning in money. You're living the dream.

But then some fucking dumbass who can't read downloads your module and does:

```js
superModule(12345);
```

Now why that's wrong, that's obvious. But only to you, not to them, because they get:

```
TypeError: someRandomString.substr is not a function
```

And they go and open an issue on GitHub. Now you have to spend some precious time helping that piece
of shit. Precious time that, with all that money, could have been spent on drugs, bitches... You
get the picture.

But to be fair, how the fuck are they supposed to figure out what `someRandomString.substr` means?
After all, you didn't sanitize your parameters. A simple `typeof string !== "string"` would have
sufficed. Then you could output quality error messages.

You didn't document your code either. Maybe you're the piece of shit after all!

Except you're not. So you document your code. And you sanitize your parameters:

```js
/**
 * Pretty cool module
 * @param {string} superParameter A very cool parameter
 */
function superModule(superParameter) {
    if (typeof superParameter !== "string") {
        throw new Error("Yo, the parameter must be a string!");
    }
    
    // 100.000 lines of code
    
   let someRandomString = doSomethingRandom(superParameter);
   
   // 100.000 lines of code
   
   someRandomString.substr(Math.floor(Math.random() * someRandomString.length));
   
   // 100.000 lines of code
}
```

Now that's what I call quality code.

But then Google says: "you're gonna need to add some functionality to your code!". So you do it:

```js
/**
 * Pretty cool module
 * @param {string} superParameter A very cool parameter
 * @param {object} options The module's options.
 * @param {string} [options.name]
 * 
 * The user's name. If passed, we will greet them.
 * 
 * @param {number} options.birthday
 * 
 * The user's birthday, in UNIX Timestamp format.
 * 
 * @param {boolean} [options.singHappyBirthday=true]
 * 
 * If true, we'll sing happy birthday to the user.
 */
function superModule(superParameter, options) {
    if (typeof superParameter !== "string") {
        throw new Error("Yo, the parameter must be a string!");
    }
    
    // 100.000 lines of code
    
   let someRandomString = doSomethingRandom(superParameter);
   
   
   // 100.000 lines of code
   
   someRandomString.substr(Math.floor(Math.random() * someRandomString.length));
   
   // 100.000 lines of code
}
```

Pretty cool! Except we have the same problem again: you need to sanitize the input. So you make a
checklist of everything you need to do:

* Make sure that `options` is defined.
* Check if `options.name` is defined. If it is, check that it's a `string`.
* Make sure that `options.birthday` is defined.
* Make sure that `options.birthday` is a number.
* Check if `options.signHappyBirthday` is defined. If it is, check that it's a `boolean`.
* If `options.signHappyBirthday` isn't defined, define it as `true`.

Suddenly your day is ruined. Why do you have to do all this? You want to kill yourself. You could
be spending your precious time with drugs and bitches, but instead you're in front of a computer,
at 3 AM, sanitizing your parameters, in order not to make the same mistake again.

This is also repetitive. You already wrote the [JSDoc](http://usejsdoc.org/) comment, which is, in
essence, a structured way of specifying the input you need. Well, that's what **sweetSanitizer** is
here for!

This gulp plugin turns this:

```js
/**
 * Pretty cool module
 * @param {string} superParameter A very cool parameter
 * @param {object} options The module's options.
 * @param {string} [options.name]
 * 
 * The user's name. If passed, we will greet them.
 * 
 * @param {number} options.birthday
 * 
 * The user's birthday, in UNIX Timestamp format.
 * 
 * @param {boolean} [options.singHappyBirthday=true]
 * 
 * If true, we'll sing happy birthday to the user.
 */
function superModule(superParameter, options) {
    let err = sweetSanitizer();
    
    if (err) {
        throw err;
    }
}
```

Into this:

```js
/**
 * Pretty cool module
 * @param {string} superParameter A very cool parameter
 * @param {object} options The module's options.
 * @param {string} [options.name]
 * 
 * The user's name. If passed, we will greet them.
 * 
 * @param {number} options.birthday
 * 
 * The user's birthday, in UNIX Timestamp format.
 * 
 * @param {boolean} [options.singHappyBirthday=true]
 * 
 * If true, we'll sing happy birthday to the user.
 */
function superModule(superParameter, options) {
    let err = (function() {
        if (typeof superParameter !== "string") {
            return new Error("Parameter superParameter is not defined, or is not of type string");
        }
      
        if (typeof options !== "object") {
            return new Error("Parameter options is not defined, or is not of type object");
        }
      
        if (typeof options !== "undefined" && typeof options.birthday !== "number") {
            return new Error("Parameter options.birthday is not defined, or is not of type number");
        }
      
        if (typeof options !== "undefined" && typeof options.name !== "undefined" && typeof options.name !== "string") {
            return new Error("Parameter options.name is not defined, or is not of type string");
        }
      
        if (typeof options !== "undefined" && typeof options.singHappyBirthday !== "undefined" && typeof options.singHappyBirthday !== "boolean") {
            return new Error("Parameter options.singHappyBirthday is not defined, or is not of type boolean");
        }
      
        var defaults = {
            singHappyBirthday: true
        };
      
        options = Object.assign(defaults, options);
      
        return false;
    })();

    if (err) {
        throw err;
    }
}

/*
 * Note: this isn't actually the output of sweetSanitizer(). This is a beautified version of it
 * for exposition purposes.
 * 
 * The actual output would look like this:
 * 
 * let err = !function(){if("string"!=typeof superParameter)return new Error("Parameter superParameter is not defined, or is not of type string");if("object"!=typeof options)return new Error("Parameter options is not defined, or is not of type object");if("undefined"!=typeof options&&"number"!=typeof options.birthday)return new Error("Parameter options.birthday is not defined, or is not of type number");if("undefined"!=typeof options&&"undefined"!=typeof options.name&&"undefined"!=typeof options&&"string"!=typeof options.name)return new Error("Parameter options.name is not defined, or is not of type string");if("undefined"!=typeof options&&"undefined"!=typeof options.singHappyBirthday&&"undefined"!=typeof options&&"boolean"!=typeof options.singHappyBirthday)return new Error("Parameter options.singHappyBirthday is not defined, or is not of type boolean");var e={singHappyBirthday:!0};return options=Object.assign(e,options),!1}();
 */
```

That's right! It generates the code you need based on the JSDoc comment you wrote! How cool is that?

The `sweetSanitizer()` call is replaced by the generated function. The generated function returns an
error if the input doesn't meet the JSDoc requirements, or false if it does. Then you can handle
the error however you want.

## Installation

```sh
$ npm install --save-dev gulp-sweetsanitizer
```

or

```sh
$ yarn add --dev gulp-sweetsanitizer
```

## Usage

First you need to write a function with a valid [JSDoc](http://usejsdoc.org/) comment. The comment
must be describing a function or method, and must be written just before the beginning of said
function or method. Then, inside it, you can call `sweetSanitizer()`, and assign the result of it
to a variable `error`:

```js
/**
 * My function
 * 
 * @param {object} options The function's options
 * @param {string} options.a A string
 * @param {number} [options.b=1] A number
 */
function myFunction(options) {
    let error = sweetSanitizer();
    
    // Handle the error.
}
```

Ideally, the call to `sweetSanitizer()` should be the first statement in your function or method, 
since it modifies the parameter values if you define default values in your JSDoc comment.

sweetSanitizer is easy to integrate with your build process thanks to [Gulp](http://gulpjs.com/):

```js
const gulp           = require("gulp")
    , sweetSanitizer = require("gulp-sweetsanitizer");

gulp.task("sweetsanitizer", () => {
	return gulp.src("./src/**/*.js")
		.pipe(sweetSanitizer())
		.pipe(gulp.dest("./out"));
});
```

If you're not familiar with gulp, `gulp.src("./src/**/*.js")` selects all `.js` files in the `src`
folder (you can customize this to your liking). `sweetSanitizer()` runs sweetSanitizer on each file,
and `gulp.dest("./out")` puts the result files on the `./out` folder (if it doesn't exist, it's
created for you).

To learn more about Gulp, head over to their
[getting started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) section.

## Advanced usage

### Machine readable errors

In some cases, you may want to show the user a different error message than the generic one 
generated by sweetSanitizer. You can pass the option: `machine_readable_error: true` to it:

```js
/**
 * My function
 * 
 * @param {object} options The function's options
 * @param {string} options.a A string
 * @param {number} [options.b=1] A number
 */
function myFunction(options) {
    let error = sweetSanitizer({ machine_readable_error: true });
    
    // Handle the error.
}
```

Then you'd get this:

```js
/**
 * My function
 * 
 * @param {object} options The function's options
 * @param {string} options.a A string
 * @param {number} [options.b=1] A number
 */
function myFunction(options) {
    let error = (function() {
        if (typeof options !== "object") {
            return {
                "reason": "INVALID_TYPE_OR_PARAMETER_NOT_DEFINED",
                "details": {
                    "parameter": "options",
                    "expectedType": "object"
                }
            };
        }
        if (typeof options !== "undefined" && typeof options.a !== "string") {
            return {
                "reason": "INVALID_TYPE_OR_PARAMETER_NOT_DEFINED",
                "details": {
                    "parameter": "options.a",
                    "expectedType": "string"
                }
            };
        }
        if (typeof options !== "undefined" && typeof options.b !== "undefined" && typeof options.b !== "number") {
            return {
                "reason": "INVALID_TYPE_OR_PARAMETER_NOT_DEFINED",
                "details": {
                    "parameter": "options.b",
                    "expectedType": "number"
                }
            };
        }
        var defaults = {
            b: 1
        };
        options = Object.assign(defaults, options);
        return false;
    })();

    // Handle the error.
}

// Again, this is not the actual output, which is minified.
```

As you can see, the error is not an `Error` anymore. As instead, it's an object, with this 
structure:

```js
/**
 * @typedef {object} ErrorDetails
 * 
 * The details of an error produced by sweetSanitizer.
 * 
 * @property {string} reason
 * 
 * The reason the object was produced. Its value is one of the following:
 * - INVALID_TYPE
 * - PARAMETER_NOT_DEFINED
 * - INVALID_TYPE_OR_PARAMETER_NOT_DEFINED
 * 
 * @property {object} [details] An object containing additional information
 * @property {string} [details.parameter]
 * 
 * The problematic parameter.
 * 
 * @property {string} [details.expectedType] 
 *
 * In a type error, the type that the parameter is meant to be of.
 */
```

### Getting the non minified code

If for some reason you don't want the inserted code to be minified, you can opt out by passing
`uglify: false` to the sweetSanitizer call:

```js
/**
 * My function
 * 
 * @param {object} options The function's options
 * @param {string} options.a A string
 * @param {number} [options.b=1] A number
 */
function myFunction(options) {
    let error = sweetSanitizer({ uglify: false });
    
    // Handle the error.
}
```

### Things worth noticing

* You can use `@typedef`s as the data type of a parameter, but the `@typedef` must be declared on
the same file.
* You can use non-primitive data types such as custom classes. If sweetSanitizer finds a defined
class, it will make sure that the parameter is an instance of that class. If it doesn't, it will
simply check that it's defined (unless it's optional, of course).
* You can define an object as optional, but then all of its properties will also be forcefully 
optional.
	
	```js
	/**
     * My function
     * 
     * @param {object} [options] The function's options
     * @param {string} options.a A string <-- Will also be treated as optional!
     * @param {number} [options.b=1] A number
     */
	```
	
	If you want to make an object optional, and if passed, check that it has the correct 
    structure, use an optional `@typedef`.
* `@typedef` properties can't have default values.
* sweetSanitizer doesn't handle default values for non-object parameters. Simply handle them 
yourself by doing:

	```js
	/**
	 * My function
	 * 
	 * @param {string} [a="Hello world"] A string
	 * @param {number} [b=1] A number
	 */
	function myFunction(a = "Hello world", b = 1) {
		let error = sweetSanitizer(); // Will not assign "Hello world" to a and 1 to b.
		
		// Handle the error.
	}
	```

## License

Apache-2.0 © [Pablo Rodríguez](https://github.com/MeLlamoPablo)


[npm-image]: https://badge.fury.io/js/gulp-sweetsanitizer.svg
[npm-url]: https://npmjs.org/package/gulp-sweetsanitizer
[travis-image]: https://travis-ci.org/MeLlamoPablo/gulp-sweetsanitizer.svg?branch=master
[travis-url]: https://travis-ci.org/MeLlamoPablo/gulp-sweetsanitizer
[daviddm-image]: https://david-dm.org/MeLlamoPablo/gulp-sweetsanitizer.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/MeLlamoPablo/gulp-sweetsanitizer
[coveralls-image]: https://coveralls.io/repos/MeLlamoPablo/gulp-sweetsanitizer/badge.svg
[coveralls-url]: https://coveralls.io/r/MeLlamoPablo/gulp-sweetsanitizer
