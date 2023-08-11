import { HttpClient } from '@angular/common/http';

export class CsvService {
    accountConfigFiles: string[] = [
        'account.csv',
        'course.csv',
        'experience.csv',
        'projects.csv',
    ];

    
    readAccount() {
        const csvFilePath = `src/assets/`;

        const list = csvFilePath.split('\n');
        list.forEach((e) => {
            console.log(e);
        });
    }
}
