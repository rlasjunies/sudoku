import { Component, Event, h, Prop } from '@stencil/core';
import { EventEmitter } from 'events';


@Component({
  tag: 'app-header-back',
  styleUrl: 'app-header-back.css'
})
export class AppHeaderBack {
  @Event() backClick: EventEmitter
  @Prop() title_: string;

  onBackClickHandler() {
    this.backClick.emit("");
  }

  render() {
    return (
      [
        <ion-header>
          <ion-toolbar>
            <ion-title>{this.title_}</ion-title>
            <ion-buttons slot="start">
              <ion-button onClick={() => this.onBackClickHandler()}>
                <ion-icon name="arrow-back"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>]
    );
  }
}