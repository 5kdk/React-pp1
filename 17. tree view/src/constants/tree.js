const tree = [
  { id: 1, name: 'Home' },
  {
    id: 2,
    name: 'Drinks',
    isOpen: false,
    children: [
      {
        id: 21,
        name: 'Coffee',
        isOpen: false,
        children: [
          {
            id: 211,
            name: 'Americano',
            isOpen: false,
            children: [
              { id: 2111, name: 'Red Eye' },
              { id: 2112, name: 'Long Black' },
              { id: 2113, name: 'French' },
            ],
          },
          { id: 212, name: 'Cappuccino' },
          { id: 213, name: 'Espresso' },
        ],
      },
      {
        id: 22,
        name: 'Tee',
        isOpen: false,
        children: [
          { id: 221, name: 'Green Tea' },
          { id: 222, name: 'Black Tee' },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Fruit',
    isOpen: false,
    children: [
      { id: 31, name: 'Apple' },
      {
        id: 32,
        name: 'Berry',
        isOpen: false,
        children: [
          { id: 321, name: 'Strawberry' },
          { id: 322, name: 'Blackberry' },
          { id: 323, name: 'Cranberry' },
        ],
      },
      { id: 33, name: 'Banana' },
    ],
  },
];

export default tree;
