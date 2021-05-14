import shamrock from 'assets/img/teampeek/shamrock.png';
import train from 'assets/img/teampeek/train.png';
import eagle from 'assets/img/teampeek/eagle.png';
import brave from 'assets/img/teampeek/brave.jpg';

export const teamPeekData = [
  {
    id: 1,
    image: shamrock,
    title: 'Shamrock',
    description: 'We’re currently looking for stakers to join the pool and help us reach our goal of 10 million ada active stake.',
    poolid: 'be7e2461a584b6532c972edca711fa466d7d0e8a86b6629fc0784ff6',
  },
  // {
  //   id: 2,
  //   image: train,
  //   title: 'Train',
  //   description: 'Bare metal stake pool established august 2020',
  //   poolid: '99541bed40b1015a1d81083184973b59a3f50bce4392492e99ff0bef',
  // },
  {
    id: 2,
    image: eagle,
    title: 'Eagle',
    description: 'Cloud based pool operating out of va, usa (single pool operator). Portion of proceeds go to charity fighting hunger, supporting education, and providing medicine in africa.',
    poolid: '2cdc5cef88f1c15e19c33fd8f47d9bd89c3d7ee4fa09512fbd44a126',
  },
  {
    id: 3,
    image: brave,
    title: 'Brave',
    description: 'At braveheartstakepool we are committed in providing the cardano community with financial. We will strive to provide quality reliably service 24/7 & aim to maximise your return on stake. Braveheartstakepool ‘brave’.',
    poolid: 'c7013e0a9e0f04a0363998cac5db01f08aa466b755a1a91c42b4c4b3',
  },
];




export const todosData = [
  { id: 1, title: 'task -1', done: true },
  { id: 2, title: 'task -2', done: false },
  { id: 3, title: 'task -3', done: true },
  { id: 4, title: 'task -4', done: true },
  { id: 5, title: 'task -5', done: false },
];

export const chartjs = {
  bar: {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Expense for this year',
          backgroundColor: '#6a82fb',
          stack: 'Expense',
          data: [10000, 30000, 50000, 80000, 60000, 20000, 10000],
        },
        {
          label: 'Expense for last year',
          backgroundColor: '#fc5c7d',
          stack: 'Expense',
          data: [30000, 80000, 50000, 100000, 60000, 40000, 90000],
        },
      ],
    },
    options: {
      title: {
        display: false,
        text: 'Chart.js Bar Chart - Stacked',
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            display: false,
          },
        ],
        yAxes: [
          {
            stacked: true,
            display: false,
          },
        ],
      },
    },
  },
  doughnut: {
    data: {
      datasets: [
        {
          data: [20, 30, 40, 50, 60],
          backgroundColor: [
            '#6a82fb',
            '#fc5c7d',
            '#45b649',
            '#00c9ff',
            '#ffd700',
          ],
          label: 'Dataset 1',
        },
      ],
      labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Chart.js Doughnut Chart',
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    },
  },
  line: {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Revenue for this year',
          borderColor: '#6a82fb',
          backgroundColor: '#6a82fb',
          data: [0, 1300, 2200, 3400, 4600, 3500, 3000],
        },

        {
          label: 'Revenue for last year',
          borderColor: '#fc5c7d',
          backgroundColor: '#fc5c7d',
          data: [0, 1300, 2200, 3400, 4600, 3500, 3000],
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart - Stacked Area',
      },
      tooltips: {
        intersect: false,
        mode: 'nearest',
      },
      hover: {
        mode: 'index',
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: false,
              labelString: 'Month',
            },
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            scaleLabel: {
              display: false,
              labelString: 'Value',
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  },
};
