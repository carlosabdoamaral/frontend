import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Account } from 'src/app/common/account-infos';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, CarouselModule],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        autoWidth: true,
        autoHeight: true,
        autoplay: true,
        pullDrag: true,
        dots: false,
        navSpeed: 1200,
        navText: ['', ''],
        margin: 20,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            740: {
                items: 3,
            },
            940: {
                items: 4,
            },
        },
        nav: true,
    };

    @Input() account: Account | null = null;

    ngOnInit(): void {}
}
