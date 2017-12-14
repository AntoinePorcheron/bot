module.exports = function(){
    this.rand01 = function(){ return Math.rand(); };
    this.rand = function(min, max){ return ( rand01() * ( max - min ) ) + min; };
    this.randint = function(min, max) { return Math.floor( rand(min, max) ); };
}
