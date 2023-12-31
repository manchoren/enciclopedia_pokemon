import {
    ChangeDetectorRef, Component, OnDestroy, OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { ApiService } from "./services/api.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy, OnInit {
    title = "Enciclopedia Pokemon";
    loading = false;
    subscription: Subscription = new Subscription();

    constructor(
        public router: Router,
        private api: ApiService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.subscription = this.api.loading.subscribe((loading) => {
            this.loading = loading;
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    removeFragment(url: string): string {
        const fragmentIndex = url.indexOf("#");
        return fragmentIndex !== -1 ? url.substring(0, fragmentIndex) : url;
    }

    showBreadCrumb(): boolean {
        return this.removeFragment(this.router.url) !== "/";
    }
}
