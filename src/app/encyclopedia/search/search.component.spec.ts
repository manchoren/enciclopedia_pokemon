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
});
