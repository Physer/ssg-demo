import { getContentPages } from '@/getContentPages';

const pages: Array<any> = [];
export default function CmsPage({ currentPage }: any) {
    return (
        <>
            <div>
                <p>Title: {currentPage?.title}</p>
                <p>Subtext: {currentPage?.subtext}</p>
                <div
                    dangerouslySetInnerHTML={{
                        __html: currentPage?.pageContent,
                    }}
                ></div>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    pages.push(...(await getContentPages()));
    const paths = pages.map((page) => ({
        params: { url: page.url.split('/')[1] },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
    if (process.env.NODE_ENV == 'development') {
        pages.push(...(await getContentPages()));
    }
    const currentPage =
        pages?.find((page) => page.url === `/${params.url}`) || null;
    return { props: { currentPage } };
}
