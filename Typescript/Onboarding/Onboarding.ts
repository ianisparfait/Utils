import Tour from './Tour';
import { Button, Icon, SimpleDiv } from './../CreateElements';

class Intro {
  private readonly _config: Tour;
  private readonly list: NodeListOf<HTMLDivElement>;
  private readonly orderedList: HTMLDivElement[];

  private readonly iconClass: string[];
  private readonly btnClass: string[];
  private readonly prevBtnName: string;
  private readonly nextBtnName: string;

  private readonly classTourContainer: string = "tour-step-container";
  private readonly classTourVeil: string = "tour-step-veil";

  private readonly maxSteps: number;
  private readonly minSteps: number;
  private currentStep: number = 0;

  private readonly blankSpaceAround: number;

  constructor(config: Tour) {
    this._config = config;

    this.iconClass = this._config.iconClass;
    this.btnClass = this._config.btnClass;
    this.prevBtnName = this._config.prevBtnName;
    this.nextBtnName = this._config.nextBtnName;

    this.list = document.querySelectorAll(`[${this._config.dataSelector}]`);
    this.orderedList = this.order(this.list);

    this.classTourContainer;
    this.classTourVeil;

    this.maxSteps = this.list.length;
    this.minSteps = 0;
    this.currentStep = 0;

    this.blankSpaceAround = 50;
  }

  init(): void {
    this.start();
  }

