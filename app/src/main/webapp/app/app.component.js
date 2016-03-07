System.register(['angular2/core', 'angular2/http', 'node_modules/moment/moment.js', 'rxjs/add/operator/map'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, moment_js_1;
    var firstHeaders, MyOptions, AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (moment_js_1_1) {
                moment_js_1 = moment_js_1_1;
            },
            function (_1) {}],
        execute: function() {
            firstHeaders = new http_1.Headers();
            firstHeaders.append('Content-Type', 'application/json;charset=UTF-8');
            MyOptions = (function (_super) {
                __extends(MyOptions, _super);
                function MyOptions() {
                    _super.apply(this, arguments);
                    this.headers = firstHeaders;
                }
                return MyOptions;
            })(http_1.BaseRequestOptions);
            AppComponent = (function () {
                function AppComponent(http) {
                    this.notes = {};
                    this.view = moment_js_1.default();
                    this.zoom = 'month';
                    this._viewDays = null;
                    this.http = http;
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.populate();
                };
                // Actions
                AppComponent.prototype.prev = function (number, what) {
                    this.view.subtract(number, what);
                    this.populate();
                };
                AppComponent.prototype.next = function (number, what) {
                    this.view.add(number, what);
                    this.populate();
                };
                AppComponent.prototype.populate = function () {
                    var _this = this;
                    this._viewDays = null;
                    this.http.get('/data/notes/' + this.view.year() + "/" + this.view.month())
                        .map(function (res) { return res.json(); })
                        .subscribe(function (notes) {
                        notes.forEach(function (note) {
                            _this.notes[note.year + '-' + note.month + '-' + note.day] = note.text;
                        });
                    });
                };
                // Getters
                AppComponent.prototype.getViewYear = function () {
                    return this.view.format('YYYY');
                };
                AppComponent.prototype.getViewMonth = function () {
                    return this.view.format('MMMM');
                };
                AppComponent.prototype.getDayNotes = function (day) {
                    return this.view.year() + '-' + this.view.month() + '-' + day;
                };
                AppComponent.prototype.saveNotes = function (day) {
                    var notes = this.notes[this.getDayNotes(day)];
                    this.http.put('/data/notes/' + this.view.year() + '/' + this.view.month() + '/' + day, notes).subscribe();
                };
                AppComponent.prototype.getViewDays = function () {
                    if (this._viewDays) {
                        return this._viewDays;
                    }
                    this._viewDays = [];
                    var daysInMonth = this.view.daysInMonth();
                    for (var day = 1; day <= daysInMonth; day++) {
                        var m = moment_js_1.default({
                            year: this.view.year(),
                            month: this.view.month(),
                            day: day
                        });
                        this._viewDays.push({
                            name: m.format('dddd'),
                            ordinal: m.format('Do'),
                            number: day
                        });
                    }
                    return this._viewDays;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        viewProviders: [http_1.HTTP_PROVIDERS, core_1.provide(http_1.RequestOptions, { useClass: MyOptions })],
                        templateUrl: 'app/app.component.html',
                        styleUrls: ['app/app.component.css']
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map