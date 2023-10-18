import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-breadcrumb",
    templateUrl: "./breadcrumb.component.html",
    styleUrls: ["./breadcrumb.component.scss"]
})
export class BreadcrumbComponent {
    currentPath = "";

    constructor(public router: Router) {}

    getBreadcrumb(): string[] {
        const path = this.router.url.split("/");
        return path.filter((p) => p !== "");
    }
    hasBreadcrumb(): boolean {
        const breadcrumb = this.getBreadcrumb();
        return breadcrumb.length !== 0;
    }

    getCurrentUrl(crumb:string): string {
        this.currentPath += `/${crumb}`;
        return crumb;
    }
}
