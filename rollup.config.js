import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

function onwarn(warning) {
  if (warning.code === 'THIS_IS_UNDEFINED')
    return;
  console.error(warning.message);
}

export default [
  {
    input: 'bin/emoji-slider.js',
    output: {
      file: 'bin/emoji-slider.min.js',
      format: 'esm'
    },
    onwarn,
    plugins: [resolve(), terser()]
  }
];