// The VT Check Salary JS
import Bouncer from 'formbouncerjs/src/js/bouncer/bouncer';
import 'debounce';
import {
  locationLookup
} from 'forms/zip-lookup';
import {
  createCookie,
  readCookie,
  eraseCookie
} from 'cookie-helpers';
import d3 from './d3-custom';

const theForm = document.getElementById('salary-form');
const theVizWrapper = document.getElementById('data-viz-wrapper');
const error = document.getElementById('error');
const success = document.getElementById('success');
const jobGroups = document.getElementById('job-group');
const jobTitles = document.getElementsByClassName('job-title');
const compareElems = document.querySelectorAll("[data-form='compare']");
const dataText = document.querySelectorAll("[data-text-compare]");
const submitBtn = document.getElementById('submit-salary');
const country = document.getElementById('country');
let formTypeRadios;

let salaryFormLoaded = false;
if (typeof theForm !== 'undefined' && theForm !== null) {
  formTypeRadios = theForm.elements['form-type'];
  salaryFormLoaded = true;
  let validate = new Bouncer('#' + theForm.id, {
    customValidations: {
      supportedCountry: function(field) {
        if (field.hasAttribute('data-country')) {
          let countryProxy = country.value;

          if (countryProxy === 'US' || countryProxy === 'CA') {
            return false;
          } else {
            return true;
          }
        }
      }
    },

    messages: {
      supportedCountry: function(field) {
        let postalMessage = field.getAttribute('data-bouncer-message');
        return postalMessage;
      }
    },

    // Form Submission
    disableSubmit: false, // If true, native form submission is suppressed even when form validates

    // Custom Events
    emitEvents: true // If true, emits custom events
  });

  // Creates Cookie for preventing multi submit on the check form
  if (theForm.getAttribute("data-cookie") === 'true') {
    window.history.pushState({}, '', '#search');
    createCookie('vt-salary-submitted', 'true', 90);
    searchForm();
  }
}

function searchForm() {
  compareElems.forEach(function(node, idx) {
    node.classList.add('hide');
  });
  dataText.forEach(function(node, idx) {
    node.innerHTML = node.getAttribute('data-text-search');
  });

  // trigger click on search form button
  document.getElementById('search-form').click();
}

// Shows or hides the form elements based on which form type is selected
function selectedForm() {
  if (typeof formTypeRadios !== 'undefined' && formTypeRadios !== null &&
    compareElems !== 'undefined' && compareElems !== null && submitBtn !== 'undefined' && submitBtn !== null) {
    for (var i = 0, max = formTypeRadios.length; i < max; i++) {
      formTypeRadios[i].onclick = function() {
        // Swap text for some elements
        dataText.forEach(function(node, idx) {
          node.innerHTML = node.getAttribute('data-text-' + formTypeRadios.value);
        });

        if (formTypeRadios.value == 'search') {
          window.history.pushState({}, '', '#search');
          submitBtn.classList.add('secondary');
          compareElems.forEach(function(node, idx) {
            node.classList.add('hide');
            node.removeAttribute('required');
          });
        } else if (formTypeRadios.value == 'compare') {
          window.history.pushState({}, '', '#compare');
          submitBtn.classList.remove('secondary');
          compareElems.forEach(function(node, idx) {
            node.classList.remove('hide');
            node.setAttribute('required', true);
          });
        }
      }
    }
  }

  // Shows only search salary form
  if (window.location.hash.indexOf("#search") > -1) {
    searchForm();
  }
}

// Swaps out the proper set of Titles for each Job Group Selected
function loadJobTitles() {
  if (typeof jobGroups !== 'undefined' && jobGroups !== null &&
    typeof jobTitles !== 'undefined' && jobTitles !== null) {
    jobGroups.addEventListener('change', () => swapJobTitles());
    if (jobGroups.selectedIndex && jobGroups.selectedIndex > 0) {
      swapJobTitles();
    }
  }
}

function swapJobTitles() {
  let selectedGroup = jobGroups.options[jobGroups.selectedIndex].value;

  if (selectedGroup && selectedGroup !== '') {
    for (let jobTitle of jobTitles) {
      if (jobTitle.dataset.jobGroup === selectedGroup) {
        jobTitle.classList.remove('hide');
        jobTitle.removeAttribute('disabled');
      } else {
        jobTitle.classList.add('hide');
        jobTitle.setAttribute('disabled', '');
      }
    }
  }
}

