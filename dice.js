require('./random.js')();

module.exports = class Dice{
    constructor( numberOfFace ){
        this.numberOfFace = numberOfFace;
        this.current_face;
    }

    throw(){
        this.current_face = randint( 1, numberOfFace + 1 );
        return this;
    }

    get value(){
        return this.current_face;
    }
}
