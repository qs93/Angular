import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export class HttpsHelpers {
    constructor(private _http: Http) {

    }

    getaction_test<T>(path: string) {
        return this._http.get(path)
            .map(res => {
                return <T>res.json();
            })
            .catch(this._handleError);
    }

    private _handleError(error: Response) {
        return Observable.throw(error.text() || 'Server error');
    }
}