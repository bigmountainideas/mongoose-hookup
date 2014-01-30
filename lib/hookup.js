/*!
 * Module dependencies.
 */
var mongoose = require('mongoose')
;


/**
 * Hookup constructor
 *
 * @param {Object} options
 * @api public
 */
function Hookup(options){
  this.options = options;
}

/**
 * The connection pool.
 *
 * @api public
 * @property connections
 */
Hookup.prototype.connections = {};


/**
 * The connection pool as Array.
 *
 * @api public
 * @property connectionList
 * @memberOf Hookup
 */
Hookup.prototype.connectionList = function(){
  var conns = [];
  for( var i in this.connections){
    conns.push( this.connections[ i]);
  }
  return conns;
};
  


/**
 * The mongoose options.
 *
 * @api private
 * @property options
 */
Hookup.prototype.options;



/**
 * Connects to a mongo server
 *
 * @param {Array} connections
 * @param {Function} cb callback
 * @api public
 * @method connect
 * @memberOf Hookup
 */
Hookup.prototype.connect = function(connections, cb){
  connections = typeof connections=='string' ? 
                  [connections] : connections;
  var self = this
    , conncount = connections.length
  ;
  for( var i in connections){
    connect( connections[i], function(err,conn){
      if( err) conncount--;
      if( conncount==Object.keys(self.connections).length){
        cb&&cb(err);
      }
    }, this);
  }
};


/**
 * Gets a reference to a previously established database.
 *
 * @param {String} db
 * @api public
 * @method getConnection
 * @memberOf Hookup
 */
Hookup.prototype.getConnection = function(db){
  return this.connections[ db];
};


/**
 * Close a previously established database connection.
 *
 * @param {String} db
 * @param {Function} cb callback
 * @api public
 * @method disconnect
 * @memberOf Hookup
 */
Hookup.prototype.disconnect = function(db, cb){
  var self = this;
  if( Object.keys(this.connections).length){
    this.connections[ db].close(function(){
      delete self.connections[ db];
      cb&&cb(db);
    });
  }else {
    cb&&cb();}
};

/**
 * Close all previously established database connections.
 *
 * @param {Function} cb callback
 * @api public
 * @method disconnectAll
 * @memberOf Hookup
 */
Hookup.prototype.disconnectAll = function(cb){
  var conncount = Object.keys(this.connections).length;
  if( conncount){
    for( var i in this.connections){
      this.disconnect( i,function(db){
        if( --conncount==0){
          cb&&cb();}
      });
    }
  }else {
    cb&&cb();}
};


/*!
 * Connection helper.
 *
 * @param {String} uri
 * @param {Function} cb callback
 * @param {Hookup} instance of Hookup to store connections
 * @api private
 */
function connect(uri, cb, hookup){
  
  if( uri.search('mongodb://') == -1){
    uri = 'mongodb://' + uri;
  }
  var options;
  if( hookup){
    options = hookup.options;
  }
  
  var db = mongoose.createConnection(
                uri,
                options
              ) 
  ;
  
  db.on('error', function(err){
    cb&&cb(err);
  });
  
  db.once('open', function(){
    if( hookup){
      hookup.connections[ db.name] = db;
    }
    cb&&cb(false,db);
  });
  
  return db;
}



/*!
 * Module exports.
 */


/**
 * Factory method for creating Hookup instances.
 *
 * @param {Int} [timeout] milliseconds
 * @api public
 */
module.exports = function(timeout){
  
  var options = { 
        server: { 
          socketOptions: { 
            connectTimeoutMS : timeout || 5000 
          }
        }
      };
  
  return new Hookup(options);
};


module.exports.Hookup = Hookup;

module.exports.connect = connect;

