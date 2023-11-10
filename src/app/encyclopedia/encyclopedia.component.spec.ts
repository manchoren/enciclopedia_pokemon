import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { of, throwError } from "rxjs";

import { PokeApiList } from "../models";
import { ApiService } from "../services/api.service";
import { EncyclopediaComponent } from "./encyclopedia.component";

const pokeResponseEmpty:PokeApiList = { results: [], count: 0 };
const pokeResponse:PokeApiList = {
    count: 3,
    results: [
        { name: "pokemon1", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "pokemon2", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        { name: "pokemon3", url: "https://pokeapi.co/api/v2/pokemon/3/" }
    ]
};
describe("EncyclopediaComponent", () => {
    let component: EncyclopediaComponent;
    let fixture: ComponentFixture<EncyclopediaComponent>;
    let apiService: ApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EncyclopediaComponent],
            imports: [HttpClientTestingModule],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(EncyclopediaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        apiService = TestBed.inject(ApiService);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should load pokemons with initial offset and limit", () => {
        // Arrange
        spyOn(component, "loadPokes");

        // Act
        component.ngOnInit();

        // Assert
        expect(component.loadPokes).toHaveBeenCalledWith(component.offset, component.limit);
    });

    it("should load pokemons from API with given offset and limit", () => {
        spyOn(component, "loadPokes").and.callThrough();

        component.loadPokes(0, 30);

        expect(component.loadPokes).toHaveBeenCalledWith(0, 30);
    });

    it("should map the results to pokemons array when api.getPokes(0, 3) returns results", () => {
        spyOn(apiService, "getPokes").and.returnValue(of(pokeResponse));

        component.loadPokes(0, 3);

        expect(component.pokemons.length).toBe(3);
        expect(component.pokemons[0].name).toBe("pokemon1");
        expect(component.pokemons[0].id).toBe(1);
        expect(component.pokemons[1].name).toBe("pokemon2");
        expect(component.pokemons[1].id).toBe(2);
        expect(component.pokemons[2].name).toBe("pokemon3");
        expect(component.pokemons[2].id).toBe(3);
    });

    it("EDGE CASE: should set an error  to \"No hay mas pokemons\" when empty results", waitForAsync(() => {
        spyOn(apiService, "getPokes").and.returnValue(of(pokeResponseEmpty));

        component.loadPokes(0, 3);

        expect(component.errorMessage).toBe("No hay mas pokemons");
    }));

    it("EDGE CASE: should set errorMessage property to error message when getDashboard method throws an error", () => {
        const error = new Error("Some error");

        spyOn(apiService, "getPokes").and.returnValue(throwError(() => error));
        component.ngOnInit();

        expect(component.errorMessage).toBe(error.message);
    });

    it("should return a string with a URL for the official artwork of a Pokemon", () => {
        const result = component.getSprite(1);

        expect(typeof result).toBe("string");
        expect(result).toContain("https://raw.githubusercontent.com/PokeAPI/"
      + "sprites/master/sprites/pokemon/other/home/1.png");
    });

    it("should return a URL with the correct base path and ID of the Pokemon", () => {
        const result = component.getSprite(25);
        expect(result).toContain("https://raw.githubusercontent.com/PokeAPI/"
      + "sprites/master/sprites/pokemon/other/home/25.png");
    });

    it("EDGE CASE: should return a string with a URL for the official artwork of a Pokemon with ID 0", () => {
        const result = component.getSprite(0);
        expect(result).toContain("https://raw.githubusercontent.com/PokeAPI/"
      + "sprites/master/sprites/pokemon/other/home/0.png");
    });

    it("should increment the offset property by the value of limit", () => {
        component.offset = 0;
        component.limit = 30;

        component.onScroll();

        expect(component.offset).toBe(30);
    });

    it("should call the loadPokes method with the updated offset and limit values", () => {
        spyOn(component, "loadPokes").and.stub();
        component.offset = 0;
        component.limit = 30;

        component.onScroll();

        expect(component.loadPokes).toHaveBeenCalledWith(30, 30);
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
