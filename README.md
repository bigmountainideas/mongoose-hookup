[![NPM version](https://badge.fury.io/js/mongoose-hookup.png)](http://badge.fury.io/js/mongoose-hookup) [![Build Status](https://secure.travis-ci.org/bigmountainideas/mongoose-hookup.png)](http://travis-ci.org/bigmountainideas/mongoose-hookup)


## Overview

Mongoose Hookup is a [Mongoose](http://www.mongoosejs.com/) connection manager.


## Installation
    $ npm install mongoose-hookup

## Usage

    var mongoosehookup = require('mongoose-hookup');
    var hookup = mongoosehookup(1000);
    
    hookup.connect('localhost/db_name',function(err,conn){
      
      if( err){
        // handle error
      }else{
        // use connection
      }
    });
    
    var conn = hookup.getConnection('db_name');
    

## License

(The MIT License)

Copyright (c) 2009-2012 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
