import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Section } from '../../../interfaces/request/section';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProfessorProfile } from 'src/interfaces/profile/profile/professorProfile';
import { RouteDto } from '../../../interfaces/response/routeDTO';
import { Property } from '../../../interfaces/response/property';
import { TestRouteResponse } from '../../../interfaces/response/testRouteResponse';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  baseUrl: string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public getSections = (route: string) => {
    return this.http.get<Section[]>(this.createCompleteRoute(route, this.baseUrl));
  }

  public async getSectionsAdmin(route: string): Promise<Section[]> {
    const response = await this.http.get<Section[]>(this.createCompleteRoute(route, this.baseUrl)).toPromise();
    return response ? response : [];
  }

  public createSection(section: Section) {
    console.log(this.createCompleteRoute('sectionApi/add', this.baseUrl));
    return this.http.post<Section>(this.createCompleteRoute('sectionApi/add', this.baseUrl), section);
  }

  public updateSection(section: Section) {
    return this.http.put<Section>(this.createCompleteRoute('sectionApi/edit/' + section.id, this.baseUrl), section);
  }


  public deleteSection(id: number) {
    return this.http.delete(this.createCompleteRoute(`sectionApi/delete/${id}`, this.baseUrl));
  }


  public getRoutes = () => {
    return this.http.get<RouteDto[]>(this.createCompleteRoute('routeApi/routes', this.baseUrl));
  }

  public createRoute(route: RouteDto) {
    return this.http.post<RouteDto>(this.createCompleteRoute('routeApi/add', this.baseUrl), route);
  }

  public updateRoute(route: RouteDto) {
    return this.http.put<RouteDto>(this.createCompleteRoute(`routeApi/update/${route.id}`, this.baseUrl), route);
  }

  public deleteRoute(id: number) {
    return this.http.delete(this.createCompleteRoute(`routeApi/delete/${id}`, this.baseUrl));
  }


  public getPropertiesByRouteId(routeId: number): Observable<Property[]> {
    return this.http.get<Property[]>(this.createCompleteRoute(`routeApi/properties/${routeId}`, this.baseUrl));
  }

  public testRoute(routeId: number, values: any): Observable<TestRouteResponse> {
    return this.http.post<TestRouteResponse>(
      this.createCompleteRoute(`routeApi/testRoute/${routeId}`, this.baseUrl),
      values
    );
  }


  public getClaims = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, this.baseUrl));
  }
  
  public getProfessorProfile = (route: string) => {
    return this.http.get<ProfessorProfile>(this.createCompleteRoute(route, this.baseUrl));
  }

  public updateProfessorProfile = (professorProfile: ProfessorProfile) => {
    return this.http.put<Section>(this.createCompleteRoute('profileApi/edit/' + professorProfile.id, this.baseUrl), professorProfile);
  }
  
  private createCompleteRoute = (route: string, baseUrl: string) => {
    console.log(`${baseUrl}${route}`);
    return `${baseUrl}${route}`;
  }
}
