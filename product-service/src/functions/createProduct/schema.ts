export default {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        description: { type: 'string' },
        genres: { type: 'string' },
        image: { type: 'string' },
        platforms: { type: 'string' },
        price: { type: 'number' },
        rating: { type: 'number' },
        released: { type: 'string' },
    },
    required: ['id', 'title', 'price'],
} as const;
