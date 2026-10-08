import {INDEX_SITE,SITE_URL} from './site-config';
const images=['/assets/vignesh-b-s.jpg','/assets/portrait.jpg','/assets/vignesh-b-s-hero.jpg'].map(p=>SITE_URL+p);
export default function sitemap(){return INDEX_SITE?['','/achievements','/resume','/contact'].map(path=>({url:SITE_URL+path,lastModified:new Date(),changeFrequency:'monthly',priority:path?0.7:1,...(path?{}:{images})})):[]}
