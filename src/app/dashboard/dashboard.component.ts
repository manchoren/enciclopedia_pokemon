import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { PokeApiList, PokemonList } from "../models";
import { ApiService } from "../services/api.service";
import { getPokemonIdFromUrl } from "../utils";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
    pokemonsOfTheDay:PokemonList[] = [];
    subscription: Subscription = new Subscription();

    constructor(private api: ApiService) {}

    ngOnInit(): void {
        this.subscription = this.api.getDashboard(3).subscribe({
            next: (res: PokeApiList) => {
                if (!res.results.length) {
                    throw new Error("No hay mas pokemons");
                }
                res.results.map((pk) => this.pokemonsOfTheDay.push({ name: pk.name, id: getPokemonIdFromUrl(pk.url) }));
            },
            error: (error) => {
                throw error;
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getOfficialArtwork(id: number) {
        return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/"
        + `pokemon/other/official-artwork/${id}.png`;
    }
}
