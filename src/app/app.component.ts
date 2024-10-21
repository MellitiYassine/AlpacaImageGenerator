import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'AlpacaImageGenerator';
  @ViewChild('alpacaCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.generateAlpaca();
  }

  async generateAlpaca() {
    const canvasWidth = this.canvasRef.nativeElement.width;
    const canvasHeight = this.canvasRef.nativeElement.height;

    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const nose = await this.loadImage('assets/nose.png');
    const accessories = await this.loadImage('assets/accessories/headphone.png');
    const backgrounds = await this.loadImage('assets/backgrounds/blue50.png');
    const ears = await this.loadImage('assets/ears/default.png');
    const eyes = await this.loadImage('assets/eyes/default.png');
    const hair = await this.loadImage('assets/hair/default.png');
    const leg = await this.loadImage('assets/leg/default.png');
    const mouth = await this.loadImage('assets/mouth/default.png');
    const neck = await this.loadImage('assets/neck/default.png');


  this.ctx.drawImage(backgrounds, 100, 35, canvasWidth / 1.5, canvasHeight / 1.5);
  
  this.ctx.drawImage(neck, 100, 50, neck.naturalWidth / 2.2, neck.naturalHeight / 2.2);
  this.ctx.drawImage(ears, 100, 40, ears.naturalWidth/ 2.2, ears.naturalHeight/ 2.2);

  this.ctx.drawImage(hair, 90, 50, hair.naturalWidth/ 2.2, hair.naturalHeight/ 2.2);

  this.ctx.drawImage(eyes, 100, 40, eyes.naturalWidth/ 2.2, eyes.naturalHeight/ 2.2);


  this.ctx.drawImage(nose, 100, 50, nose.naturalWidth/ 2.2, nose.naturalHeight/ 2.2);

  this.ctx.drawImage(mouth, 90, 50, mouth.naturalWidth/ 2.2, mouth.naturalHeight/ 2.2);

  this.ctx.drawImage(leg, 100, 50, leg.naturalWidth/ 2.2, leg.naturalHeight/ 2.2);

  this.ctx.drawImage(accessories, 100, 50, neck.naturalWidth / 2.2, neck.naturalHeight / 2.2);



  }

  loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  }
}
