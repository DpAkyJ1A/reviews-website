import { CMS_REST_URL } from "@/configuration/server";

const resolveImageSrc = (props: { internal?: string, external?: string, default?: string }): string => {
    const { 
        internal, 
        external,
        default: defaultImage
    } = props;

    return external || (internal && `${CMS_REST_URL}/${internal}`) || defaultImage || '';
};

export {
    resolveImageSrc
};
