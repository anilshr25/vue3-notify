import mitt from "mitt";
import { SnotifyToastConfig } from '../interfaces';
import { SnotifyEvent } from '../types';
import { SnotifyStyle } from '../enums';
export class SnotifyToast {
  /**
   * Emits {SnotifyEvent}
   */
  readonly eventEmitter = mitt();

  /**
   * Holds all subscribers because we need to unsubscribe from all before toast get destroyed
   * @private
   *
   */
  private _eventsHolder: {
    event: string;
    action: (toast: any) => void;
  }[] = [];

  /**
   * Toast prompt value
   */
  value: string = '';
  /**
 * Toast validator
 */
  valid: boolean | undefined = undefined;
  /**
   *
   * @param {number|string} id
   * @param {string} title
   * @param {string} body
   * @param {SnotifyToastConfig} [config]
   */
  constructor(public id: number | string,
    public title: string,
    public body: string,
    public config: SnotifyToastConfig) {
    if (this.config.type === SnotifyStyle.prompt) {
      this.value = '';
    }
    this.on('hidden', () => {
      this._eventsHolder.forEach((o) => {
        this.eventEmitter.off(o.event, o.action);
      });
    });
  }
  /**
 * This callback is displayed as a global member.
 * @callback action
 * @param {toast} responseCode
 * @returns {void}
 */
  /**
   * Subscribe to toast events
   * @param {String<SnotifyEvent>} event
   * @param  {SnotifyToast~action} action
   * @returns {SnotifyToast}
   */
  on(event: SnotifyEvent, action: (toast: this) => void): SnotifyToast {
    this._eventsHolder.push({ event, action });
    this.eventEmitter.on(event, () => action(this));
    return this;
  }
}
