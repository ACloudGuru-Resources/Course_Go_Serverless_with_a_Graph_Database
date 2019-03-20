# Chapter 5 

## LAB: Modifying the query lambda
Request templates with serverless framework:
- https://serverless.com/framework/docs/providers/aws/events/apigateway#request-templates

Query code:
```javascript

// add to top of module
const __ = gremlin.process.statics;
const p = gremlin.process.P;

// replace query
gR.V().has("imageId", params.imageId)
        .emit()
        .repeat(
            __.outE("similarity").has("weight", p.gte(threshold)).inV()
        )
        .times(hops)
        .dedup().by("imageId")
        .values("imageId")
        .toList()
```

Converting tinkerpop CLI query to javascript means finding the right library equivalents (anonymous traversals needs access to static methods, gte is a predefined Predicate):
- https://stackoverflow.com/questions/51251768/what-is-the-equivalent-of-the-gremlin-queries-in-gremlin-javascript
- http://tinkerpop.apache.org/javadocs/3.4.0/core/org/apache/tinkerpop/gremlin/process/traversal/P.html

I found it was easier to find the javascript equivalent by debugging the gremlin package in my IDE


