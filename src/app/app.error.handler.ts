import { ErrorHandler , Inject, Injectable, Injector, isDevMode, NgZone} from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(@Inject(Injector) private injector: Injector, private ngZone: NgZone) {
    //super(true);
  }

  // Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  public handleError(error: any): void {
    this.ngZone.run(() => this.toastrService.error(
      "An unexpected error has occurred.",
      "Error",
      {
        closeButton: false,
        timeOut: 5000,
        //onActivateTick: true
      }

    ));
    console.log(error)
  //   if (!isDevMode())
  //   console.log(error)
  // else
  //   throw error;
    //super.handleError(error);
  }
}
