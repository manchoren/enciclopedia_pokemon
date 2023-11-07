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
        const filteredPath = path.filter((p) => p !== "");

        // Remove fragment from the last element
        const lastElement = filteredPath.pop();
        const fragmentIndex = lastElement?.indexOf("#");

        if (lastElement && fragmentIndex !== undefined && fragmentIndex > -1) {
            filteredPath.push(lastElement.substring(0, fragmentIndex));
        } else if (lastElement) {
            filteredPath.push(lastElement);
        }

        return filteredPath.filter((p) => p !== "");
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
