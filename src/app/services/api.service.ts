import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";

import { environment } from "../../environments/enviroment";
import { PokeApiList } from "../models";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    @Output() loading: EventEmitter<boolean> = new EventEmitter();
    constructor(private http: HttpClient) {}

    getDashboard(count = 3) {
        const paramsRequest = {
            offset: this.randomNumber(environment.PokemonsCount - 3),
            limit: count,
        };

        return this.doCall<PokeApiList>("pokemon", paramsRequest);
    }

    private doCall<T>(path: string, paramsRequest: any) {
        this.loading.emit(true);

        const obs = this.http.get<T>(
            `${environment.ApiUrl}/${path}`,
            { params: paramsRequest }
        );

        obs.subscribe(() => {
            this.loading.emit(false);
        });

        return obs;
    }

    private randomNumber(max: number) {
        return Math.floor(Math.random() * max);
    }
}
