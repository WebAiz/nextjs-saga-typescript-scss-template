export const downloadObjectUrl = (blob:Blob, fileName:string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    const timer = setTimeout(() => {
        link.remove();
        clearTimeout(timer);
    }, 1000);
};


export const ConvertObjectToFormData = (obj: Record<string, unknown>, form?: FormData, namespace?: unknown) => {
    const fd = form || new FormData();
    let formKey;

    for (const property in obj) {
        if (obj.hasOwnProperty(property) && obj[property] !== null) {

            formKey = namespace ? `${namespace}[${property}]` : property;

            if (obj[property] instanceof Date) {
                fd.append(formKey, obj[property].toISOString());
            } else if (typeof obj[property] === "object" && !(obj[property] instanceof File)) {
                ConvertObjectToFormData(obj[property], fd, formKey);
            } else {
                fd.append(formKey, obj[property]);
            }
        }
    }

    return fd;
};
