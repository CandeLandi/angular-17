import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-change-detection',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleComponent, CommonModule],
  template: `
  <app-title [title]="currentFramework()" />


  <pre> {{ frameworkAsSignal() | json }} </pre>
  <pre> {{ frameworkAsProperty | json }} </pre>

  `
})
export default class ChangeDetectionComponent {

  //Esta propiedad de lectura me va a permitir saber siempre cual es el valor actual de la señal
  public currentFramework = computed(
    () => `Change detection - ${this.frameworkAsSignal().name} `
  )

  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  })
  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016,
  }

  constructor() {

    setTimeout(() => {
      this.frameworkAsSignal.update(value => {
        value.name = 'React';

        return { ...value };
      })

      console.log('Hecho')
    }, 3000)


    /*  Controlado mediante el changeDetection

        setTimeout(() => {
          this.frameworkAsProperty.name = 'React';

          console.log('Hecho')
        }, 3000) */
  }


}
