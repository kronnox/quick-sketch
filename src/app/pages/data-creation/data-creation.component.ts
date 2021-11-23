import {Component, OnInit} from '@angular/core';
import {NgxDrawingCanvasComponent} from "../../ngx-drawing-canvas/ngx-drawing-canvas.component";

@Component({
  selector: 'app-data-creation',
  templateUrl: './data-creation.component.html',
  styleUrls: ['./data-creation.component.scss']
})
export class DataCreationComponent implements OnInit {

  public images: string[] = [];

  private obj: string = 'obj';
  private counter: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public saveCanvas(canvas: NgxDrawingCanvasComponent): void {
    this.images.push(canvas.canvas.nativeElement.toDataURL("image/png"));
    console.log(this.images);
    this.downloadBase64Image(canvas.canvas.nativeElement.toDataURL("image/png"));
  }

  async getBlobFromBase64Image(base64Data: string) {
    const base64Response = await fetch(base64Data);
    const blob = await base64Response.blob();
    return blob;
  }

  async downloadBase64Image(image: string) {
    let fileName = Date.now()+ '.png';
    this.counter++;
    const blob = await this.getBlobFromBase64Image(image);
    console.log(blob)
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.setAttribute("visibility", "hidden");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }
}
