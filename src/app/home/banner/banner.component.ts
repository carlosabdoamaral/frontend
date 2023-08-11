import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Account } from 'src/app/common/account-infos';

@Component({
    selector: 'app-banner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
    @Input() account: Account | null = null;
    ngOnInit(): void {}
}
