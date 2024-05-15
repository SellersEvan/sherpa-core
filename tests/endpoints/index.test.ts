import { Suite, BodyType, Method, equals, includes } from "./suite/index.js";

// NOTE: Separate from Jest Tests executed by running `npm run test-server {host}`
const suite = new Suite();

//! FIXME - check for args of host, if none provided then...
suite.bench("Local", {
    host: "http://localhost:3000",
    setup: [
        "%sherpa-cli% build"
    ],
    start: "%sherpa-cli% start",
    teardown: []
});

// suite.bench("Vercel", {
//     host: "https://sherpajs-test.vercel.app/"
// });


suite.test("Basic Get - GET /regular", {
    method: Method.GET,
    path: "/regular"
}).expect((response) => {
    equals(BodyType.JSON, response.bodyType);
    equals("/regular", response?.body?.["request"]["url"]);
    equals(Method.GET, response?.body?.["request"]["method"]);
});


suite.test("Basic Post - POST /regular", {
    method: Method.POST,
    path: "/regular"
}).expect((response) => {
    equals(BodyType.JSON, response.bodyType);
    equals("/regular", response?.body?.["request"]["url"]);
    equals(Method.POST, response?.body?.["request"]["method"]);
});


suite.test("Basic Put - PUT /regular", {
    method: Method.PUT,
    path: "/regular"
}).expect((response) => {
    equals(BodyType.JSON, response.bodyType);
    equals("/regular", response?.body?.["request"]["url"]);
    equals(Method.PUT, response?.body?.["request"]["method"]);
});


suite.test("Basic Patch - PATCH /regular", {
    method: Method.PATCH,
    path: "/regular"
}).expect((response) => {
    equals(BodyType.JSON, response.bodyType);
    equals("/regular", response?.body?.["request"]["url"]);
    equals(Method.PATCH, response?.body?.["request"]["method"]);
});


suite.test("Basic Delete - DELETE /regular", {
    method: Method.DELETE,
    path: "/regular"
}).expect((response) => {
    equals(BodyType.JSON, response.bodyType);
    equals("/regular", response?.body?.["request"]["url"]);
    equals(Method.DELETE, response?.body?.["request"]["method"]);
});


suite.test("Not Found - Regular - GET /hello-world", {
    method: Method.GET,
    path: "/hello-world"
}).expect((response) => {
    equals(404, response.status);
    equals("Not Found", response.statusText);
    equals(BodyType.None, response.bodyType);
    equals(undefined, response?.body);
});


suite.test("Not Found - 1 Deep Segment - POST /regular/foo", {
    method: Method.POST,
    path: "/regular/foo"
}).expect((response) => {
    equals(404, response.status);
    equals("Not Found", response.statusText);
    equals(BodyType.None, response.bodyType);
    equals(undefined, response?.body);
});


suite.test("Not Found - 3 Deep Segment - PUT /regular/response/html/foo", {
    method: Method.PUT,
    path: "/regular/response/html/foo"
}).expect((response) => {
    equals(404, response.status);
    equals("Not Found", response.statusText);
    equals(BodyType.None, response.bodyType);
    equals(undefined, response?.body);
});


suite.test("Not Found - Module - DELETE /module/m1/foo", {
    method: Method.DELETE,
    path: "/module/m1/foo"
}).expect((response) => {
    equals(404, response.status);
    equals("Not Found", response.statusText);
    equals(BodyType.None, response.bodyType);
    equals(undefined, response?.body);
});


suite.test("Method Not Allowed - POST /regular/response/html/standalone", {
    method: Method.POST,
    path: "/regular/response/html/standalone"
}).expect((response) => {
    equals(405, response.status);
    equals("Method Not Allowed", response.statusText);
    equals(BodyType.None, response.bodyType);
});


suite.test("HTML Response - Regular - GET /regular/response/html/basic", {
    method: Method.GET,
    path: "/regular/response/html/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.HTML, response.bodyType);
    includes(response?.body as string, "<html>");
    includes(response?.body as string, "<title>Hello</title>");
    includes(response?.body as string, "</html>");
});


