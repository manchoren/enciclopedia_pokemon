import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, waitForAsync } from "@angular/core/testing";
import {
    Observable, of, throwError
} from "rxjs";

import { PokeApiList } from "../models";
import { ApiService } from "./api.service";

describe("ApiService", () => {
    let service: ApiService;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]

        });
        service = TestBed.inject(ApiService);
        httpClient = TestBed.inject(HttpClient);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should call 'doCall' method with 'pokemon' as path and an object with 'offset' and 'limit'", () => {
        const doCallStub = spyOn<any>(service, "doCall");

        service.getDashboard();

        expect(doCallStub).toHaveBeenCalledWith("pokemon", jasmine.objectContaining({
            offset: jasmine.any(Number),
            limit: jasmine.any(Number)
        }));
    });

    it("should return an Observable of type PokeApiList", () => {
        const result = service.getDashboard();

        expect(result).toEqual(jasmine.any(Observable));
        expect(result).toEqual(jasmine.any(Observable<PokeApiList>));
    });

    it("should set loading Subject to true before calling doCall method", () => {
        spyOn(service.loading, "next");
        const doCallStub = spyOn<any>(service, "doCall").and.callThrough();

        service.getDashboard();

        expect(service.loading.next).toHaveBeenCalledWith(true);
        expect(doCallStub).toHaveBeenCalled();
    });

    it("EDGE CASE: should handle error response from 'doCall' method", waitForAsync(() => {
        spyOn(service.loading, "next");
        spyOn<any>(httpClient, "get").and.returnValue(throwError(() => new HttpErrorResponse({})));

        service.getDashboard().subscribe({
            next: () => {},
            error: (error) => {
                expect(service.loading.next).toHaveBeenCalledWith(false);
                expect(error).toEqual(jasmine.any(HttpErrorResponse));
            }
        });
    }));

    it("should handle invalid 'count' parameter (less than or equal to zero)", () => {
        const result = service.getDashboard(0);

        expect(result).toEqual(jasmine.any(Observable));
        expect(result).toEqual(jasmine.any(Observable<HttpErrorResponse>));
    });

    it("should return an Observable of type PokeApiList when called with valid offset and limit", () => {
        // Arrange
        const offset = 0;
        const limit = 10;

        // Act
        const result = service.getPokes(offset, limit);

        // Assert
        expect(result).toBeInstanceOf(Observable);
        expect(result).toEqual(jasmine.any(Observable<PokeApiList>));
    });

    it("should call doCall method with correct parameters when called with valid offset and limit", () => {
        // Arrange
        const offset = 0;
        const limit = 10;
        spyOn(service, "doCall");

        // Act
        service.getPokes(offset, limit);

        // Assert
        expect(service.doCall).toHaveBeenCalledWith("pokemon", { offset, limit }, false);
    });

    it("EDGE CASE: should handle large offset and limit values when called with large offset and limit", () => {
        // Arrange
        const offset = 1000000;
        const limit = 1000000;
        const doCallStub = spyOn<any>(service, "doCall").and.stub();

        // Act
        service.getPokes(offset, limit);

        // Assert
        expect(doCallStub).toHaveBeenCalledWith("pokemon", { offset, limit }, false);
    });

    it("should call 'doCall' with pokemon id", () => {
        // Arrange
        const id = 1;
        spyOn<any>(service, "doCall").and.stub();

        // Act
        service.getPoke(id);

        // Assert
        expect(service.doCall).toHaveBeenCalledWith("pokemon/1", {});
    });

    it("should call 'doCall' with pokemon name", () => {
        // Arrange
        const name = "pikachu";
        spyOn<any>(service, "doCall").and.stub();

        // Act
        service.getPoke(name);

        // Assert
        expect(service.doCall).toHaveBeenCalledWith("pokemon/pikachu", {});
    });

    it("should throw an error when given an invalid id", () => {
        // Arrange
        const id = -1;

        // Act & Assert
        expect(() => service.getPoke(id)).toThrowError(Error);
    });

    it("should return an observablewhen called with valid path and paramsRequest", waitForAsync(() => {
        // Arrange
        const path = "pokemon";
        const paramsRequest = {
            offset: 0,
            limit: 3
        };
        const loadingVisible = true;
        const expectedData = { test: 1, test2: 2 };
        spyOn<any>(httpClient, "get").and.returnValue(of(expectedData));

        // Act
        const result$ = service.doCall(path, paramsRequest, loadingVisible);

        // Assert
        result$.subscribe((data) => {
            expect(data).toEqual(expectedData);
        });
    }));

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
