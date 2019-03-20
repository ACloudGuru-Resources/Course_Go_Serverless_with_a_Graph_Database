# Resources for Chapter 2

## LAB: Using the Apache Tinkerpop Gremlin console
Apache tinkerpop website:
http://tinkerpop.apache.org

Groovy related errors on startup of console:
https://github.com/magarena/magarena/issues/1368

### add vertices
```
g.addV('face').property(id, '1').property('name', 'steve')
```

```
g.addV('face').property(id, '2').property('name', 'steve-clear').next()
g.addV('face').property(id, '3').property('name', 'steve-obscured').next()
g.addV('face').property(id, '4').property('name', 'fiona').next()
g.addV('face').property(id, '5').property('name', 'steve-partial-obscured').next()
```

### add edges
```
g.V('1').addE('similarity').to(g.V('2')).property('weight', 0.8).next()
g.V('1').addE('similarity').to(g.V('3')).property('weight', 0.4).next()
g.V('4').addE('similarity').to(g.V('3')).property('weight', 0.1).next()
g.V('5').addE('similarity').to(g.V('3')).property('weight', 0.8).next()
g.V('2').addE('similarity').to(g.V('5')).property('weight', 0.8).next()
```
### traversals 
Simple traversal
```
g.V('1').outE('similarity').has('weight', gte(0.8)).inV().values('name')
```

Multiple hops and both in and out
``` 
g.V('1').emit().repeat(bothE('similarity').has('weight', gte(0.1)).bothV()).times(3).dedup().values('name')
```

```
g.V('1').emit().repeat(bothE('similarity').has('weight', gte(0.8)).bothV()).times(3).dedup().values('name')
```

### More Gremlin tutorials

Getting started tutorial, with toy graph examples:
http://tinkerpop.apache.org/docs/current/tutorials/getting-started/

Practical Gremlin - more in depth tutorials:
https://kelvinlawrence.net/book/Gremlin-Graph-Guide.html 