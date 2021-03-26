class Slider {
  constructor(name, value, minimum, maximum, containerWidth, updateFunc, container, checkUpdateFunc, roundPlaces) {
    this.name = name;
    this.value = value;
    this.min = minimum;
    this.max = maximum;
    this.roundPlaces = roundPlaces
    this.range = this.max - this.min;
    this.selected = false;
    this.containerWidth = containerWidth;
    this.container = container;
    this.elementHeight = (2/3)*containerWidth;
    this.updateFunc = updateFunc;
    this.checkUpdateFunc = checkUpdateFunc;
  }
  draw(containerX, elementY){
    this.containerWidth = this.container.width;
    this.elementHeight = (1/3)*this.containerWidth;
    this.value = this.checkUpdateFunc();

    if(this.selected){
      ctx.fillStyle = "rgba(230, 230, 255, 0.05)";
      ctx.fillRect(containerX-49*this.containerWidth/50, elementY, 48*this.containerWidth/50, this.elementHeight);
    }
    ctx.fillStyle = "rgba(19, 23, 26, 0.2)";
    ctx.fillRect(containerX-24*this.containerWidth/25, elementY+this.containerWidth/50,
      23*this.containerWidth/25, this.elementHeight-2*this.containerWidth/50);
    if(this.value<=this.max){
      var point = (this.value/this.range)*((3*this.containerWidth/4)+0);
    } else {
      var point = (this.max/this.range)*((3*this.containerWidth/4)+0);
    }
    ctx.lineWidth = this.containerWidth/96;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(containerX-7*this.containerWidth/8, elementY+5*this.elementHeight/8);
    ctx.lineTo(containerX-this.containerWidth/8, elementY+5*this.elementHeight/8);
    ctx.fillStyle = 'rgba(50, 50, 50, 0.5)';
    ctx.fill();
    ctx.closePath();
    ctx.stroke();


    ctx.beginPath();
    ctx.arc(containerX-7*this.containerWidth/8+point, elementY+5*this.elementHeight/8, this.containerWidth/48, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    ctx.font = canvas.width / 90 + "px Arial";
    ctx.fillStyle = 'rgba(200, 200, 255, 0.5)';
    var textOffset = -1*ctx.measureText(Math.round(this.value, this.roundPlaces)).width/2;
    ctx.fillText(Math.round(this.value, this.roundPlaces), point+textOffset+containerX-7*this.containerWidth/8, (elementY+5*this.elementHeight/8)+this.containerWidth/14);

    ctx.font = canvas.width / 60 + "px Arial";
    ctx.fillStyle = 'rgba(200, 200, 255, 0.5)';
    ctx.fillText(this.name, -1*this.containerWidth/48+containerX-7*this.containerWidth/8, elementY+this.containerWidth/8);
  }
}