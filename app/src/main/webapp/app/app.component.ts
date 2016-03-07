import {provide, Component, OnInit} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS, BaseRequestOptions, RequestOptions} from 'angular2/http';
import moment from 'node_modules/moment/moment.js';
import 'rxjs/add/operator/map';

var firstHeaders = new Headers();
firstHeaders.append('Content-Type', 'application/json;charset=UTF-8');

class MyOptions extends BaseRequestOptions {
  headers: Headers = firstHeaders
}

@Component({
	selector: 'app',
	viewProviders: [HTTP_PROVIDERS, provide(RequestOptions, {useClass: MyOptions})],
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css']
})
export class AppComponent implements OnInit {
    public notes = {};
    public view = moment();
    public zoom = 'month';

    private _viewDays = null;

    constructor(http: Http) {
        this.http = http;
    }

    ngOnInit() {
        this.populate();
    }

    // Actions

    public prev(number, what) {
        this.view.subtract(number, what);
        this.populate();
    }

    public next(number, what) {
        this.view.add(number, what);
        this.populate();
    }

    public populate() {
        this._viewDays = null;
        this.http.get('/data/notes/' + this.view.year() + "/" + this.view.month())
                .map((res: Response) => res.json())
                .subscribe(notes => {
                    notes.forEach(note => {
                        this.notes[note.year + '-' + note.month + '-' + note.day] = note.text;
                    });
                });

    }

    // Getters

    public getViewYear() {
        return this.view.format('YYYY');
    }

    public getViewMonth() {
        return this.view.format('MMMM');
    }

    public getDayNotes(day) {
        return this.view.year() + '-' + this.view.month() + '-' + day;
    }

    public saveNotes(day) {
        var notes = this.notes[this.getDayNotes(day)];

        this.http.put('/data/notes/' + this.view.year() + '/' + this.view.month() + '/' + day, notes).subscribe();
    }

    public getViewDays() {
        if (this._viewDays) {
            return this._viewDays;
        }

        this._viewDays = [];

        var daysInMonth = this.view.daysInMonth();
        for(var day = 1; day <= daysInMonth; day++) {
            var m = moment({
                year: this.view.year(),
                month: this.view.month(),
                day: day
            })

            this._viewDays.push({
                name: m.format('dddd'),
                ordinal: m.format('Do'),
                number: day
            });
        }

        return this._viewDays;
    }
}
