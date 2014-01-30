var hookup = require('../')
;


describe('Hookup', function(done){
  
  
  var connection = {
    host: 'localhost'
  }
  , h = hookup();
  
  
  it('should fail with bad connection', function(done){
    
    this.timeout(10000);
    
    h.connect( 
      [ 'somebaddomain.local/testdb1'],
    function(err){
      err.should.be.ok;
      done()
    });
    
  })
  
  
  it('should connect to database', function(done){
    
    h.connect( connection.host+'/testdb1',
    function(err){
      err.should.not.be.ok;
      done()
    });
    
  })
  
  it('should return a database connection', function(done){
    
    h.connect( connection.host+'/testdb1',
    function(err){
      h.getConnection('testdb1').should.be.ok;
      done()
    });
    
  })
  
  
  it('should close all connections', function(done){
    
    h.connect( 
      [ connection.host+'/testdb1',
        connection.host+'/testdb2'],
    function(err){
      h.disconnectAll(function(){
        Object.keys( h.connections).length.should.equal(0);
        done()
      })
    });
    
  })
  
  
  
  it('should return an {Array} of 2 mongoose Connection objects', function(done){
    
    h.connect( 
      [ connection.host+'/testdb1',
        connection.host+'/testdb2'],
    function(err){
      
      h.connectionList().should.be
        .instanceof(Array)
        .and.have.lengthOf(2);
      
      done()
    });
    
  })
  
  
  
})