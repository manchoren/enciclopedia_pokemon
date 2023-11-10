import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchComponent } from "./search.component";

describe("SearchComponent", () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SearchComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should navigate to the correct route with valid input", () => {
        spyOn(component.router, "navigate");

        component.searchForm.get("search")?.setValue("123");
        component.onSubmit();

        expect(component.router.navigate).toHaveBeenCalledWith(["/poke", "123"]);
    });

    it("should handle empty input correctly", () => {
        spyOn(component.router, "navigate");

        component.searchForm.get("search")?.setValue("");
        component.onSubmit();

        expect(component.router.navigate).not.toHaveBeenCalled();
    });

    it("EDGE CASE: should handle input with leading/trailing spaces correctly", () => {
        spyOn(component.router, "navigate");

        component.searchForm.get("search")?.setValue(" 123 ");
        component.onSubmit();

        expect(component.router.navigate).not.toHaveBeenCalled();
    });

    it("EDGE CASE: should handle input with non-numeric characters correctly", () => {
        spyOn(component.router, "navigate");

        component.searchForm.get("search")?.setValue("abc");
        component.onSubmit();

        expect(component.router.navigate).not.toHaveBeenCalled();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
