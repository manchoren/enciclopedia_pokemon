import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent {
    searchForm = new FormGroup({
        search: new FormControl("", [
            Validators.required,
            Validators.pattern("^[0-9]*$"),

        ]),
    });

    constructor(public router: Router) {}

    onSubmit() {
        this.router.navigate(["/poke", this.searchForm.get("search")?.value]);
    }
}
