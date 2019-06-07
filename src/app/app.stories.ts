import { storiesOf } from '@storybook/angular/dist/client/preview';
import { moduleMetadata } from '@storybook/angular';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { AppService } from './app.service';

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
        <app-root></app-root>
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
