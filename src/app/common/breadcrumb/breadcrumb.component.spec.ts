import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BreadcrumbComponent } from "./breadcrumb.component";

describe("BreadcrumbComponent", () => {
    let component: BreadcrumbComponent;
    let fixture: ComponentFixture<BreadcrumbComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BreadcrumbComponent]
        });
        fixture = TestBed.createComponent(BreadcrumbComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should return an array of strings representing the current breadcrumb path", () => {
        const result = component.getBreadcrumb();

        expect(Array.isArray(result)).toBe(true);
        expect(result.every((item) => typeof item === "string")).toBe(true);
    });

    it("should return an empty array if the current path is empty", () => {
        spyOnProperty(component.router, "url", "get").and.returnValue("");

        const result = component.getBreadcrumb();

        expect(result.length).toBe(0);
    });

    it("should return an array with one element if the current path has only one segment", () => {
        spyOnProperty(component.router, "url", "get").and.returnValue("segment");
        const result = component.getBreadcrumb();
        expect(result.length).toBe(1);
    });

    it("should remove the fragment to the path", () => {
        const mockUrlWithFragment = "example/path#fragment";
        spyOnProperty(component.router, "url", "get").and.returnValue(mockUrlWithFragment);

        const result = component.getBreadcrumb();

        expect(result).toEqual(["example", "path"]);
    });

    it("EDGE CASE: should get an array with 1 element if the current path has 2 & the first segment is empty", () => {
        spyOnProperty(component.router, "url", "get").and.returnValue("/segment");
        const result = component.getBreadcrumb();
        expect(result.length).toBe(1);
    });

    it("EDGE CASE:should return an array with two elements if the current path has  two segment", () => {
        spyOnProperty(component.router, "url", "get").and.returnValue("segment/part");
        const result = component.getBreadcrumb();
        expect(result.length).toBe(2);
    });

    it("should return the input string parameter", () => {
        const result = component.getCurrentUrl("test");
        expect(result).toBe("test");
    });

    it("should append the input string parameter to the currentPath variable", () => {
        component.getCurrentUrl("test");
        expect(component.currentPath).toBe("/test");
    });

    it("should build an url in currentPath when is called two times", () => {
        component.getCurrentUrl("test");

        component.getCurrentUrl("test2");

        expect(component.currentPath).toBe("/test/test2");
    });

    it("EDGE CASE: should return an empty string if the input string parameter is empty", () => {
        const result = component.getCurrentUrl("");
        expect(result).toBe("");
    });

    it("EDGE CASE: should return undefined if the input string parameter is undefined", () => {
        const result = component.getCurrentUrl(undefined as any);
        expect(result).toBeUndefined();
    });

    it("should return true when there is at least more than one breadcrumb", () => {
        spyOn(component, "getBreadcrumb").and.returnValue(["home", "about"]);
        const result = component.hasBreadcrumb();
        expect(result).toBe(true);
    });

    it("should return false when there is no breadcrumb", () => {
        spyOn(component, "getBreadcrumb").and.returnValue([]);
        const result = component.hasBreadcrumb();
        expect(result).toBe(false);
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
