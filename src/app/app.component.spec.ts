import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
    ComponentFixture, fakeAsync, TestBed, tick, waitForAsync
} from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Subject, Subscription } from "rxjs";

import { AppComponent } from "./app.component";
import { ApiService } from "./services/api.service";

describe("AppComponent", () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let apiService: ApiService;
    let router: Router;

    beforeEach(() => TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes([
            { path: "", component: AppComponent, },
            { path: "about", component: AppComponent, pathMatch: "full", },
        ]), HttpClientTestingModule],
        declarations: [AppComponent],
        schemas: [NO_ERRORS_SCHEMA]
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        apiService = TestBed.inject(ApiService);
        router = TestBed.inject(Router);
    });

    it("should create the app", () => {
        expect(component).toBeTruthy();
    });

    it("should subscribe to the loading observable from the api service", () => {
        spyOn(apiService.loading, "subscribe").and.returnValue(new Subscription());
        component.ngOnInit();
        expect(apiService.loading.subscribe).toHaveBeenCalled();
    });

    it("should update the loading property with the value received from the observable", waitForAsync(() => {
        const loadingSubscription = new Subject<boolean>();
        apiService.loading = loadingSubscription;

        component.ngOnInit();
        loadingSubscription.next(true);
        loadingSubscription.complete();

        expect(component.loading).toBe(true);
    }));

    it("EDGE CASE: should handle that apiService loading returning null", () => {
        const loadingSubscription = new Subject<boolean>();
        apiService.loading = loadingSubscription;

        component.ngOnInit();
        loadingSubscription.next(null as any);
        loadingSubscription.complete();

        expect(component.loading).toBe(null as any);
    });

    it("should return the same string if no \"#\" character is present", () => {
        const result = component.removeFragment("example.com");
        expect(result).toEqual("example.com");
    });

    it("should return the string up to the \"#\" character if it is present", () => {
        const result = component.removeFragment("example.com#fragment");
        expect(result).toEqual("example.com");
    });

    it("EDGE CASE: should return an empty string if input is an empty string", () => {
        const result = component.removeFragment("");
        expect(result).toEqual("");
    });

    it("EDGE CASE: should return the only the url string if \"#\" character is the last character", () => {
        const result = component.removeFragment("example.com#");
        expect(result).toEqual("example.com");
    });

    it("EDGE CASE:should return the an empty string if \"#\" character is the first character", () => {
        const result = component.removeFragment("#example.com");
        expect(result).toEqual("");
    });

    it("should return false when the current route is in root", fakeAsync(() => {
        router.navigate(["/"]);
        tick();
        fixture.detectChanges(); // Ensure any asynchronous operations are completed

        expect(component.showBreadCrumb()).toBe(false);
    }));

    it("should return true when the current route is not root", fakeAsync(() => {
        router.navigate(["about"]);
        tick();
        fixture.detectChanges(); // Ensure any asynchronous operations are completed

        expect(component.showBreadCrumb()).toBe(true);
    }));

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
