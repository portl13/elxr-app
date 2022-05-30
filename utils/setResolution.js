import Resizer from "react-image-file-resizer";
const max_height = 1200;
const min_height = 300;
export const setResolution = (file) => {
    const type = file.type.split("/")
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            max_height,
            max_height,
            type[1],
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "file",
            min_height,
            min_height
        );
    });
}


export const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
