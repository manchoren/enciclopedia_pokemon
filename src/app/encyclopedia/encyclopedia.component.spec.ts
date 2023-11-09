import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EncyclopediaComponent } from "./encyclopedia.component";

describe("EncyclopediaComponent", () => {
    let component: EncyclopediaComponent;
    let fixture: ComponentFixture<EncyclopediaComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EncyclopediaComponent],
            imports: [HttpClientTestingModule],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(EncyclopediaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
