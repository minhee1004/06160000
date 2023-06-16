class Ball extends GameObject {
    constructor(container, src, width, height, x, y, velX, velY,ball) {
        super(container, src, width, height, x, y, velX, velY);

        this.ball=ball;

        this.falled = false;

        //container,width,height,x,y,bg
        this.leftSensor = new LeftSensor(this.container, 1, 10, this.x, this.y, "");
        this.rightSensor = new RightSensor(this.container, 1, 10, this.x + this.width, this.y, "");
        this.topSensor = new TopSensor(this.container, 10, 1, this.x, this.y, "");
        this.bottomSensor = new BottomSensor(this.container, 10, 1, this.x, this.y + this.height, "r");
    }

    hitRemoveBrick() {
        for (let i = 0; i < brickArray.length; i++) {
            let result = collisionCheck(this, brickArray[i]);
            if (result) { //충돌하면
                this.container.removeChild(brickArray[i].img); //벽돌이미지제거

                //충돌난 벽이 몇번째 들어있는지 조사
                let index = brickArray.indexOf(brickArray[i]);
                //배열에서 제거
                brickArray.splice(index, 1);

                //점수올리기
                setScore();
                break;

            }
        }
    }
    //공이 bar에 충돌되면..
    hitCheckBar() {
        let result = collisionCheck(this, bar);
        if (result) {
            //충돌이 일어나면, 공의 velY를 -1* 부호로 바꾼다
            this.velY = -this.velY;
        }

    }
    //공이 brick에 충돌되면..
    hitCheckBrick() {
        for (let i = 0; i < brickArray.length; i++) {
            let result = collisionCheck(this, brickArray[i]);
            if (result) {
                //충돌이 일어나면, 공의 velY를 -1* 부호로 바꾼다
                this.velY = -this.velY;
            }
        }
    }

    tick() {
        this.x += this.velX;
        this.y += this.velY;
        //console.log(this.x,this.y);
        if (this.x >= 500 - 15 || this.x <= 0) {
            this.velX = -this.velX;
        }
        if (this.y >= 800 - 15 || this.y <= 0) {
            this.velY = -this.velY;
        }

        this.leftSensor.tick(this);
        this.leftSensor.render();

        this.rightSensor.tick(this);
        this.rightSensor.render();

        this.topSensor.tick(this);
        this.topSensor.render();

        this.bottomSensor.tick(this);
        this.bottomSensor.render();


    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;

        this.leftSensor.tick(this);
        this.leftSensor.render();

        this.rightSensor.tick(this);
        this.rightSensor.render();

        this.topSensor.tick(this);
        this.topSensor.render();

        this.bottomSensor.tick(this);
        this.bottomSensor.render();

    }

    //오버라이딩
    render() {
        this.img.style.left = this.x + "px";
        this.img.style.top = this.y + "px";
        //console.log
        this.hitCheckBar();
        this.hitCheckBrick();
        this.hitRemoveBrick();
    

        if (this.y > 600) {
            //화면에서 제거 
            this.container.removeChild(this.img);

            //배열 몇번째 공이 들어있는지 조사
            let index = ballArray.indexOf(this);
            //배열에서 제거
            ballArray.splice(index, 1);

            //센서 4개 삭제
            this.container.removeChild(this.leftSensor.div);
            this.container.removeChild(this.rightSensor.div);
            this.container.removeChild(this.topSensor.div);
            this.container.removeChild(this.bottomSensor.div);

            
            //공 생성
            restart();

            //hp를 없애자
            if(hpArray.length > 0){
                let lndex = hpArray.length-1;
                hp.removeChild(hpArray[lndex]);
                hpArray.splice(lndex, 1);

            }else{//게임오버 이미지
                endimg.style.display="block";
                //endimg.img.style.zIndex = 99;

            }
            
            
            
        }
    }

}