  start(): void {
    this.step(this.orderedList);

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (this.currentStep < this.maxSteps - 1) {
          this.currentStep++;
          this.step(this.orderedList);
        }
      }
      if (e.key === 'ArrowLeft') {
        if (this.currentStep > 0) {
          this.currentStep--;
          this.step(this.orderedList);
        }
      }
      if (e.key === 'Escape') {
        this.currentStep = 0;
        this.stop();
      }
    });

    const close = document.querySelector('.closable') as HTMLButtonElement;
    close.addEventListener('click', () => {
      this.currentStep = 0;
      this.stop();
    });

  }

  stop(): void {
    const tour = document.querySelector(`.${this.classTourContainer}`);
    const veils = document.querySelectorAll(`.${this.classTourVeil}`);
    for (let index = 0; index < veils.length; index++) {
      veils[index].remove();
    }
    if (tour) {
      tour!.remove();
    }
  }

  step(array: HTMLDivElement[]): void {
    const prev = document.querySelector('.previousable') as HTMLButtonElement;
    const next = document.querySelector('.nextable') as HTMLButtonElement;

    const currentLeft = array[this.currentStep].getBoundingClientRect().left;
    const currentTop = array[this.currentStep].getBoundingClientRect().top;
    const currentWidth = array[this.currentStep].getBoundingClientRect().width;
    const currentHeight = array[this.currentStep].getBoundingClientRect().height;

    this.createVeil(currentLeft, currentTop, currentWidth, currentHeight);
    this.createTooltipStepElement(currentLeft, currentTop, currentHeight, currentWidth);

    if (this.currentStep === 0 && prev) prev.remove();
    else if (this.currentStep !== 0 && !prev) this.prevStep(document.querySelector(`.${this.classTourContainer}`)!);

    if (this.currentStep === array.length-1 && next) next.remove();
    else this.nextStep(document.querySelector(`.${this.classTourContainer}`)!);
  }

  createTooltipStepElement(left: number, top: number, height: number, width: number): void {
    const alreadyExists = document.querySelector(`.${this.classTourContainer}`) as HTMLDivElement;
    const marge = this.blankSpaceAround/2;
    const baseTop = top - (120 * 1.3) - marge;
    let styleObj: string = `position: absolute; left: ${left}px; top: ${baseTop}px;`;

    if (baseTop < 0) styleObj = `position: absolute; left: ${left}px; top: ${top + height + (marge * 1.5)}px;`;
    if (left < 0) styleObj = `position: absolute; left: ${0 + marge}px; top: ${baseTop}px;`;
    if ((left + width) > window.innerWidth) styleObj = `position: absolute; left: ${left - width}px; top: ${baseTop}px;`;

    if (alreadyExists) {
      alreadyExists.setAttribute('style', styleObj);
      this.replaceBodyText();
      this.updateCounter();
    } else {
      const step = document.createElement("div") as HTMLDivElement;
      step.classList.add(this.classTourContainer);
      step.setAttribute('style', styleObj);
      document.body.append(step);

      this.headerStep(step);
      this.bodyStep(step);
      this.counterStep(step);
      this.actionsStep(step);
    }
  }

  createVeil(left: number, top: number, width: number, height: number): void {
    const surplus = this.blankSpaceAround;
    const alreadyExists = document.querySelector(`.${this.classTourContainer}`) as HTMLDivElement;
    let veilTop = document.querySelectorAll(`.${this.classTourVeil}`)[0] as HTMLDivElement;
    let veilBottom = document.querySelectorAll(`.${this.classTourVeil}`)[1] as HTMLDivElement;
    let veilLeft = document.querySelectorAll(`.${this.classTourVeil}`)[2] as HTMLDivElement;
    let veilRight = document.querySelectorAll(`.${this.classTourVeil}`)[3] as HTMLDivElement;

    const styleObjTop = `width: 100vw; height: ${top - (surplus/2)}px; left: 0px; top: 0px`;
    const styleObjBottom = `width: 100vw; height: ${window.innerHeight - (top + height + (surplus/2))}px; left: 0px; bottom: 0px`;
    const styleObjLeft = `width: ${left - (surplus/2)}px; height: ${height + surplus}px; left: 0px; top: ${top - (surplus/2)}px`;
    const styleObjRight = `width: ${window.innerWidth - (left + width + (surplus/2))}px; height: ${height + surplus}px; right: 0px; top: ${top - (surplus/2)}px`;

    if (alreadyExists) {
      veilTop.setAttribute('style', styleObjTop);
      veilBottom.setAttribute('style', styleObjBottom);
      veilLeft.setAttribute('style', styleObjLeft);
      veilRight.setAttribute('style', styleObjRight);
    } else {
      veilTop = SimpleDiv([this.classTourVeil]);
      veilBottom = SimpleDiv([this.classTourVeil]);
      veilLeft = SimpleDiv([this.classTourVeil]);
      veilRight = SimpleDiv([this.classTourVeil]);

      veilTop.setAttribute('style', styleObjTop);
      veilBottom.setAttribute('style', styleObjBottom);
      veilLeft.setAttribute('style', styleObjLeft);
      veilRight.setAttribute('style', styleObjRight);

      document.body.append(veilTop);
      document.body.append(veilBottom);
      document.body.append(veilLeft);
      document.body.append(veilRight);
    }
  }

  headerStep(container: HTMLDivElement): void {
    const header = SimpleDiv(["tour-step-header"]);
    const cross = Icon(this.iconClass);

    header.append(cross);
    container.append(header);
  }

  bodyStep(container: HTMLDivElement): void {
    const body = SimpleDiv(["tour-step-body"], this.orderedList[this.currentStep].getAttribute(this._config.dataText)!);

    container.append(body);
  }

  counterStep(container: HTMLDivElement): void {
    const counter = SimpleDiv(["tour-step-counter"], `${this.currentStep+1} / ${this.maxSteps}`);

    container.append(counter);
  }

  prevStep(container: HTMLDivElement): void {
    const action = document.querySelector('.tour-step-actions') as HTMLDivElement;
    const alreadyPrev = document.querySelector('.previousable') as HTMLDivElement;
    let prev: HTMLButtonElement;

    if (!alreadyPrev) {
      prev = Button(this.btnClass, this.prevBtnName);
      prev.classList.add("previousable");
      action.insertBefore(prev, action.children[0]);
      container.append(action);

      prev.addEventListener('click', () => {
        if (this.currentStep > 0) {
          this.currentStep--;
          this.step(this.orderedList);
        }
      });
    };
  }

  nextStep(container: HTMLDivElement): void {
    const action = document.querySelector('.tour-step-actions') as HTMLDivElement;
    const alreadyNext = document.querySelector('.nextable') as HTMLDivElement;
    let next: HTMLButtonElement;

    if (!alreadyNext) {
      next = Button(this.btnClass, this.nextBtnName);
      next.classList.add("nextable");
      action.appendChild(next);
      container.append(action);

      next.addEventListener('click', () => {
        if (this.currentStep < this.maxSteps - 1) {
          this.currentStep++;
          this.step(this.orderedList);
        }
      });
    };
  }

  actionsStep(container: HTMLDivElement): void {
    const actions = document.createElement('div');
    actions.classList.add('tour-step-actions');
    container.append(actions);
  }

  replaceBodyText(): void {
    const body = document.querySelector('.tour-step-body') as HTMLDivElement;

    body.innerText = this.orderedList[this.currentStep].getAttribute(this._config.dataText)!;
  }

  updateCounter(): void {
    const counter = document.querySelector('.tour-step-counter') as HTMLDivElement;

    counter.innerText = `${this.currentStep+1} / ${this.maxSteps}`;
  }

  order(array: NodeListOf<HTMLDivElement>): HTMLDivElement[] {
    const newArray = Array.from(array);
    let orderedArray = newArray.sort((a: HTMLDivElement, b: HTMLDivElement) => parseInt(a.dataset.tour!) - parseInt(b.dataset.tour!));

    return orderedArray;
  }
}

export default Intro;
