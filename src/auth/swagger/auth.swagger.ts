/***********************************POST REGISTER**********************/
export const postAuthRegisterBodySwagger = {
  description: 'Register required',
  schema: {
    type: 'object',
    properties: {
      email: { type: 'string', example: 'john.doe@example.com' },
      password: { type: 'string', example: '123456' },
      role: { type: 'string', example: 'user' },
    },
    required: ['name', 'email', 'role'],
  },
};


export const postAuthRegisterResponseSwagger = {
  status: 201,
  description: 'Employee created successfully',
  schema: {
    example: {
      message: 'User registered',
      email:  "user7@gmail.com"
    },
  },
};


/***********************************POST LOGIN**********************/
export const postAuthLoginBodySwagger = {
  description: 'Register required',
  schema: {
    type: 'object',
    properties: {
      email: { type: 'string', example: 'john.doe@example.com' },
      password: { type: 'string', example: '123456' },
    },
    required: ['name', 'email', 'role'],
  },
};


export const postAuthLoginResponseSwagger = {
  status: 201,
  description: 'Employee created successfully',
  schema: {
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc2MTA1ODU5NCwiZXhwIjoxNzYxMDk0NTk0fQ.cMjltnPCvKSTEYsS0S_gmHN4Eq3aIb-HohFbwwOlOJc'

  },
};