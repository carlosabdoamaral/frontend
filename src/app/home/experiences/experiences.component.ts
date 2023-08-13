import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import moment from 'moment';
import { Account, Enterprise, Experience } from 'src/app/common/account-infos';

@Component({
    selector: 'app-experiences',
    templateUrl: './experiences.component.html',
    styleUrls: ['./experiences.component.scss'],
    standalone: true,
    imports: [CommonModule, MatExpansionModule],
})
export class ExperiencesComponent implements OnInit {
    @Input() account: Account | null = null;

    ngOnInit(): void {}

    dateToString(dt: Date, format: string = 'MM/YYYY'): string {
        return moment(dt).utc(false).format(format);
    }

    getExperienceDateRangeString(e: Experience): string {
        const endMoment = moment(e.endAt).utc(false);
        const end = endMoment.isValid()
            ? endMoment
            : moment(new Date()).utc(false);

        const startMoment = moment(e.startAt).utc(false);
        const start = startMoment.isValid()
            ? startMoment
            : moment(new Date()).utc(false);

        const years = end.diff(start, 'year');
        start.add(years, 'years');

        const months = end.diff(start, 'months');
        start.add(months, 'months');

        let str = '';

        // Duration
        // if (years > 0) str = `${str}${years} anos `;
        // if (years > 0 && months > 0) str = `${str}e `;
        // if (months > 0) str = `${str}${months} meses | `;

        // Date range
        str = `${str}${this.dateToString(e.startAt)} - `;
        str = `${str}${this.dateToString(end.toDate())}`;

        return str;
    }

    getExperienceImage(e: Enterprise | null): string {
        return `../../../assets/images/${e?.img}`;
    }
}
