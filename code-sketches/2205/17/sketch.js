let bookshelf1;

//randomly generate a row of books on a bookshelf, with titles and the occasional crooked book


function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    bookshelf1 = new bookshelf(100,600,"books.txt");
    bookshelf1.addBook('Book1');
    bookshelf1.addBook('Book2');
    bookshelf1.addBook('Book3');
    bookshelf1.addBook('Book3');
    bookshelf1.addBook('Book3');
    bookshelf1.addBook('Book3');
    bookshelf1.addBook('Orb pondering for beginners');
    
    bookshelf1.print();


}
    
function draw() {
    
}


class bookshelf {
    constructor (x, y, file) {
        this.pos = createVector(x,y);
        this.file = file; //this will load in from a json file eventually
        this.books = [];
    }
    
    print() {
        let localX = 0;

        for (let i in this.books) {
            push();
            noStroke();
            
            if (i % 3 == 0) { //change this to be psuedorandom
                rotateAroundPoint(this.pos.x + localX + this.books[i].width, this.pos.y, PI/8);
            }
            
            
            fill(this.books[i].colour);
            rect( this.pos.x + localX, this.pos.y, this.books[i].width, -this.books[i].height );

            if (this.books[i].style == 0) {

                fill(color( hue(this.books[i].colour), Math.max(saturation(this.books[i].colour) - 5, 0),  Math.max(brightness(this.books[i].colour) - 20, 0) ));
                rect( this.pos.x + localX + 5, this.pos.y, 3, -this.books[i].height );
                rect( this.pos.x + localX + this.books[i].width - 8, this.pos.y, 3, -this.books[i].height );
            }
            
            
            
            
            
            
            
            push();
            fill(color( getOppositeHue(hue(this.books[i].colour)), Math.max(saturation(this.books[i].colour), 0),  Math.max(brightness(this.books[i].colour), 0) ));
            
            
            textSize( this.books[i].width /2);
            
            
            rotateAroundPoint(this.pos.x + localX + this.books[i].width * 0.8, this.pos.y, -PI/2);
            
            text(this.books[i].title, this.pos.x + localX + this.books[i].width * 0.85, this.pos.y - this.books[i].width * 0.5, this.books[i].height * 0.6, this.books[i].width * 0.6)
            //translate(-this.pos.x, -this.pos.y);
            pop();
            
            localX += this.books[i].width;
            pop();
        }
        
    }
    
    addBook(title) {
        this.books.push(new book(title));
    }
    
}


class book {
    constructor(title, style) {
        this.title = title;
        this.width = 30 + getRndInteger(1,60);
        this.height = 120 + getRndInteger(1,40);
        this.colour = getRndColour('hsb');
        this.style = getRndInteger(0,2);
    }
}