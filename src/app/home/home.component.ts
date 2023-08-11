import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesComponent } from './experiences/experiences.component';
import { Account, Course, Experience, Project } from '../common/account-infos';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, ExperiencesComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    account: Account | null = null;
    accountConfigFiles: string[] = [
        'account',
        'course',
        'experiences',
        'projects',
    ];

    constructor(private http: HttpClient) {
        this.getAccountInfos().then((res) => {
            this.account = res;
        });
    }

    resolveFilepath(filename: string, extension: string = '.csv'): string {
        return `assets/account-config/${filename}${extension}`;
    }

    async getProjectsInfos(): Promise<Project[]> {
        let res: Project[] = [];

        await this.http
            .get(this.resolveFilepath(this.accountConfigFiles[3]), {
                responseType: 'text',
            })
            .forEach((e) => {
                let rows = e.split('\n');
                rows.forEach((row, index) => {
                    if (index === 0) return;

                    let cols = row.split(';');
                    res.push({
                        id: parseInt(cols[0]),
                        title: cols[1],
                        description: cols[2],
                        url: cols[3],
                        filename: cols[4],
                        ownerUrl: cols[5],
                    });
                });
            });

        return res;
    }

    async getExperiencesInfos(): Promise<Experience[]> {
        let res: Experience[] = [];

        await this.http
            .get(this.resolveFilepath(this.accountConfigFiles[2]), {
                responseType: 'text',
            })
            .forEach((e) => {
                let rows = e.split('\n');
                rows.forEach((row, index) => {
                    if (index === 0) return;

                    let cols = row.split(';');
                    res.push({
                        id: parseInt(cols[0]),
                        enteprise: null,
                        seniority: cols[2],
                        role: cols[3],
                        url: cols[4],
                        description: cols[5],
                        startAt: new Date(cols[6]),
                        endAt: new Date(cols[7]),
                    });
                });
            });

        return res.sort((a, b) => b.id - a.id);
    }

    async getCoursesInfos(): Promise<Course[]> {
        let res: Course[] = [];

        await this.http
            .get(this.resolveFilepath(this.accountConfigFiles[1]), {
                responseType: 'text',
            })
            .forEach((e) => {
                let rows = e.split('\n');
                rows.forEach((row, index) => {
                    if (index === 0) return;

                    let cols = row.split(';');
                    res.push({
                        id: parseInt(cols[0]),
                        title: cols[1],
                        enterprise: null,
                        startAt: new Date(cols[3]),
                        endAt: new Date(cols[4]),
                        certification: {
                            filename: cols[5],
                            url: cols[6],
                        },
                    });
                });
            });
        return res;
    }

    async getAccountInfos(): Promise<Account | null> {
        let acct: Account | null = null;
        let courses: Course[] = await this.getCoursesInfos().then((res) => res);
        let experiences: Experience[] = await this.getExperiencesInfos().then(
            (res) => res
        );
        let projects: Project[] = await this.getProjectsInfos().then(
            (res) => res
        );

        await this.http
            .get(this.resolveFilepath(this.accountConfigFiles[0]), {
                responseType: 'text',
            })
            .forEach((e) => {
                let row = e.split('\n')[1].split(';');
                acct = {
                    id: parseInt(row[0]),
                    fullname: row[1],
                    socialname: row[2],
                    age: parseInt(row[3]),
                    description: row[4],
                    filename: row[5],
                    experiences: experiences,
                    projects: projects,
                    courses: courses,
                };
            });

        return acct;
    }
}
