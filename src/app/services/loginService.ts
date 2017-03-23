import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
export class LoginService{
    private baseUrl = 'api/login';
    constructor(private http: Http){
    }
    attemptLogin(formValues: FormGroup){
        let url = '';
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers, body: formValues });

        this.http.post(url, options)
            .map((response: Response) => {
                const user = response.json();
                if (user && user.token) {
                    localStorage.setItem('currentUser', user);
                }
            });
    }
}