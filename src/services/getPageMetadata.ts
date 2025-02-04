import { getPage } from "@/actions/page";
import { headers } from "next/headers";

export default async function getPageMetadata({ page, lang, category, searchParams }: { page: string, lang?: string, category?: string, searchParams?: { [key: string]: string } }) {
    const {
        url,
        meta: {
            title = '',
            description = '',
            keywords = ''
        } = {}
    } = await getPage(page);

    const getHeaders = headers();
    const host = getHeaders?.get('host');
    const protocol = getHeaders?.get('x-forwarded-proto');
    const siteMainUrl = `${protocol}://${host}`;

    return {
        title: `${title}${searchParams?.page ? ` - page ${searchParams?.page}` : ''}`,
        description: `${description}${searchParams?.page ? ` page ${searchParams?.page}` : ''}`,
        keywords,
        authors: [{ name: host, url: siteMainUrl }],
        alternates: {
            canonical: `${siteMainUrl}/${lang}${url !== '/' ? url : ''}${category ? `/${category}` : ''}`,
        },
        // openGraph: {
        //     title,
        //     description,
        //     siteName: host,
        //     url: `${siteMainUrl}/${lang || ''}${uri}${category ? `/${category}` : ''}`,
        //     type: 'website',
        //     images: [{
        //         url: `${protocol}://${host}/img/open-graph.png`,
        //         width: ogImage?.width,
        //         height: ogImage?.height,
        //     }],
        // },
        icons: {
            icon: '/favicon.ico',
            apple: '/favicon.ico',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            // images: {
            //     url: `${protocol}://${host}/img/open-graph.png`,
            //     alt: title,
            // }
        }
    };
};
