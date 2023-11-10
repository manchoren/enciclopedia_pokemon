import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
    ComponentFixture, TestBed
} from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of, throwError } from "rxjs";
import { Pokemon } from "src/app/models";
import { NotfoundComponent } from "src/app/notfound/notfound.component";
import { ApiService } from "src/app/services/api.service";

import { EntryComponent } from "./entry.component";

describe("EntryComponent", () => {
    let component: EntryComponent;
    let fixture: ComponentFixture<EntryComponent>;
    let apiService: ApiService;
    let router:Router;
    let route:ActivatedRoute;
    let location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EntryComponent],
            imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
                {
                    path: "poke/not-found",
                    component: NotfoundComponent,
                }, {
                    path: "poke/:pokemon",
                    component: EntryComponent
                },])],
        });
        fixture = TestBed.createComponent(EntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        apiService = TestBed.inject(ApiService);
        router = TestBed.inject(Router);
        route = TestBed.inject(ActivatedRoute);
        location = TestBed.inject(Location);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should call getPoke method with valid id and assign the response to poke variable", () => {
        // Arrange
        spyOn(route.snapshot.paramMap, "get").and.returnValue("25");
        const pokemon: Pokemon = {
            name: "Pikachu", id: 25, height: 1, weight: 1, types: [], abilities: [], stats: []
        };
        spyOn(apiService, "getPoke").and.returnValue(of(pokemon));

        // Act
        component.ngOnInit();

        // Assert
        expect(component.poke).toEqual(pokemon);
    });

    it("should throw error when getPoke method returns error with status code other than 404", () => {
        // Arrange
        spyOn(route.snapshot.paramMap, "get").and.returnValue("250000000000");
        const error = new HttpErrorResponse({ status: 500, error: "error message" });
        spyOn(apiService, "getPoke").and.returnValue(throwError(() => error));

        // Act
        component.ngOnInit();

        // Act & Assert
        expect(component.errorMessage).toBe("Http failure response for (unknown url): 500 undefined");
    });

    it("should throw error when getPoke method returns error with status code other than 404", () => {
        // Arrange
        spyOn(route.snapshot.paramMap, "get").and.returnValue("250000000000");
        const error = new HttpErrorResponse({ status: 404 });
        spyOn(apiService, "getPoke").and.returnValue(throwError(() => error));
        spyOn(router, "navigate").and.stub();

        // Act
        component.ngOnInit();

        // Act & Assert
        expect(router.navigate).toHaveBeenCalledOnceWith(["/poke", "not-found"]);
    });

    it("should go back", () => {
        spyOn(location, "back").and.stub();

        component.goBack();

        expect(location.back).toHaveBeenCalled();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
