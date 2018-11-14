// imports function createComponent() defined in ../mini/component.js
import { createComponent } from '../mini';

// object constructor function for Char
export function Char(props) {
  return createComponent({
    // object containing properties passed by parent component 'rebus' in ../components/rebus.js
    props,
    /* uses the 'current', 'rebuses', 'wordIndex' and 'charIndex' property values
       passed by 'props' argument given in 'word' component to consruct the Char object */
    render({ current, rebuses, wordIndex, charIndex }) {
      const rebus = rebuses[current];
      const previousWords = rebus.words.slice(0, wordIndex).join('');
      const index = wordIndex > 0 ? previousWords.length + charIndex : charIndex;
      const value = rebus.input[index] || '';
      return `
        <input
          type="text"
          maxlength="1"
          class="word__char"
          placeholder=" "
          value="${value}"
          ${rebus.isAnswered ? 'disabled' : ''}
        >`;
    }
  });
}
