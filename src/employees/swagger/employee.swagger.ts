/***********************************POST**********************/
export const postEmployeeBodySwagger = {
  description: 'You need JWT',
  schema: {
    type: 'object',
    properties: {
      firstName: { type: 'string', example: 'John' },
      lastName: { type: 'string', example: 'Doe' },
      email: { type: 'string', example: 'john.doe@example.com' },
      phone: { type: 'string', example: '+123456789' },
      companyIds: { type: 'array', items: { type: 'number' }, example: [1, 2] },
    },
    required: ['firstName', 'lastName'],
  },
};

export const postEmployeeResponseSwagger = {
  status: 201,
  description: 'Employee created successfully',
  schema: {
    example: {
      message: 'Employee created',
      employee: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+123456789',
        companies: [
          { id: 1, name: 'Apple' },
          { id: 2, name: 'Google' }
        ],
      },
    },
  },
};

/***********************************GET**********************/
export const getEmployeeAllResponseSwagger = {
  status: 200,
  description: 'List of employees returned',
  schema: {
    example: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+123456789',
        companies: [{ id: 1, name: 'Apple' }],
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+987654321',
        companies: [{ id: 2, name: 'Google' }],
      },
    ],
  },
};

/***********************************GET:id**********************/
export const getEmployeeOneParamsSwagger = { name: 'id', type: Number, description: 'Employee ID' };

export const getEmployeeOneResponseSwagger = {
  status: 200,
  description: 'Employee returned',
  schema: {
    example: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+123456789',
      companies: [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Google' }
      ],
    },
  },
};

/***********************************PATCH:id**********************/
export const patchEmployeeParamsSwagger = { name: 'id', type: Number, description: 'Employee ID' };

export const patchEmployeeBodySwagger = {
  description: 'You need JWT',
  schema: {
    type: 'object',
    properties: {
      firstName: { type: 'string', example: 'John' },
      lastName: { type: 'string', example: 'Doe' },
      email: { type: 'string', example: 'john.doe@example.com' },
      phone: { type: 'string', example: '+123456789' },
      companyIds: { type: 'array', items: { type: 'number' }, example: [1] },
    },
  },
};

export const patchEmployeeResponseSwagger = {
  status: 200,
  description: 'Employee updated successfully',
  schema: {
    example: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+123456789',
      companies: [{ id: 1, name: 'Apple' }],
    },
  },
};

/***********************************DELETE:id**********************/
export const deleteEmployeeParamsSwagger = { 
  name: 'id', 
  type: Number, 
  description: 'Employee ID' 
};

export const deleteEmployeeResponseSwagger = {
  status: 200,
  description: 'Employee deleted successfully',
  schema: {
    example: true,
  },
};