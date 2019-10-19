class Minesweeper {

    constructor(blocks) {
        this.blocks = blocks || 6;
        this.bomb_at_tiles = [];
        this.neighbors = {
            top_left : null,
            top : null,
            top_right : null,
            left : null,
            right : null,
            bottom_left : null,
            bottom : null,
            bottom_right : null
        };
        self = this;
    }

    drawBoard() {
        for(var i=1; i<(this.blocks)+1; i++) {
            for(var j=1; j<(this.blocks*2)+1; j++) {
                let a = document.createElement('div');
                // let b = document.createElement('span');
                // b.setAttribute('class', 'layer');
                a.setAttribute('class', 'tile');
                a.setAttribute('data-x', `${i}`);
                a.setAttribute('data-y', `${j}`);
                a.setAttribute('id', `${i}${j}`);
                // 🔥
                // a.appendChild(b);
                // a.innerHTML = '&nbsp;';
                document.getElementById('game').appendChild(a);
                a.addEventListener('click', this.checkNeighbors);
            }
            let a = document.createElement('br');
            document.getElementById('game').append(a);
        }
    }

    placeBombs() {
        var i = 0;
        while(i < 45){
            let place = Math.floor(Math.random() * (1224 - 11 + 1)) + 11;
            if(document.getElementById(place) && this.bomb_at_tiles.indexOf(place) == -1) {
                document.getElementById(place).innerHTML = '<img class="bomb" src="assets/bomb.svg" />';
                this.bomb_at_tiles.push(place);
                i++;
            }
        }
        console.log(this.bomb_at_tiles);
    }

    checkNeighbors(ele) {
        var prev_tile, next_tile;
        var total_bombs;
        prev_tile = next_tile = null;
        total_bombs = 0;
        if(ele.target.dataset.x > 1) {
            prev_tile = parseInt(ele.target.dataset.x)-1;
        }
        if(ele.target.dataset.x < self.blocks) {
            next_tile = parseInt(ele.target.dataset.x)+1;
        }
        self.neighbors.top_left = (prev_tile) ? prev_tile.toString() + (parseInt(ele.target.dataset.y) - 1).toString() : null;
        self.neighbors.top = (prev_tile) ? prev_tile.toString() + (ele.target.dataset.y).toString() : null;
        self.neighbors.top_right = (prev_tile && ele.target.dataset.y !== self.blocks.toString()) ? prev_tile.toString() + (parseInt(ele.target.dataset.y) + 1).toString() : null;
        self.neighbors.left = (ele.target.dataset.y !== '1') ? (ele.target.dataset.x).toString() + (parseInt(ele.target.dataset.y) - 1).toString() : null;
        self.neighbors.right = (ele.target.dataset.y !== self.blocks.toString()) ? (ele.target.dataset.x).toString() + (parseInt(ele.target.dataset.y) + 1).toString() : null;
        self.neighbors.bottom_left = (next_tile && ele.target.dataset.y !== '1') ? next_tile.toString() + (parseInt(ele.target.dataset.y) - 1).toString() : null;
        self.neighbors.bottom = (next_tile) ? next_tile.toString() + (ele.target.dataset.y).toString() : null;
        self.neighbors.bottom_right = (next_tile && ele.target.dataset.y !== self.blocks.toString()) ? next_tile.toString() + (parseInt(ele.target.dataset.y) + 1).toString() : null;
        Object.keys(self.neighbors).forEach(neighbor => {
            if(self.neighbors[neighbor] && self.bomb_at_tiles.indexOf(parseInt(self.neighbors[neighbor])) > -1) {
                total_bombs += 1;
            }
        });
        ele.target.innerHTML = total_bombs;
    }
}

my_game = new Minesweeper(12);
my_game.drawBoard();
my_game.placeBombs();