// Resize/reorient function
let recalculate = debounce((a, b) => {

  // destroy existing chart
  d3.select('svg').remove();

  // regenerate chart
  generateChart(a, b);

}, 200);

// This is for testing/debugging the visualization only in localhost
let testDummy = document.getElementById('dummy-submit');
if (typeof testDummy !== 'undefined' && testDummy !== null) {
  testDummy.addEventListener('click', () => {

    d3.select('svg').remove();
    let salaryData = {
      'lowpercentile': '72000',
      'median': '76000',
      'highpercentile': '99000',
      'usersalary': '111111'
    }

    const res = generateChart(salaryData);

    if (res) {
      // Add event listeners for resize and orientation change
      window.addEventListener('resize', () => recalculate(salaryData), false);

      window.addEventListener('orientationchange', () => recalculate(salaryData), false);
    }
  }, false);
}

// Shows the Data Visualization
function showDataViz() {
  if (typeof theVizWrapper !== 'undefined' && theVizWrapper) {

    // Load the salary Data
    const salaryData = getSalaryData();
    if (salaryData.title === 'error') {
      showError(salaryData.message);
      // Show the form
      theForm.classList.remove('hide');
    } else {
      // Generate the chart
      const res = generateChart(salaryData);

      if (res) {
        // Add event listeners for resize and orientation change
        window.addEventListener('resize', () => recalculate(salaryData), false);

        window.addEventListener('orientationchange', () => recalculate(salaryData), false);

      } else {
        showError("Something went wrong, please try again later…");

        // Hide the chart and show the form
        theVizWrapper.classList.add('hide');
        theForm.classList.remove('hide');
      }
    }
  }
}

// Gets the salary data from the page
function getSalaryData() {
  const low = document.getElementsByClassName('low-salary');
  const median = document.getElementsByClassName('median-salary');
  const high = document.getElementsByClassName('high-salary');
  const user = document.getElementsByClassName('user-salary');

  if (typeof low !== 'undefined' && low !== null && low.length > 0 &&
    typeof median !== 'undefined' && median !== null && median.length > 0 &&
    typeof high !== 'undefined' && high !== null && high.length > 0) {
    let userSalary = null;
    if (typeof user !== 'undefined' && user !== null && user.length > 0) {
      userSalary = Math.round(user[0].innerText);
    }

    return {
      lowpercentile: parseInt(low[0].innerHTML),
      median: parseInt(median[0].innerHTML),
      highpercentile: parseInt(high[0].innerHTML),
      usersalary: userSalary
    };
  } else {
    return {
      'title': 'error',
      'message': 'No salary data found.'
    };
  }
}

