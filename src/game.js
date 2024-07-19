export default class Game {
    score = 0; 
    lines = 0; 
    level = 0;
    playfield = this.createPlayfield();
    activePiece = {
        x : 0,
        y : 0,
        get blocks() {
            return this.rotations[this.rotaionIndex];
        }, 
        blocks: [
                [0,1,0],
                [1,1,1],
                [0,0,0]
            ]
    };

    getState() {
        const playfield = this.createPlayfield();
        const { y: pieceY, x: pieceX, blocks } = this.activePiece

        for (let y = 0; y < playfield.length; y++) {
            playfield[y] = [];
            
            for (let x = 0; x < this.playfield[y].length; x++) {
                playfield[y][x] = this.playfield[y][x];
            }
        }

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    playfield[pieceY + y][pieceX + x] = blocks[y][x];
                }
            }
        }

        return {
            playfield
        };
    }

    createPlayfield() {
        const playfield = [];

        for (let y = 0; y < 20; y++) {
            playfield[y] = [];
            
            for (let x = 0; x < 10; x++) {
                playfield[y][x] = 0;
            }
        }
        return playfield;
    }

    movePieceLeft() {
        this.activePiece.x += -1; 

        if (this.hasCollision()) {
            this.activePiece.x += 1;
        }
    }
    movePieceRight() {
        this.activePiece.x += 1; 

        if (this.hasCollision()) {
            this.activePiece.x -= 1;
        }
    }
    movePieceDown() {
        this.activePiece.y += 1; 

        if (this.hasCollision()) {
            this.activePiece.y -= 1;
            this.lockPiece();
        }
    }

    rotatePiece() {
        this.rotateBlocks(); 
        if (this.hasCollision()) {
            this.rotateBlocks(false);
        }
        // Second variable for rotate figure 
        // const temp = []; 
        // for (let i = 0; i < length; i++) {
        //     temp[i] = new Array(length).fill(0);
        // }

        // for (let y = 0; y < length; y++) {
        //     for (let x = 0; x < length; x++) {
        //         temp[x][y] = blocks[length - 1 - y][x];
        //     }
        // }
        // this.activePiece.blocks = temp;

        // if (this.hasCollision()) {
        //     this.activePiece.blocks = blocks;
        // }
    }

    rotateBlocks(clockwise = true) {
        const blocks = this.activePiece.blocks;
        const length = blocks.length

        const x = Math.floor(length / 2); 
        const y = length - 1;

        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                    const temp = blocks[i][j];

                   if (clockwise) {
                    blocks[i][j] = blocks[y - j][i];
                    blocks[y - j][i] = blocks[y - i][y - j];
                    blocks[y - i][y - j] = blocks[j][y - i]
                    blocks[j][y - i] = temp;
                   } else {
                    blocks[i][j] = blocks[j][y - i];
                    blocks[j][y - i] = blocks[y - i][y - j];
                    blocks[y - i][y - j] = blocks[j][i]
                    blocks[y - j][i] = temp;
                   }
                }
             }
    }
    
    hasCollision() {
        const { y: pieceY, x : pieceX, blocks } = this.activePiece;

        for (let  y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (
                    blocks[y][x] && 
                    ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) ||
                    this.playfield[pieceY + y][pieceX + x])
                ) {
                    return true;
                }  
            }
        }

        return false;
    }

    lockPiece() {
        const { y: pieceY, x : pieceX, blocks } = this.activePiece;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
                }
            }
        }
    }
}