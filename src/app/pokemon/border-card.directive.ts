import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultHeight: number = 180;

  constructor(private elt: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor)
   }

   @Input('pkmnBorderCard') borderColor: string | undefined;
   @Input() pkmnBorderCard: string | undefined;

   @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.borderColor ||  this.defaultColor);

   }

   @HostListener('mouseleave') onMouseLeave(){
    this.setBorder(this.initialColor);
    
   }

  setHeight(height: number){
    this.elt.nativeElement.style.height = `${height}px`
  }

  setBorder(color: string){
    this.elt.nativeElement.style.border = `solid 4px ${color}`
  } 

}
