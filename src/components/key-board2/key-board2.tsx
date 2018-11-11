import { Component, EventEmitter, Event  } from '@stencil/core';

@Component({
  tag: 'key-board2',
  styleUrl: 'key-board2.css',
  shadow: true
})
export class KeyBoard2 {
  @Event() keyClicked: EventEmitter;
  
  
  keyClickedHandler(value:string){
    this.keyClicked.emit(value);
  }

  render() {
    return (
      <div class="key-board">
        <div class="row">
          <div class="key" onClick={()=> this.keyClickedHandler("1")}><div>1</div></div>
          <div class="key" onClick={()=> this.keyClickedHandler("2")}><div>2</div></div>
          <div class="key" onClick={()=> this.keyClickedHandler("3")}><div>3</div></div>
          <div class="key" onClick={()=> this.keyClickedHandler("4")}><div>4</div></div>
          <div class="key" onClick={()=> this.keyClickedHandler("5")}><div>5</div></div>
          <div class="key" onClick={()=> this.keyClickedHandler("6")}><div>6</div></div>
          <div class="key" onClick={()=> this.keyClickedHandler("7")}><div>7</div></div>
          <div class="key" onClick={()=> this.keyClickedHandler("8")}><div>8</div></div>
          <div class="key" onClick={()=> this.keyClickedHandler("9")}><div>9</div></div>
        </div>
      </div>
    );
  }


}
