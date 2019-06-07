import { storiesOf } from '@storybook/angular/dist/client/preview';
import { moduleMetadata } from '@storybook/angular';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isActive() {
    return false;
  }
}


@Component({
  selector: 'app-root',
  template: `
    Service active: {{ appService.isActive() }}
  `,
})
export class AppComponent {
  constructor(public appService: AppService) {}
}


storiesOf('app', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        AppComponent
      ]
    })
  )
  .add('showcase', () => {
    const isActive = boolean('isActive', true);

    return {
      template: `
        <app-root></app-root><br>
        Prop active: {{ isActive }}
      `,
      props: {
        isActive
      },
      moduleMetadata: {
        providers: [
          {
            provide: AppService,
            useValue: {
              isActive() {
                return isActive;
              }
            }
          }
        ]
      }
    };
  });
