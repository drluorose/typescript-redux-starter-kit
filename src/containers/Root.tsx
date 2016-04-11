
import DevRoot from "./root.dev";
import ProdRoot from "./root.prod";

var Root;

if (__DEBUG__) {
    Root = DevRoot;
} else {
    Root = ProdRoot;
}

export default Root;