import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesComponent } from './experiences/experiences.component';
import {
    Account,
    Course,
    Enterprise,
    Experience,
    Project,
} from '../common/account-infos';
import { HttpClient } from '@angular/common/http';
import { BannerComponent } from './banner/banner.component';
import { AccountService } from '../service/account.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, ExperiencesComponent, BannerComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    account: Account | null = null;
    enterprises: Enterprise[] = [];

    constructor(private accountService: AccountService) {
        this.account = this.accountService.getAaccountInfos();
    }

    resolveFilepath(filename: string, extension: string = '.csv'): string {
        return `assets/account-config/${filename}${extension}`;
    }
}
