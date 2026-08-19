// Variables
const myClasses = [
  'CPI 360',
  'CPI 310',
  'CPI 111',
  'CPI 220',
  'CSE 240',
  'CSE 301',
  'GLG 101',
  'GLG 103',
];

const movieData = {
  2019: [
    { title: 'Avengers: Endgame', revenue: 858373000 },
    { title: 'The Lion King', revenue: 543638043 },
    { title: 'Frozen II', revenue: 450439533 },
    { title: 'Toy Story 4', revenue: 434038008 },
    { title: 'Captain Marvel', revenue: 426829839 },
    { title: 'Star Wars: The Rise of Skywalker', revenue: 390706234 },
    { title: 'Spider-Man: Far From Home', revenue: 390532085 },
    { title: 'Aladdin', revenue: 355559216 },
    { title: 'Joker', revenue: 333772511 },
    { title: 'It: Chapter Two', revenue: 211593228 },
  ],
  2020: [
    { title: 'Bad Boys For Life', revenue: 204417855 },
    { title: '1917', revenue: 157901466 },
    { title: 'Sonic The Hedgehog', revenue: 146066470 },
    { title: 'Jumanji: The Next Level', revenue: 124736710 },
    { title: 'Star Wars: The Rise of Skywalker', revenue: 124496308 },
    { title: 'Birds of Prey', revenue: 84158461 },
    { title: 'Dolittle', revenue: 77047065 },
    { title: 'The Invisible Man', revenue: 64914050 },
    { title: 'The Call of the Wild', revenue: 62342368 },
    { title: 'Onward', revenue: 61555145 },
  ],
  2021: [
    { title: 'Spider-Man: No Way Home', revenue: 572984769 },
    { title: 'Shang-Chi and the Legend of the Ten Rings', revenue: 224543292 },
    { title: 'Venom: Let There be Carnage', revenue: 212609036 },
    { title: 'Black Widow', revenue: 183651655 },
    { title: 'F9: The Fast Saga', revenue: 173005945 },
    { title: 'Eternals', revenue: 164694432 },
    { title: 'No Time to Die', revenue: 160772007 },
    { title: 'A Quiet Place: Part II', revenue: 160215764 },
    { title: 'Ghostbusters: Afterlife', revenue: 122378960 },
    { title: 'Free Guy', revenue: 121626598 },
  ],
};

const colors = [
  { bg: '#ff545a', text: 'black' },
  { bg: '#48a650', text: 'black' },
  { bg: '#404438', text: 'white' },
  { bg: '#cb2f35', text: 'white' },
  { bg: '#96d64b', text: 'black' },
  { bg: '#ff545a', text: 'black' },
  { bg: '#48a650', text: 'black' },
  { bg: '#404438', text: 'white' },
  { bg: '#cb2f35', text: 'white' },
  { bg: '#96d64b', text: 'black' },
];

// Runs functions on page reload.
document.addEventListener('DOMContentLoaded', applyRandomColor);
document.addEventListener('DOMContentLoaded', loadShapes);
document.addEventListener('DOMContentLoaded', createPie);

// Only button click of id=animate-button, reload page
d3.select('#animate-button').on('click', () => {
  location.reload();
});

// Function to generate random color for part 1a
function generateRandomColor() {
  const randomRGBValue = () => Math.floor(Math.random() * 256);
  return `rgb(${randomRGBValue()}, ${randomRGBValue()}, ${randomRGBValue()})`;
}

// Implements random color change for part 1a
function applyRandomColor() {
  const part1aNameElement = d3.select('#part1a-name');
  part1aNameElement.style('color', generateRandomColor());
}

// Lists all of my classes in part 1c
const part1c = d3.select('#part1c');
myClasses.forEach((course) => {
  part1c.append('li').text(course);
});

