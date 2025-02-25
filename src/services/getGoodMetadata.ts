import { getGood } from "@/actions/good";
import { headers } from "next/headers";

export default async function getGoodMetadata({ label }: { label: string }) {
    const {
        meta: {
            title = '',
            description = '',
            keywords = ''
        } = {}
    } = await getGood(label);

    const url = `product/${label}`;

    const getHeaders = headers();
    const host = getHeaders?.get('host');
    const protocol = getHeaders?.get('x-forwarded-proto');
    const siteMainUrl = `${protocol}://${host}`;

    return {
        title,
        description,
        keywords,
        authors: [{ name: host, url: siteMainUrl }],
        alternates: {
            canonical: `${siteMainUrl}/${url !== '/' ? url : ''}`,
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
