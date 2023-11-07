import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Link } from "src/app/models";

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {
    links: Link[] = [
        { title: "Inicio", url: "/" },
        { title: "Enciclopedia", url: "/poke" },
        { title: "Info", url: "/about" },
    ];

    constructor(public router: Router) {}

    skipToMain(): void {
        document.getElementById("main-content")?.focus();
    }
}
