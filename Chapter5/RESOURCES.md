# Chapter 5 

## LAB: Modifying the query lambda
Request templates with serverless framework:
- https://serverless.com/framework/docs/providers/aws/events/apigateway#request-templates

```yml
request:
    parameters:
        querystrings:
            imageId: true
            threshold: true
            hops: true
```

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


## Create React App (CRA) vulnerabilities

When npm installing the ui project, you may see some audit information flagging vulnerabilities. With a project of CRAs size, this is not uncommon. Anything I have seen is a problem with a deeply nested dependency and usually part of the build tools. If you are concerned about this you can `npm run eject` and remove the dependency that contains a vulnerability.

I periodically run `npm audit fix` on all projects in this course.