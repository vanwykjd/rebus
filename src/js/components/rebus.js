// imports function createComponent() defined in ../mini/component.js
import { createComponent } from '../mini';

/* provides access to propeties of Proxy object 'connect' constructed by
  'store' object constructor function 'connect' defined in ../mini/store.js */
import { connect } from '../store';

// imports object contructor function Word() defined in ../components/char.js
import { Word } from './word';

// object constructor function for Rebus
export function Rebus(props, ...children) {
  /* object constructor of 'connect' taking child components
  as arguments to update the initialized state values of the 'store' component */
  return connect(
    createComponent({
      // object containing properties passed by parent component 'rebus' in ../components/rebus.js
      props,
      // an array object to contain child objects of 'rebus' object
      children,
      componentDidMount() {
        const rebus = this.props.rebuses[this.props.current];
        if (rebus.isAnswered) {
          this.$parent.querySelector('.change-button--next').focus();
        } else {
          this.$element.querySelector('input').focus();
        }
      },
      componentDidUpdate() {
        const rebus = this.props.rebuses[this.props.current];
        /* If history API isn't available, we shouldn't revert to the more widely available `window.location.href`, 
        as it incurs a new HTTP request and thus results in an infinite loop (and breaks SPAs). */
        if (window.history) {
          // Adds 'rebus' query parameter to end of URL. Should be endpoint-agnostic.
          window.history.pushState('', '', `?rebus=${rebus.id}`);
        }
        if (rebus.isAnswered) {
          this.$parent.querySelector('.change-button--next').focus();
        } else {
          this.$element.querySelector('input').focus();
        }
      },
      render({ current, rebuses, animation }) {
        const rebus = rebuses[current];
        /* creates and adds child objects to its own 'children' property
        using the 'words' property value of the 'rebus' object defined,
        and passing the 'current', 'rebuses', and 'animation' property values referencing
        the 'connect' object */
        this.children = rebus.words.map((word, wordIndex) =>
          Word({ word, wordIndex, current, rebuses, charInput: props.charInput })
        );
        return `
          <div class="rebus ${rebus.isAnswered ? 'rebus--answered' : ''} animation--${animation}">
            <div class="rebus__header">
              <span>${current + 1}/${rebuses.length}</span>
            </div>
            <span class="rebus__symbols">${rebus.symbols.join(' ')}</span>
            <div class="rebus__words">
              <children>
            </div>
          </div>
        `;
      }
    })
  );
}
