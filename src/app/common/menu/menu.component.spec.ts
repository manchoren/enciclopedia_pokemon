import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MenuComponent } from "./menu.component";

describe("MenuComponent", () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MenuComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should focus on main content element when skipToMain is called", () => {
        // WARNING!
        // we should NEVER put an spy on the browser document.
        // it will surely crash the whole test suite
        // however if is it an absolute must, we can only aply the spy
        // to an isolated part and pray a little :P
        // NOTE: putting an spy on an browser element can work, but
        // will fail later on an unrelated test.
        const getElementByIdSpy = spyOn(document, "getElementById").and.callFake(((id: string) => {
            if (id === "main-content") {
                return { focus: jasmine.createSpy() };
            }
            return null;
        }) as any);

        component.skipToMain();

        expect(getElementByIdSpy).toHaveBeenCalledWith("main-content");
        expect(getElementByIdSpy.calls.mostRecent().returnValue?.focus).toHaveBeenCalled();
    });
});
