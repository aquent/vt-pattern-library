// Custom module for VT's salary tool D3, because using the default dist takes forever to compile
import * as array from 'd3-array';
import * as axis from 'd3-axis';
import * as format from 'd3-format';
import * as interpolate from 'd3-interpolate';
import * as path from 'd3-path';
import * as scale from 'd3-scale';
import * as selection from 'd3-selection';
import * as transition from 'd3-transition';

export default Object.assign({},
  array,
  axis,
  format,
  interpolate,
  path,
  scale,
  selection,
  transition
);
