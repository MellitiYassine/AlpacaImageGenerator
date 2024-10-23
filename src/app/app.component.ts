import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlpacaParts } from '../alpaca-parts.enum';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('alpacaCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  background = "assets/backgrounds/blue50.png";
  accessories = "assets/accessories/headphone.png";
  ears = "assets/ears/default.png";
  eyes = "assets/eyes/default.png";
  hair = "assets/hair/default.png";
  leg = "assets/leg/default.png";
  mouth = "assets/mouth/default.png";
  neck = "assets/neck/default.png";
  selectedAccessory: AlpacaParts = AlpacaParts.HAIR;
  partKeys = Object.keys(AlpacaParts) as Array<keyof typeof AlpacaParts>;
  styleSuggestionList: string[] = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.generateAlpaca();
    this.getAccessoriesSuggestion()
  }

  async getAccessoriesSuggestion() {
    await this.http.get('assets/assets.json')
      .toPromise().then((data: any) => {
        this.styleSuggestionList = data[this.selectedAccessory.toString().toLocaleLowerCase()];
      });
  }

  async generateAlpaca() {
    const canvasWidth = this.canvasRef.nativeElement.width;
    const canvasHeight = this.canvasRef.nativeElement.height;
    const nose = await this.loadImage('assets/nose.png');
    const accessories = await this.loadImage(this.accessories);
    const backgrounds = await this.loadImage(this.background);
    const ears = await this.loadImage(this.ears);
    const eyes = await this.loadImage(this.eyes);
    const hair = await this.loadImage(this.hair);
    const leg = await this.loadImage(this.leg);
    const mouth = await this.loadImage(this.mouth);
    const neck = await this.loadImage(this.neck);


    this.ctx.drawImage(backgrounds, 100, 35, canvasWidth / 1.5, canvasHeight / 1.5);

    this.ctx.drawImage(neck, 100, 50, neck.naturalWidth / 2.2, neck.naturalHeight / 2.2);

    this.ctx.drawImage(ears, 100, 40, ears.naturalWidth / 2.2, ears.naturalHeight / 2.2);

    this.ctx.drawImage(hair, 90, 50, hair.naturalWidth / 2.2, hair.naturalHeight / 2.2);

    this.ctx.drawImage(eyes, 100, 40, eyes.naturalWidth / 2.2, eyes.naturalHeight / 2.2);

    this.ctx.drawImage(nose, 100, 50, nose.naturalWidth / 2.2, nose.naturalHeight / 2.2);

    this.ctx.drawImage(mouth, 90, 50, mouth.naturalWidth / 2.2, mouth.naturalHeight / 2.2);

    this.ctx.drawImage(leg, 100, 50, leg.naturalWidth / 2.2, leg.naturalHeight / 2.2);

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

  onAccessorySelect(part: keyof typeof AlpacaParts) {
    this.selectedAccessory = AlpacaParts[part];
    this.getAccessoriesSuggestion()
  }

  onStyleSelect(style: string) {
    switch (this.selectedAccessory) {
      case AlpacaParts.HAIR:
        this.hair = style;
        break;

      case AlpacaParts.NECK:
        this.neck = style;
        break;

      case AlpacaParts.ACCESSORIES:
        this.accessories = style;
        break;

      case AlpacaParts.EARS:
        this.ears = style;
        break;

      case AlpacaParts.EYES:
        this.eyes = style;
        break;

      case AlpacaParts.BACKGROUNDS:
        this.background = style;
        break;

      case AlpacaParts.LEG:
        this.leg = style;
        break;

      case AlpacaParts.MOUTH:
        this.mouth = style;
        break;
    }
    this.generateAlpaca();
  }

  getAccessoryPartName(accessoryName: string): string {
    let styleName = accessoryName.toLocaleLowerCase();

    styleName = styleName.charAt(0).toUpperCase() + styleName.slice(1);

    return styleName;
  }

  getStyleNameFromPath(path: string): string {
    const filename = path.split('/').pop() || '';

    let styleName = filename.split('.')[0];

    styleName = styleName.charAt(0).toUpperCase() + styleName.slice(1);

    return styleName;
  }


  isSelectedAccessory(partName: string): boolean {
    return this.selectedAccessory.toString().toLocaleLowerCase() == partName.toString().toLocaleLowerCase();
  }

  isSelectedStyle(style: string): boolean {
    switch (this.selectedAccessory) {
      case AlpacaParts.HAIR:
        return this.hair.toLocaleLowerCase() == style.toLowerCase();

      case AlpacaParts.NECK:
        return this.neck.toLocaleLowerCase() == style.toLowerCase();

      case AlpacaParts.ACCESSORIES:
        return this.accessories.toLocaleLowerCase() == style.toLowerCase();

      case AlpacaParts.EARS:
        return this.ears.toLocaleLowerCase() == style.toLowerCase();

      case AlpacaParts.EYES:
        return this.eyes.toLocaleLowerCase() == style.toLowerCase();

      case AlpacaParts.BACKGROUNDS:
        return this.background.toLocaleLowerCase() == style.toLowerCase();

      case AlpacaParts.LEG:
        return this.leg.toLocaleLowerCase() == style.toLowerCase();

      case AlpacaParts.MOUTH:
        return this.mouth.toLocaleLowerCase() == style.toLowerCase();
    }
  }

  download(){
    let canvasImage = this.canvasRef.nativeElement.toDataURL("image/png");
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response);
        a.download = 'Alpaca' + formatDate(Date.now(),'yyyy_MM_dd_hh_mm_ss','en-US')  + '.png';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
      };
      xhr.open('GET', canvasImage); // This is to download the canvas Image
      xhr.send();
    
  }
}