suite.test("HTML Response - Additional Method - POST /regular/response/html/basic", {
    method: Method.POST,
    path: "/regular/response/html/basic"
}).expect((response) => {
    equals(201, response.status);
    equals("Created", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals(3, response?.body?.["number"]);
    equals(true, response?.body?.["boolean"]);
    equals("food", response?.body?.["string"]);
    equals(3, response?.body?.["object"]["numbers"][0]);
    equals(-4, response?.body?.["object"]["numbers"][1]);
});


suite.test("HTML Response - Additional Method - PUT /regular/response/html/basic", {
    method: Method.PUT,
    path: "/regular/response/html/basic"
}).expect((response) => {
    equals(201, response.status);
    equals("Created", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals(3, response?.body?.["number"]);
    equals(true, response?.body?.["boolean"]);
    equals("food", response?.body?.["string"]);
    equals(3, response?.body?.["object"]["numbers"][0]);
    equals(-4, response?.body?.["object"]["numbers"][1]);
});


suite.test("HTML Response - Additional Method - PATCH /regular/response/html/basic", {
    method: Method.PATCH,
    path: "/regular/response/html/basic"
}).expect((response) => {
    equals(201, response.status);
    equals("Created", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals(3, response?.body?.["number"]);
    equals(true, response?.body?.["boolean"]);
    equals("food", response?.body?.["string"]);
    equals(3, response?.body?.["object"]["numbers"][0]);
    equals(-4, response?.body?.["object"]["numbers"][1]);
});


suite.test("HTML Response - Additional Method - DELETE /regular/response/html/basic", {
    method: Method.DELETE,
    path: "/regular/response/html/basic"
}).expect((response) => {
    equals(201, response.status);
    equals("Created", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals(3, response?.body?.["number"]);
    equals(true, response?.body?.["boolean"]);
    equals("food", response?.body?.["string"]);
    equals(3, response?.body?.["object"]["numbers"][0]);
    equals(-4, response?.body?.["object"]["numbers"][1]);
});


suite.test("HTML Response - Standalone - GET /regular/response/html/standalone", {
    method: Method.GET,
    path: "/regular/response/html/standalone"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.HTML, response.bodyType);
    includes(response?.body as string, "<html>");
    includes(response?.body as string, "<title>Hello</title>");
    includes(response?.body as string, "</html>");
});


suite.test("JSON Response - GET /regular/response/json/basic", {
    method: Method.GET,
    path: "/regular/response/json/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals("food", response?.body?.["string"]);
    equals(3, response?.body?.["number"]);
    equals(true, response?.body?.["boolean"]);
    equals(3, response?.body?.["object"]["numbers"][0]);
    equals(-4, response?.body?.["object"]["numbers"][1]);
});


suite.test("JSON Response - POST /regular/response/json/basic", {
    method: Method.POST,
    path: "/regular/response/json/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals("food", response?.body?.["string"]);
    equals(3, response?.body?.["number"]);
    equals(true, response?.body?.["boolean"]);
    equals(3, response?.body?.["object"]["numbers"][0]);
    equals(-4, response?.body?.["object"]["numbers"][1]);
});


suite.test("JSON Response - PUT /regular/response/json/basic", {
    method: Method.PUT,
    path: "/regular/response/json/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals("food", response?.body?.["string"]);
    equals(3, response?.body?.["number"]);
    equals(true, response?.body?.["boolean"]);
    equals(3, response?.body?.["object"]["numbers"][0]);
    equals(-4, response?.body?.["object"]["numbers"][1]);
});


suite.test("JSON Response - PATCH /regular/response/json/basic", {
    method: Method.PATCH,
    path: "/regular/response/json/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals("food", response?.body?.["string"]);
    equals(3, response?.body?.["number"]);
    equals(true, response?.body?.["boolean"]);
    equals(3, response?.body?.["object"]["numbers"][0]);
    equals(-4, response?.body?.["object"]["numbers"][1]);
});


suite.test("JSON Response - DELETE /regular/response/json/basic", {
    method: Method.DELETE,
    path: "/regular/response/json/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals("food", response?.body?.["string"]);
    equals(3, response?.body?.["number"]);
    equals(true, response?.body?.["boolean"]);
    equals(3, response?.body?.["object"]["numbers"][0]);
    equals(-4, response?.body?.["object"]["numbers"][1]);
});


suite.test("None Response - GET /regular/response/none/basic", {
    method: Method.GET,
    path: "/regular/response/none/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.None, response.bodyType);
    equals(undefined, response?.body);
});


suite.test("None Response - POST /regular/response/none/basic", {
    method: Method.POST,
    path: "/regular/response/none/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.None, response.bodyType);
    equals(undefined, response?.body);
});


suite.test("None Response - PUT /regular/response/none/basic", {
    method: Method.PUT,
    path: "/regular/response/none/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.None, response.bodyType);
    equals(undefined, response?.body);
});


suite.test("None Response - PATCH /regular/response/none/basic", {
    method: Method.PATCH,
    path: "/regular/response/none/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.None, response.bodyType);
    equals(undefined, response?.body);
});


suite.test("None Response - DELETE /regular/response/none/basic", {
    method: Method.DELETE,
    path: "/regular/response/none/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.None, response.bodyType);
    equals(undefined, response?.body);
});


suite.test("Text Response - GET /regular/response/text/basic", {
    method: Method.GET,
    path: "/regular/response/text/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.Text, response.bodyType);
    equals("Hello World", response?.body);
});


suite.test("Text Response - POST /regular/response/text/basic", {
    method: Method.POST,
    path: "/regular/response/text/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.Text, response.bodyType);
    equals("Hello World", response?.body);
});


suite.test("Text Response - PUT /regular/response/text/basic", {
    method: Method.PUT,
    path: "/regular/response/text/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.Text, response.bodyType);
    equals("Hello World", response?.body);
});


suite.test("Text Response - PATCH /regular/response/text/basic", {
    method: Method.PATCH,
    path: "/regular/response/text/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.Text, response.bodyType);
    equals("Hello World", response?.body);
});


suite.test("Text Response - DELETE /regular/response/text/basic", {
    method: Method.DELETE,
    path: "/regular/response/text/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.Text, response.bodyType);
    equals("Hello World", response?.body);
});


suite.test("Redirect Response - GET /regular/response/redirect/basic", {
    method: Method.GET,
    path: "/regular/response/redirect/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals("/regular/response/redirect/success", response?.body?.["request"]["url"]);
    equals(Method.GET, response?.body?.["request"]["method"]);
});


suite.test("Redirect Response - POST /regular/response/redirect/basic", {
    method: Method.GET,
    path: "/regular/response/redirect/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals("/regular/response/redirect/success", response?.body?.["request"]["url"]);
    equals(Method.GET, response?.body?.["request"]["method"]);
});


suite.test("Redirect Response - PUT /regular/response/redirect/basic", {
    method: Method.PUT,
    path: "/regular/response/redirect/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals("/regular/response/redirect/success", response?.body?.["request"]["url"]);
    equals(Method.PUT, response?.body?.["request"]["method"]);
});


suite.test("Redirect Response - PATCH /regular/response/redirect/basic", {
    method: Method.PATCH,
    path: "/regular/response/redirect/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals("/regular/response/redirect/success", response?.body?.["request"]["url"]);
    equals(Method.PATCH, response?.body?.["request"]["method"]);
});


suite.test("Redirect Response - DELETE /regular/response/redirect/basic", {
    method: Method.DELETE,
    path: "/regular/response/redirect/basic"
}).expect((response) => {
    equals(200, response.status);
    equals("OK", response.statusText);
    equals(BodyType.JSON, response.bodyType);
    equals("/regular/response/redirect/success", response?.body?.["request"]["url"]);
    equals(Method.DELETE, response?.body?.["request"]["method"]);
});


// - Response types - with custom headers and status code - defining headers different ways
// - status codes - every single one - make endpoint that uses dynamic paths
// - test body
// - error page
// - ENVIRONMENT VARIABLES
// - SHERPA_PLATFORM
// - CONTEXT
// - context modules
// - query parameters


(async () => {
    suite.run();
})();
