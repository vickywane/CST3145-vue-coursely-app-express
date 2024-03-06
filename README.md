# MDX Vue Course Node Service  

## Text Search

- Create index for partial text search using;
```js
    await collection.createIndex({ topic: "text", location: "text", description: "text" })
```

This project is deployed using ElasticBeanstalk!
