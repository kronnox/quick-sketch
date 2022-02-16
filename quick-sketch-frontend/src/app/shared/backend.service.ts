import { Injectable } from '@angular/core';
import {NgxDrawingCanvasComponent} from "../ngx-drawing-canvas/ngx-drawing-canvas.component";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {firstValueFrom, lastValueFrom, map, Observable, take} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public $classes: Observable<string[]>;

  constructor(private httpClient: HttpClient) {
    this.$classes = this.httpClient.get<any>("http://85.235.67.211:8000/categories", {}).pipe(map(r => r.categories));
  }

  async predictBlob(blob: Blob): Promise<number[]> {
    const formData = new FormData();
    formData.append('file', blob, 'image.png');

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const res = await firstValueFrom(this.httpClient.post<any>("http://85.235.67.211:8000/predict/image?save_image_flag=true", formData, {headers: headers}));
    return res.confidence;
  }
}
