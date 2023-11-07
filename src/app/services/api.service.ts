import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { environment } from "../../environments/enviroment";
import { PokeApiList, Pokemon } from "../models";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    loading = new Subject<boolean>();

    constructor(private http: HttpClient) {}

    getDashboard(count = 3) {
        const paramsRequest = {
            offset: this.randomNumber(environment.PokemonsCount - 3),
            limit: count,
        };

        return this.doCall<PokeApiList>("pokemon", paramsRequest);
    }

    getPokes(offset: number, limit: number) {
        const paramsRequest = {
            offset,
            limit,
        };

        return this.doCall<PokeApiList>("pokemon", paramsRequest, false);
    }

    getPoke(id: number | string) {
        return this.doCall<Pokemon>(`pokemon/${id}`, {});
    }

    private doCall<T>(path: string, paramsRequest: any, loadingVisible = true) {
        if (loadingVisible) { this.loading.next(true); }

        const obs: Observable<T> = new Observable((subscriber) => {
            this.http.get<T>(
                `${environment.ApiUrl}/${path}`,
                { params: paramsRequest }
            ).subscribe(
                {
                    next: (data:T) => {
                        this.loading.next(false);
                        subscriber.next(data);
                    },
                    error: (err: HttpErrorResponse) => {
                        this.loading.next(false);
                        subscriber.error(err);
                    }
                }
            );
        });

        return obs;
    }

    private randomNumber(max: number) {
        return Math.floor(Math.random() * max);
    }
}
