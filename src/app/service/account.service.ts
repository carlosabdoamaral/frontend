import { Injectable } from '@angular/core';
import {
    Account,
    Course,
    Enterprise,
    Experience,
    Project,
} from '../common/account-infos';
import { HttpClient } from '@angular/common/http';
import config from '../../assets/config/account.json';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    c = config;
    constructor(private http: HttpClient) {}

    getAaccountInfos(): Account {
        const experiences: Experience[] = this.c.experiences.map((e) => {
            return {
                id: e.id,
                enterprise: this.getEnterpriseById(e.id_enterprise),
                seniority: e.seniority,
                role: e.role,
                url: e.url,
                description: e.description,
                startAt: new Date(e.start_at),
                endAt: new Date(e.end_at),
            } as Experience;
        });

        const projects: Project[] = this.c.projects.map((e) => {
            return {
                ...e,
            };
        });

        const courses: Course[] = this.c.courses.map((e) => {
            return {
                id: e.id,
                title: e.title,
                enterprise: this.getEnterpriseById(e.id_enterprise),
                startAt: new Date(e.start_at),
                endAt: new Date(e.end_at),
                certification: {
                    img: e.certification.img,
                    url: e.certification.url,
                },
            };
        });

        let res: Account = {
            id: this.c.id,
            fullname: this.c.name,
            socialname: this.c.social_name,
            age: this.c.age,
            description: this.c.description,
            img: this.c.img,
            experiences: experiences,
            projects: projects,
            courses: courses,
        };

        return res;
    }

    getEnterpriseById(id: number): Enterprise {
        const enterprisesFounded = this.c.enterprises.filter(
            (e) => e.id === id
        );

        return {
            id: enterprisesFounded[0].id,
            title: enterprisesFounded[0].title,
            url: enterprisesFounded[0].url,
            img: enterprisesFounded[0].img,
        };
    }
}
