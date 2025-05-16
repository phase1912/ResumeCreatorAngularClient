import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() blocksCount: number = 4;
  @Input() percentage: number = 0;
  public blocks: string[] = [];

  constructor () {

  }

  public ngOnInit(): void {
    let positiveBlocks = this.blocksCount * this.percentage / 100;
    for (let i = 0; i < this.blocksCount; i++) {
      if (positiveBlocks > 0) {
        this.blocks.push('#1890ff');
        --positiveBlocks;
      }
      else {
        this.blocks.push('#f3f3f3')
      }
    }
    }
}
