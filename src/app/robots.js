import {INDEX_SITE,SITE_URL} from './site-config';
export default function robots(){return {rules:INDEX_SITE?{userAgent:'*',allow:'/'}:{userAgent:'*',disallow:'/'},...(INDEX_SITE?{sitemap:`${SITE_URL}/sitemap.xml`}:{})}}
