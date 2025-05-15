import { ElementRef, Injectable } from '@angular/core';
import domToImage from 'dom-to-image';
import jsPDF from 'jspdf';
import { CvPagesApiClientService } from './cv-pages-api-client.service';
import { RequestModel } from '../models/request.model';

@Injectable()
export class ExportToPdfService {
  constructor (private apiService: CvPagesApiClientService) {
  }

  public savePDFUsingLibJsPdf(dataToExport: ElementRef | undefined): void { //TODO do this actions when get rid of this method: remove next items from file package.json: "dom-to-image": "^2.6.0", "jspdf": "^2.5.1", "@types/dom-to-image": "^2.6.7", "@types/jspdf": "^2.0.0",
    const body = document.body,
      html = document.documentElement;
    const heightDoc = Math.max( body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight );
    const width = dataToExport?.nativeElement.clientWidth === 0 ? 1100 : dataToExport?.nativeElement.clientWidth;
    const height = dataToExport?.nativeElement.clientHeight === 0 ? heightDoc : dataToExport?.nativeElement.clientHeight  + 40;
    let orientation = '';
    let imageUnit = 'pt';
    if (width > height) {
      orientation = 'l';
    } else {
      orientation = 'p';
    }
    domToImage
      .toPng(dataToExport?.nativeElement, {
        width: width,
        height: height
      })
      .then(result => {
        let jsPdfOptions = {
          orientation: orientation,
          unit: imageUnit,
          format: [width, height]
        };

        // @ts-ignore
        const pdf = new jsPDF(jsPdfOptions);
        pdf.addImage(result, 'PNG', 25, 25, width, height);
        pdf.save('file_name'+ '.pdf');
      })
      .catch(error => {
      });
  }

  public printUsingBrowserFacilities(dataToExport: ElementRef | undefined, title: string) {
    let mywindow = window.open('designed by Razhyk B.A.', 'PRINT', 'height=650,width=900,top=100,left=150');
    const copyOfNativeElem = {...dataToExport};
    this.extractStyles(copyOfNativeElem.nativeElement);
    //this.getCSS(copyOfNativeElem?.nativeElement);

    mywindow?.document.write(`<html lang="en"><head><title>${title}</title>`);
    mywindow?.document.write('</head><body >');
    mywindow?.document.write(copyOfNativeElem?.nativeElement?.innerHTML ?? '');
    mywindow?.document.write('</body></html>');

    const request = new RequestModel<string>();
    request.data = copyOfNativeElem?.nativeElement?.innerHTML;
    this.apiService.exportPdfV1(request).subscribe((res) => {
        // @ts-ignore
        const url = window.URL.createObjectURL(res.body);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      },
      error => {
        console.log(error);
      });

    mywindow?.document.close(); // necessary for IE >= 10
    mywindow?.focus(); // necessary for IE >= 10*/

    mywindow?.print();
    mywindow?.close();

    return true;
  }

  private extractStyles (element: Element) {
    if (element) {
      this.setCss(element);

      if (element.childElementCount > 0) {
        // @ts-ignore
        for (const child of element.children) {
          this.extractStyles(child);
        }
      }
      else {
        return;
      }
    }
    else {
      return;
    }
  }

  private setCss(element: Element) {
    let css_obj = getComputedStyle(element);
    //const styles: string[] = [];
    let styleStr: string = ''

    for (let i = 0; i < css_obj.length; i++) {
      styleStr += `${css_obj[i]}:${css_obj.getPropertyValue(css_obj[i])};`
      //styles.push(`${css_obj[i]}:${css_obj.getPropertyValue(css_obj[i])}`);
    }

    element.setAttribute('style', styleStr);

    // if (styles.length > 0) {
    //   styles.forEach(x => {
    //     element.
    //   });
    // }
    return;
  }
}
