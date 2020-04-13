const urls = [
    "https://codeinterview.io/",
    "https://airtable.com/",
    "https://outco.io/offers",
    "https://outco.io/interviewrecap",
    "https://outco.io/reflections",
    "https://outco.io/interviewfeedback",
];
const folderName = "Outco";

function add_bookmarks(root_id) {
    // Create all bookmarks
    urls.map(function(url) {
        const search_payload = {url: url, title: url};
        const create_payload = {parentId: root_id, url: url, title: url};
        chrome.bookmarks.search(
            search_payload,
            function(results) {
                if (results.length == 0) {
                    chrome.bookmarks.create(create_payload);
                }
            }
        );
    });
}

function entry_point() {
    // Create root folder if not exists
    chrome.bookmarks.search(
        {title: folderName},
        function(results) {
            if (results.length == 0) {
                chrome.bookmarks.create(
                    {parentId: "1", title: folderName, index: 0},
                    function(newFolder) {
                        add_bookmarks(newFolder.id);
                    }
                );
            }
            else {
                add_bookmarks(results[0].id);
            }
        }
    );
}

// Only call
entry_point();
