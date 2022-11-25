import { ur_doc, ur_evaluate, ur_tag, ur_active_doc } from "./urquery.mjs"
function urQuery(uri) {
    const ul_tag = children => ur_tag("ul", children);
    function* for_query(uri) {
        const xpathResultIter = ur_evaluate(ur_doc(uri), "/li");
        const li_tag = child => ur_tag("li", child);
        for (li of xpathResultIter) {
            yield li_tag(li)
        }

    }
    return ul_tag([...for_query(uri)]);
}
function main() {
    let uri = ur_active_doc();
    return urQuery(uri);
}
