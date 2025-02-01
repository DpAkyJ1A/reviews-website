const CMS_REST_URL = `${process.env.CMS_REST_URL}${process.env.CMS_REST_PORT ? `:${process.env.CMS_REST_PORT}` : ''}`;
const CMS_REST_TOKEN = process.env.CMS_JOIN_KEY;
const CMS_REST_TYPE = 'site';
const REVALIDATE = process.env.REVALIDATE || 100;

export {
    CMS_REST_URL,
    CMS_REST_TOKEN,
    CMS_REST_TYPE,
    REVALIDATE
}