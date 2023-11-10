import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { of, throwError } from "rxjs";

import { PokeApiList } from "../models";
import { ApiService } from "../services/api.service";
import { DashboardComponent } from "./dashboard.component";

const pokeResponseEmpty:PokeApiList = { results: [], count: 0 };
const pokeResponse:PokeApiList = {
    count: 3,
    results: [
        { name: "pokemon1", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "pokemon2", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        { name: "pokemon3", url: "https://pokeapi.co/api/v2/pokemon/3/" },
        { name: "pokewrong", url: "https://pokeapi.co/api/v2/pokemon//" }
    ]
};

describe("DashboardComponent", () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let apiService: ApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports: [HttpClientTestingModule]
        });
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        apiService = TestBed.inject(ApiService);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should call api.getDashboard(3) method", () => {
        spyOn(apiService, "getDashboard").and.returnValue(of(pokeResponse));

        component.ngOnInit();

        expect(apiService.getDashboard).toHaveBeenCalledWith(3);
    });

    it("should map the results to pokemonsOfTheDay array when api.getDashboard(3) returns results", () => {
        spyOn(apiService, "getDashboard").and.returnValue(of(pokeResponse));

        component.ngOnInit();

        expect(component.pokemonsOfTheDay.length).toBe(4);
        expect(component.pokemonsOfTheDay[0].name).toBe("pokemon1");
        expect(component.pokemonsOfTheDay[0].id).toBe(1);
        expect(component.pokemonsOfTheDay[1].name).toBe("pokemon2");
        expect(component.pokemonsOfTheDay[1].id).toBe(2);
        expect(component.pokemonsOfTheDay[2].name).toBe("pokemon3");
        expect(component.pokemonsOfTheDay[2].id).toBe(3);
        expect(component.pokemonsOfTheDay[3].name).toBe("pokewrong");
        expect(component.pokemonsOfTheDay[3].id).toBe(-1);
    });

    it("EDGE CASE: should set an error  to \"No hay mas pokemons\" when empty results", waitForAsync(() => {
        spyOn(apiService, "getDashboard").and.returnValue(of(pokeResponseEmpty));

        component.ngOnInit();

        expect(component.errorMessage).toBe("No hay mas pokemons");
    }));

    it("should set errorMessage property to error message when getDashboard method throws an error", () => {
        const error = new Error("Some error");

        spyOn(apiService, "getDashboard").and.returnValue(throwError(() => error));
        component.ngOnInit();

        expect(component.errorMessage).toBe(error.message);
    });

    it("should return a string with a URL for the official artwork of a Pokemon", () => {
        const result = component.getOfficialArtwork(1);

        expect(typeof result).toBe("string");
        expect(result).toContain("https://raw.githubusercontent.com/PokeAPI/"
        + "sprites/master/sprites/pokemon/other/official-artwork/1.png");
    });

    it("should return a URL with the correct base path and ID of the Pokemon", () => {
        const result = component.getOfficialArtwork(25);
        expect(result).toContain("https://raw.githubusercontent.com/PokeAPI/"
        + "sprites/master/sprites/pokemon/other/official-artwork/25.png");
    });

    it("EDGE CASE: should return a string with a URL for the official artwork of a Pokemon with ID 0", () => {
        const result = component.getOfficialArtwork(0);
        expect(result).toContain("https://raw.githubusercontent.com/PokeAPI/"
        + "sprites/master/sprites/pokemon/other/official-artwork/0.png");
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
