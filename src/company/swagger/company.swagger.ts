/***********************************POST**********************/
export const postCompanyBodySwagger = {
 description: 'You need JWT',
 schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Apple' },
      email: { type: 'string', example: 'contact@apple.com' },
      website: { type: 'string', example: 'https://apple.com' },
      logo: { type: 'string', format: 'binary', description: 'Company logo file' },
    },
    required: ['name'],
  }
}
export const postCompanyResponseSwagger = {
    status: 201,
    description: 'Company created successfully',
    schema: {
      example: {
        message: 'Company created',
        company: {
          id: 1,
          name: 'Apple',
          email: 'contact@apple.com',
          website: 'https://apple.com',
          logo: '/uploads/logo.png',
        },
      },
    },
}


/***********************************GET**********************/
export const getCompanyAllResponseSwagger = {
    status: 200, 
    description: 'List of companies returned',
    schema: {
      example: [
          {
            id: 1,
            name: 'Apple',
            email: 'contact@apple.com',
            website: 'https://apple.com',
            logo: '/uploads/logo.png',
          },
          {
            id: 2,
            name: 'Apple2',
            email: 'contact2@apple.com',
            website: 'https://apple2.com',
            logo: '/uploads/logo2.png',
          }
        ]
      },
}



/***********************************GET:id**********************/
export const getCompanyOneParamsSwagger = { name: 'id', type: Number, description: 'Company ID' }
export const getCompanyOneResponseSwagger  = { 
    status: 200, 
    description: 'Company returned',
    schema: {
      example: {       
            id: 1,
            name: 'Apple',
            email: 'contact@apple.com',
            website: 'https://apple.com',
            logo: '/uploads/logo.png',
          }
    }
}



/***********************************PATCH:id**********************/
export const patchCompanyParamsSwagger = { name: 'id', type: Number, description: 'Company ID' }

export const patchCompanyBodySwagger = {
 description: 'You need JWT',
 schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Apple' },
      email: { type: 'string', example: 'contact@apple.com' },
      website: { type: 'string', example: 'https://apple.com' },
      logo: { type: 'string', format: 'binary', description: 'Company logo file' },
    },
    required: ['name'],
  }
}

export const patchCompanyResponseSwagger = {
  status: 200,
  description: 'Company updated successfully',
  schema: {
    example: {
      id: 16,
      name: "Test15",
      email: "tes5t@example.com",
      logo: "uploads\\1760903079912-262669954.png",
      website: "https://example.com",
      employees: []
    },
  },
};



/***********************************DELETE:id**********************/
export const deleteCompanyParamsSwagger = { 
  name: 'id', 
  type: Number, 
  description: 'Company ID' 
};
export const deleteCompanyResponseSwagger = {
  status: 200,
  description: 'Company deleted successfully',
  schema: {
    example: true
  },
};