function generateChart(salaryData) {
  // Did d3 load?
  if (typeof d3 !== typeof undefined) {
    // set up svg using margin conventions
    // we'll need plenty of room on the left/right for labels
    const margin = {
      top: 63,
      right: 60,
      bottom: 50,
      left: 94
    };

    let container = d3.select('#salary-data-viz');

    // Determine the width and height based off the div on the page
    let width = parseInt(container.style('width')) - margin.left - margin.right;
    let height = parseInt(container.style('height')) - margin.top - margin.bottom;
    // console.log(`width: ${width}, height: ${height}`);

    // Some base data for the graph
    let lowpercentile = salaryData.lowpercentile;
    let highpercentile = salaryData.highpercentile;
    let median = salaryData.median;
    let salary = salaryData.usersalary;

    // Init the data
    let data = [{
      'name': '25% Earn More',
      'value': highpercentile,
      'class': 'high'
    }, {
      'name': 'Median',
      'value': median,
      'class': 'median'
    }, {
      'name': '25% Earn Less',
      'value': lowpercentile,
      'class': 'low'
    }, {
      'name': 'Your Salary',
      'value': salary,
      'class': 'yours'
    }, ];

    // If we are searching, we don't need to show `your salary`
    if (salary === null || salary === 0) {
      data.length = 3;
      // add a class name for a shorter bar graph with 3 bars
      container.attr('class', 'salary-data-viz shorter');
    } else {
      // default size bar graph with 4 bars
      container.attr('class', 'salary-data-viz');
    }

    // Sort Data
    data.sort(function(a, b) {
      return a.value - b.value;
    });

    const dollarFormatter = d3.format('$,.0f');

    // cache the graph width as variables
    let graphWidth = width + margin.left + margin.right;
    let graphHeight = height + margin.top + margin.bottom;

    let svg = container.append('svg')
      .attr('id', 'bar-chart')
      .attr('class', 'bar-chart')
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('viewBox', '-' + margin.left + ' -' + margin.top + ' ' + graphWidth + ' ' + graphHeight)
      .attr('width', graphWidth)
      .attr('height', graphHeight)
      .append('g')
      .attr('id', 'bar-chart-group')
      .attr('class', 'bar-chart-group');

    // Get the maximum value from our data
    const max = d3.max(data, function(d) {
      // ensure the returned values are numeric, otherwise d3.max can't handle it
      return parseInt(d['value']);
    });

    // find the minimum value, subtract 10k, round it off…
    const startpoint = d3.min(data, function(d) {
      return Math.round(parseInt(d['value'] - 10000) / 10000) * 10000;
    });

    // shamelessly borrowed smart ticks from @http://bl.ocks.org/tanykim/62462c396b37874ebd87
    function getSmartTicks(val) {
      //base step between nearby two ticks
      let step = Math.pow(10, val.toString().length - 1);

      //modify steps either: 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000...
      if (val / step < 5) {
        step = step / 10;
      } else if (val / step < 10) {
        step = step / 5;
      }

      //add one more step if the last tick value is the same as the max value
      //if you don't want to add, remove "+1"
      let slicesCount = Math.ceil((val + 1) / step);

      return {
        // round endpoint to the nearest 10k
        endPoint: Math.ceil(slicesCount * step / 10000) * 10000,
        count: Math.min(1, slicesCount) //show max 1 tick(s)
      };

    }

    // Get our smart ticks
    let xTicks = getSmartTicks(max);

    // Uncomment for debugging
    // console.log('min:', d3.min(data, function(d) {
    //   return parseInt(d['value']);
    // }),'\nmax:', max,'\nstartpoint:', startpoint, '\nendpoint:', xTicks.endPoint);

    // Creates the X Axis Scale
    let x = d3.scaleLinear()
      .rangeRound([0, width])
      .domain([startpoint, xTicks.endPoint]);

    // Creates the Y Axis Scale
    let y = d3.scaleBand()
      .range([height, 0])
      .domain(data.map(function(d) {
        return d.name;
      }))
      // change the height of the spacing between the bars
      .paddingOuter(0.3) // padding on the between the bars and edges of graph
      .paddingInner(0.4); // padding between bars

    // Defines the y axis styles
    let yAxis = d3.axisLeft(y)
      .scale(y);

    // Defines the X axis styles
    let xAxis = d3.axisBottom(x)
      .scale(x)
      // set suggested number of ticks, format the output
      .ticks(5, '$,.0f');

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // X Axis Labels
    svg.append('g')
      .attr('class', 'x axis')
      .call(xAxis)
      .attr('transform', 'translate(0,' + height + ')')
      .selectAll('text')
      // Rotate the labels 45°
      .attr('transform', 'translate(-10,0) rotate(-45)')
      .style('text-anchor', 'end');

    let bars = svg.selectAll('.bar')
      .data(data)
      .enter();

    // Add bars (rectangles) and animate them
    bars.append('rect')
      .attr('class', function(d) {
        return `bar ${d['class']}`;
      })
      .attr('y', function(d) {
        return y(d['name']);
      })
      .attr('height', y.bandwidth())
      // animate width (set the initial width to zero)
      .attr('width', 0)
      .transition()
      // time in ms
      .duration(1000)
      // stagger each bar by 50ms for a little variety
      .delay(function(d, i) {
        return i * 50;
      })
      // this is the width after the animation
      .attr('width', function(d) {
        return x(d['value']);
      });

    // Add bar labels
    bars.append('text')
      .attr('class', 'bar-label')
      .attr('y', function(d) {
        return y(d.name) + y.bandwidth() / 2 + 4;
      })
      .attr('x', function(d) {
        return x(d.value) + 3;
      })
      .text(function(d) {
        return dollarFormatter(d.value);
      });

    return true;
  }

  return false;
}

function showError(msg) {
  error.innerHTML = `<p>${msg}</p>`;
  error.classList.remove('hide');
}

// Bundle all the myriad components and export
export function salarySurveyInit() {
  if (salaryFormLoaded) {
    loadJobTitles();
    showDataViz();
    selectedForm();

    // Enable Zip code lookup with Places API for compare salary
    locationLookup.Application.Init();
  }
}
