// imports function createComponent() defined in ../mini/component.js
import { createComponent } from '../mini';

// imports object contructor function Char() defined in ../components/char.js
import { Char } from './char';

/* provides access to methods of Proxy object 'actions' constructed by
   'store' object constructor function 'actions' defined in ../mini/store.js */
import { actions } from '../store';

// object constructor function for Word
export function Word(props, ...children) {
  return createComponent({
    // object containing properties passed by parent component 'rebus' in ../components/rebus.js
    props,
    // an array object to contain child objects of 'word' object
    children,
    render({ word, charInput }) {
      /* creates and adds child objects to its own 'children' property
         using the 'word' and 'charIndex' values passed by 'props'
         argument given in 'rebus' component */
      this.children = word.split('').map((_, charIndex) =>
        /* uses the imported Char object constructor function to create Char child objects
           assigning property values using the 'word' and 'charInput' values
           passed by 'rebus' component */
        Char({
          charIndex,
          ...props,
          onInput: e => {
            const input = e.target.value;
            charInput(input, props.wordIndex, charIndex);

            if (/[a-zA-Z]/.test(input)) {
              const nextChild = e.target.nextElementSibling;
              if (nextChild !== null) {
                nextChild.focus();
              }
            }
          },
          onKeydown: e => {
            const key = e.key || e.keyCode;
            if (key === 'Enter' || key === 13) {
              actions.shake();
            }
            if (key === 'Backspace' || key === 8) {
              const input = e.target.value;
              const prevChild = e.target.previousElementSibling;
              if (prevChild !== null && input === '') {
                prevChild.focus();
                e.preventDefault();
              }
            }
          }
        })
      );
      return `
          <div class="word">
            <children>
          </div>
        `;
    }
  });
}
