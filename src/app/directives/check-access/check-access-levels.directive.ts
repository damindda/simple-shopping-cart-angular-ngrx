import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCheckAccessLevels]'
})
export class CheckAccessLevelsDirective {

  @Input("moduleType") moduleType!: string;
  @Input("accessType") accessType!: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.style.display = "none";
    this.checkAccess();
  }

  checkAccess() {

  }

}
