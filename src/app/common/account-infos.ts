export interface Enterprise {
    id: number;
    title: string;
    url: string;
    logoFilename: string;
}

export interface Experience {
    id: number;
    enteprise: Enterprise | null;
    seniority: string;
    role: string;
    url: string;
    description: string;
    startAt: Date;
    endAt: Date | null;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    url: string | null;
    filename: string;
    ownerUrl: string;
}

export interface Course {
    id: number;
    title: string;
    enterprise: Enterprise | null;
    startAt: Date;
    endAt: Date;
    certification: {
        filename: string;
        url: string;
    };
}

export interface Account {
    id: number;
    fullname: string;
    socialname: string;
    age: number;
    description: string;
    filename: string;
    experiences: Experience[] | null;
    projects: Project[] | null;
    courses: Course[] | null;
}