// Function creates and animates shapes for part 2
function loadShapes() {
  // Initialize variables and select the SVG container
  const animationDuration = 5000; // Change this to adjust the animation duration
  const fadingStart = 2000; // Change this to adjust when the fading starts
  const speed = 9; // Change this to adjust the speed
  const svgContainer = d3.select('#svg-container');
  const width = parseInt(svgContainer.style('width'));
  const height = parseInt(svgContainer.style('height'));

  // Function to generate random integer
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Function to generate random color
  function getRandomColor() {
    const colors = ['#05F2F2', '#04BFBF', '#EEF1D9', '#7E100E'];
    return colors[getRandomInt(0, colors.length - 1)];
  }

  // Function to generate random circles
  function createRandomCircles(count) {
    const circles = [];
    for (let i = 0; i < count; i++) {
      circles.push({
        type: 'circle',
        x: getRandomInt(30, 470),
        y: getRandomInt(30, 470),
        r: getRandomInt(10, 55),
        color: getRandomColor(),
      });
    }
    return circles;
  }

  // Function to generate random rectangles
  function createRandomRectangles(count) {
    const rectangles = [];
    for (let i = 0; i < count; i++) {
      rectangles.push({
        type: 'rect',
        x: getRandomInt(0, 450),
        y: getRandomInt(0, 450),
        width: getRandomInt(10, 50),
        height: getRandomInt(10, 50),
        color: getRandomColor(),
      });
    }
    return rectangles;
  }

  // Define an array of random shapes, 8 circles and 8 rectangles
  const shapes = [...createRandomCircles(8), ...createRandomRectangles(8)];

  // Iterate through shape objects to initialize position and speed
  shapes.forEach((shape) => {
    shape.xSpeed = Math.random() * speed - speed / 2;
    shape.ySpeed = Math.random() * speed - speed / 2;

    if (shape.type === 'circle') {
      shape.x = Math.random() * (width - shape.r * 2) + shape.r;
      shape.y = Math.random() * (height - shape.r * 2) + shape.r;
    } else if (shape.type === 'rect') {
      shape.x = Math.random() * (width - shape.width);
      shape.y = Math.random() * (height - shape.height);
    }
  });

  // Bind data to DOM elements and create elements based on shape properties
  let shapeElements = svgContainer.selectAll('.shape').data(shapes);

  shapeElements = shapeElements
    .enter()
    .append(function (d) {
      return document.createElementNS('http://www.w3.org/2000/svg', d.type);
    })
    .classed('shape', true)
    .attr('fill', (d) => d.color)
    .attr('cx', (d) => (d.type === 'circle' ? d.x : null))
    .attr('cy', (d) => (d.type === 'circle' ? d.y : null))
    .attr('r', (d) => (d.type === 'circle' ? d.r : null))
    .attr('x', (d) => (d.type === 'rect' ? d.x : null))
    .attr('y', (d) => (d.type === 'rect' ? d.y : null))
    .attr('width', (d) => (d.type === 'rect' ? d.width : null))
    .attr('height', (d) => (d.type === 'rect' ? d.height : null));

  // Function to animate and move shapes based on their speed
  function animateShapes() {
    shapeElements.each(function (d) {
      d.x += d.xSpeed;
      d.y += d.ySpeed;

      // Bounce off walls
      if (d.type === 'circle') {
        // Center minus radius checks for collision with walls
        if (d.x < d.r || d.x > width - d.r) d.xSpeed = -d.xSpeed;
        if (d.y < d.r || d.y > height - d.r) d.ySpeed = -d.ySpeed;
        // Sides of rectangle check for collision with walls
      } else if (d.type === 'rect') {
        if (d.x < 0 || d.x > width - d.width) d.xSpeed = -d.xSpeed;
        if (d.y < 0 || d.y > height - d.height) d.ySpeed = -d.ySpeed;
      }
      // Update the position of the shape
      d3.select(this)
        .attr('cx', d.type === 'circle' ? d.x : null)
        .attr('cy', d.type === 'circle' ? d.y : null)
        .attr('x', d.type === 'rect' ? d.x : null)
        .attr('y', d.type === 'rect' ? d.y : null)
        .attr('points', d.type === 'polygon' ? d.points : null);
    });
  }

  // Run the animation loop using d3.timer
  d3.timer(function (elapsed) {
    animateShapes();
    let opacity = 1;
    if (elapsed > fadingStart) {
      opacity = 1 - (elapsed - fadingStart) / (animationDuration - fadingStart);
    }
    shapeElements.style('opacity', opacity);
    if (elapsed > animationDuration) return true;
  });
}

// Function to create a pie chart
function createPie() {
  const year = document.getElementById('yearSelection').value;
  const data = movieData[year];

  const width = 500;
  const height = 500;
  const radius = Math.min(width, height) / 2;

  const pie = d3.pie().value((d) => d.revenue)(data); // Generate the pie
  const arc = d3.arc().innerRadius(0).outerRadius(radius); // Generate the arc

  d3.select('#pie-chart-container').selectAll('*').remove(); // Clear the container

  // Create the SVG container
  const svg = d3
    .select('#pie-chart-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    // Center the pie chart
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  // Create the pie slices
  const g = svg
    .selectAll('.arc')
    .data(pie)
    .enter()
    .append('g')
    .attr('class', 'arc');

  // Add the pie slice paths
  g.append('path')
    .attr('d', arc)
    .style('fill', (d, i) => colors[i].bg);

  // Add tooltips
  g.on('mousemove', function (event, d) {
    d3.select('#tooltip')
      .style('left', event.pageX + 10 + 'px')
      .style('top', event.pageY - 20 + 'px')
      .style('opacity', 1)
      // Set the title based on the data
      .html(
        `${d.data.title.toLocaleString()} | $${d.data.revenue.toLocaleString()}`
      );
  }).on('mouseout', function () {
    d3.select('#tooltip').style('opacity', 0);
  });

  // Add angled text
  g.append('text')
    .attr('transform', (d) => {
      const c = arc.centroid(d);
      const x = c[0];
      const y = c[1];
      const hyp = Math.sqrt(x * x + y * y);
      const angle = (Math.atan2(y, x) * 180) / Math.PI;
      // Add the rotated text
      return `translate(${x}, ${y + 1}) rotate(${
        angle - 90
      }) translate(0, 15) rotate(90)`;
    })
    .style('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .style('font-size', '11px')
    .style('fill', (d, i) => colors[i].text)
    .text((d) => d.data.title);
}
