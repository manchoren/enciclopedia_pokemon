import {
    Component, OnDestroy, OnInit
} from "@angular/core";
import { Subscription } from "rxjs";

import { PokeApiList, PokemonList } from "../models";
import { ApiService } from "../services/api.service";
import { getPokemonIdFromUrl } from "../utils";

@Component({
    selector: "app-encyclopedia",
    templateUrl: "./encyclopedia.component.html",
    styleUrls: ["./encyclopedia.component.scss"]
})
export class EncyclopediaComponent implements OnInit, OnDestroy {
    pokemons:PokemonList[] = [];
    subscription: Subscription = new Subscription();
    limit = 30;
    offset = 0;

    constructor(private api: ApiService) {}

    ngOnInit(): void {
        this.loadPokes(this.offset, this.limit);
    }

    loadPokes(offset: number, limit:number): void {
        this.subscription.unsubscribe();
        this.subscription = this.api.getPokes(offset, limit).subscribe({
            next: (res: PokeApiList) => {
                if (!res.results.length) {
                    throw new Error("No hay mas pokemons");
                }
                res.results.map((pk) => this.pokemons.push({ name: pk.name, id: getPokemonIdFromUrl(pk.url) }));
            },
            error: (error) => {
                throw error;
            }
        });
    }

    onScroll(): void {
        this.offset += this.limit;
        this.loadPokes(this.offset, this.limit);
    }

    getSprite(id: number) {
        return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/"
      + `pokemon/other/home/${id}.png`;
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
