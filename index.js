/**
 *  @param {} 函数自执行 iif
 */

(function() {
  function SmallBall(number) {
    const canvas = document.querySelector('.c-small__canvas')
    this.width = document.documentElement.clientWidth
    this.height = document.documentElement.clientHeight
    canvas.width = this.width
    canvas.height = this.height
    this.ctx = canvas.getContext('2d')
    this.number = number
    this.ballOption = []
    this.requestAnimationFrame = window.requestAnimationFrame
  }

  SmallBall.prototype = {
    constructor: SmallBall,
    initBall() { // 初始化所有的小球
      for (let i = 0; i <= this.number - 1; i++) {
        this.productBall()
      }
    },
    productBall() { // 生产出一个小球
      const _self = this
      const x = Math.random() * (this.width - 10)
      const y = Math.random() * (this.height - 10)
      const vx = Math.random() * 5
      const vy = Math.random() * 3
      this.ballOption.push({
        x,
        y,
        vx,
        vy,
        draw() {
          _self.ctx.beginPath()
          _self.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
          _self.ctx.closePath()
          _self.ctx.fillStyle = 'red'
          _self.ctx.fill()
        }
      })
    },
  }

  const smallBall = new SmallBall(20)
  smallBall.initBall()
  function draw() {
    smallBall.ctx.clearRect(0,0, smallBall.width, smallBall.height);
    smallBall.ballOption.forEach(val => {
      if (val.x + val.vx >= smallBall.width || val.x + val.vx <= 0) {
        val.vx = -val.vx
      }
      if (val.y + val.vy >= smallBall.height || val.y + val.vy <= 0) {
        val.vy = -val.vy
      }
      
      val.x += val.vx
      val.y += val.vy
      val.draw()
      const filterArr = smallBall.ballOption.filter(fil => fil.x !== val.x)
      filterArr.forEach(ball => {
        if (Math.abs(ball.x - val.x) <= 100 && Math.abs(ball.y - val.y) <= 100) {
          smallBall.ctx.moveTo(ball.x, ball.y)
          smallBall.ctx.lineTo(val.x, val.y)
          smallBall.ctx.strokeStyle = 'gray'
          smallBall.ctx.stroke()
        }
      })
    })
    window.requestAnimationFrame(draw)
  }

  window.requestAnimationFrame(draw)
  // setInterval(val => {
  //   draw()
  // }, 30)
})()

/**
 *  @example
 */

//  (function() {
//   const canvas = document.querySelector('.c-small__canvas')
//   var ctx = canvas.getContext('2d');
//   canvas.width = document.documentElement.clientWidth
//   canvas.height = document.documentElement.clientHeight
//   var raf;
  
//   var ball = {
//     x: 100,
//     y: 100,
//     vx: 5,
//     vy: 2,
//     radius: 25,
//     color: 'blue',
//     draw: function() {
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
//       ctx.closePath();
//       ctx.fillStyle = this.color;
//       ctx.fill();
//     }
//   };
  
//   function draw() {
//     ctx.clearRect(0,0, canvas.width, canvas.height);
//     ball.draw();
//     if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
//       ball.vy = -ball.vy;
//     }
//     if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
//       ball.vx = -ball.vx;
//     }
//     ball.x += ball.vx;
//     ball.y += ball.vy;
//     raf = window.requestAnimationFrame(draw);
//   }
  
//   // canvas.addEventListener('mouseover', function(e){
//     raf = window.requestAnimationFrame(draw);
//   // });
  
//   canvas.addEventListener('mouseout', function(e){
//     window.cancelAnimationFrame(raf);
//   });
  
//   ball.draw();
//  })()