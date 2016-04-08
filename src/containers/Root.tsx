
import DevRoot from "./Root.dev";
import ProdRoot from "./Root.prod";

var Root;

if (__DEBUG__) {
    Root = DevRoot;
} else {
    Root = ProdRoot;
}

export default Root;