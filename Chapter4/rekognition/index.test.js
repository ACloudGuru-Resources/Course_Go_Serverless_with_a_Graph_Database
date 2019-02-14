const test = require("tape");
const index = require("./index");

const indexFacesResponses = [{
  FaceRecords: [
    {
      Face: {
        ExternalImageId: "Image1.jpg",
        FaceId: "face1",
      },
    },
    {
      Face: {
        ExternalImageId: "Image1.jpg",
        FaceId: "face3",
      },
    }
  ]
}, {
  FaceRecords: [
    {
      Face: {
        ExternalImageId: "Image2.jpg",
        FaceId: "face2",
      },
    }
  ]
}];
const searchFacesResponses = [
  [{
      imageId: "Image1.jpg",
      SearchedFaceId: "face1",
      FaceMatches: [
        {
          Similarity: 80.0,
          Face: {
            FaceId: "face2",
          }
        }
      ]
  }],
  [{
    imageId: "Image2.jpg",
    SearchedFaceId: "face2",
    FaceMatches: [
      {
        Similarity: 85.0,
        Face: {
          FaceId: "face1",
        }
      },
      {
        Similarity: 75.0,
        Face: {
          FaceId: "face3",
        }
      }
    ]
  }]
];

test("getFacesAsVertices", (t) => {
  const result = index.getFacesAsVertices(indexFacesResponses);
  t.deepEqual(result.length, 3);
  t.deepEqual(result[0], {
    "~id": "face1",
    "~label": "face",
    "imageId:String": "Image1.jpg"
  })
  t.end();
});

test("getFaceMatchesAsEdges", (t) => {
  const result = index.getFaceMatchesAsEdges(searchFacesResponses, "face1", "Image1.jpg");
  t.equal(result.length, 3)
  t.deepEqual(result[0], {
    "~id": "face1--face2",
    "~from": "face1",
    "~to": "face2",
    "~label": "similarity",
    "weight:Double": 0.8
  });
  t.end();
});
