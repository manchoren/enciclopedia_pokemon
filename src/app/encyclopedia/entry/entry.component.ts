import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Pokemon } from "src/app/models";
import { ApiService } from "src/app/services/api.service";

@Component({
    selector: "app-entry",
    templateUrl: "./entry.component.html",
    styleUrls: ["./entry.component.scss"]
})
export class EntryComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();
    poke:Pokemon | undefined;
    constructor(private api: ApiService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("pokemon");

        if (!id) {
            return;
        }

        this.subscription = this.api.getPoke(id).subscribe({
            next: (res: Pokemon) => {
                this.poke = res;
            },
            error: (error) => {
                throw error;
            }
        });
    }

    getSprite(id: number | undefined) {
        return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/"
    + `pokemon/other/home/${id}.png`;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
