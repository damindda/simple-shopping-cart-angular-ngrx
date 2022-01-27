import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCheckAccessLevels]'
})
export class CheckAccessLevelsDirective {

  @Input("moduleType") moduleType!: string;
  @Input("accessType") accessType!: string;


  // permissions={
  //   “userID”:”John”,
  //   “entitled”:[{
  //   “resource”:”ABC”,
  //   “create”:false,
  //   “read”:true,
  //   “delete”:false,
  //   “edit”:true
  //   },
  //   {
  //   “resource”:”PQR”,
  //   “create”:true,
  //   “read”:true,
  //   “delete”:false,
  //   “edit”:true
  //   }
  //   ]
  //   }

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.style.display = "none";
    this.checkAccess();
  }

  checkAccess() {
    // const accessControls: any = this.auth.getAccessControls();
    // const module: any = accessControls.find(access => access.module_name === this.moduleType);
    // this.elementRef.nativeElement.style.display = module[this.accessType] ? "block" : "none";


    // this.permissions.entitled.filter(res=>{
    //   if(res.resource=== this.resource){
    //   res[this.action] ? this.element.nativeElement.style.display=”block”:
    //   this.element.nativeElement.style.display=”none”
    //   }
    //   })

  }

}
