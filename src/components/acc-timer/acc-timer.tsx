import { Component, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'acc-timer',
  styleUrl: 'acc-timer.css'
})
export class AccTimer {

  @Prop() time: number = 0;

  @State() seconds: string;
  @State() minutes: string;
  @State() hours: string;

  componentWillLoad() {
    this.convertTimeToSecondMinuteHour(this.time);
  }

  @Watch("time")
  convertTimeToSecondMinuteHour(value: number) {
    const seconds = value % 60;
    const minutes = Math.floor(value / 60) % 60;
    const hours = Math.floor(value / 3600);

    this.seconds = this.str_pad_left(seconds, "0", 2);
    this.minutes = minutes >= 0 ? this.str_pad_left(minutes, "0", 2) + ":" : "";
    this.hours = hours > 0 ? this.str_pad_left(hours, "0", 2) + ":" : "";
  }

  str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }
  render() {
    return (

      <div>{this.hours + this.minutes + this.seconds}</div>
    );
  }
}