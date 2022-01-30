import {Component, OnInit} from '@angular/core';
import {NgxDrawingCanvasComponent} from "../../ngx-drawing-canvas/ngx-drawing-canvas.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {take} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {BackendService} from "../../shared/backend.service";

@Component({
  selector: 'app-data-creation',
  templateUrl: './data-creation.component.html',
  styleUrls: ['./data-creation.component.scss']
})
export class DataCreationComponent implements OnInit {

  public images: string[] = [];

  private obj: string = 'obj';
  private counter: number = 0;

  public classes: string[];
  public currentPredictions: number[];
  public predictionIndex: number;

  constructor(protected backendService: BackendService) { }

  ngOnInit(): void {}

  public saveCanvas(canvas: NgxDrawingCanvasComponent): void {
    this.images.push(canvas.canvas.nativeElement.toDataURL("image/png"));
    console.log(this.images);
    this.downloadBase64Image(canvas.canvas.nativeElement.toDataURL("image/png"));

    canvas.clear();
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

  async uploadCanvas(canvas: NgxDrawingCanvasComponent) {
    const blob = await this.getBlobFromBase64Image(canvas.canvas.nativeElement.toDataURL("image/png"));

    this.classes = this.backendService.classes;
    this.currentPredictions = await this.backendService.predictBlob(blob);
    this.predictionIndex = this.currentPredictions.indexOf(Math.max.apply(null, this.currentPredictions));

    canvas.clear();
  }
}
