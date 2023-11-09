import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { EntryComponent } from "./entry.component";

describe("EntryComponent", () => {
    let component: EntryComponent;
    let fixture: ComponentFixture<EntryComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EntryComponent],
            imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],

        });
        fixture = TestBed.createComponent(EntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
